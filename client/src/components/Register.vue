<template>
    <v-card-text>
        <v-text-field v-if="!isLoginMode" v-model="name" label="Введите ваше имя" />
        <v-text-field v-model="email" label="Введите ваш email" />
        <v-text-field v-model="password" label="Введите пароль" type="password" />
        <v-text-field
          v-if="!isLoginMode"
          v-model="confirmPassword"
          label="Подтвердите пароль"
          type="password"
        />
      </v-card-text>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useUserStore} from '@/stores/userStore';
import {  registerUser } from '@/api';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Пароли не совпадают');
    return;
  }
  try {
    if (
    await registerUser({ name: name.value, email: email.value, password: password.value })) {
    alert('Регистрация успешна! Теперь вы можете войти.');
    toggleMode();} 
  } catch (error) {
    if (error.response) {
      console.error('Ошибка ответа:', error.response); 

      if (error.response.status === 400) {
        alert('Пользователь с таким email уже существует.');
      } else {
        alert('Произошла ошибка при регистрации. Попробуйте снова.');
      }
    } else {
      console.error('Неожиданная ошибка:', error);
      alert('Произошла ошибка при регистрации. Попробуйте снова.');
    }
  }
};
  </script>
  