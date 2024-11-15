<template>
  <div v-if="userStore.isLoggedIn">
    Привет, {{ userStore.userName }}
    <v-btn @click="logout">Выйти</v-btn>
  </div>
  <v-btn v-if="!userStore.isLoggedIn" @click="showLogin">Войти</v-btn>
  <v-btn v-if="!userStore.isLoggedIn" @click="showRegister">Регистрация</v-btn>

    <v-dialog v-model="show" max-width="800">
      < v-if=" ">
    
          <Register />
      
      </v-card>
      <v-card v-else=" ">
        <Login />
      </v-card>
    </v-dialog>
  </template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore} from '@/stores/userStore';
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
const userStore = useUserStore();




onMounted(() => {
  userStore.initializeUser();
});
const logout = () => {
  userStore.logout();
};
</script>