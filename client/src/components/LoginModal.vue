<template>
  <v-btn v-if="!userStore.isLoggedIn" @click="show = true">Войти</v-btn>
  <div v-else>Привет, {{ userStore.userName }}
     <v-btn @click="logout">Выйти</v-btn>
  </div>
 
  <v-dialog v-model="show" max-width="400">
    <v-card>
      <v-card-title>Войти</v-card-title>
      <v-card-text>
      <v-text-field v-model="name" label="Введите ваше имя" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="login">Войти</v-btn>
        <v-btn @click="show = false">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { loginUser } from '@/api';

const userStore = useUserStore();
const show = ref(false);
const name = ref('');

onMounted(() => {
  userStore.initializeUser();
});

const login = async () => {
  try {
    const response = await loginUser(name.value);
    const { userName: loggedInUserName, token } = response;
    userStore.setUser(loggedInUserName, token);
    show.value = false;
  } catch (error) {
    console.error('Ошибка при логине:', error);
  }
};

const logout = () => {
  userStore.logout();
};
</script>
