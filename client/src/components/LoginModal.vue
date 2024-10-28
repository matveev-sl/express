<template>
  <v-btn v-if="!isLoggedIn" @click="show = true">Войти</v-btn>
  <div v-else>Привет, {{ userName }}
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
import axios from "axios";
  const show = ref(false)
  const name = ref('')
  const isLoggedIn = ref(false)
  const userName = ref('')

  onMounted(() => {
  const token = sessionStorage.getItem('token');
  const storedUserName = sessionStorage.getItem('userName');

  if (token && storedUserName) {
    userName.value = storedUserName;
    isLoggedIn.value = true;
  }
});

  const login = async () => {
      try {
        const response = await axios.post('http://localhost:3000/login', { userName: name.value });
        const { userName: loggedInUserName, token } = response.data;
        sessionStorage.setItem('userName', loggedInUserName);
        sessionStorage.setItem('token', token);
        userName.value = loggedInUserName;
        isLoggedIn.value = true;
        name.value = ''
        show.value = false;
        console.log("Вывод логина" , response)
      } catch (error) {
        console.error('Ошибка при Логине:', error)
      }
    }
    const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userName');
  userName.value = '';
  isLoggedIn.value = false;
}
</script>
