<template>
  <v-card>
    <v-card-title>Войти</v-card-title>
    <v-card-text>
      <v-text-field v-model="email" label="Введите ваш email" />
      <v-text-field v-model="password" label="Введите пароль" type="password" />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="login">Войти</v-btn>
      <v-btn @click="$emit('close')">Отмена</v-btn>
      <v-btn text @click="$emit('switchToRegister')">Регистрация</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { loginUser } from '@/api';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const email = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await loginUser(email.value, password.value);
    const { userName, token } = response; // Извлекаем userName из ответа
    userStore.setUser(userName, token); // Сохраняем имя пользователя и токен в хранилище
    console.log("Данные успешно переданы в стор:", { userName, token });
    show.value = false; // Закрываем модальное окно
  } catch (error) {
    console.error('Ошибка при логине:', error);
    if (error.response) {
      if (error.response.status === 400) {
        alert('Пользователь с таким email не существует.');
      } else if (error.response.status === 401) {
        alert('Неверный пароль.');
      } else {
        alert('Произошла ошибка при авторизации. Попробуйте снова.');
      }
    } else {
      alert('Произошла неожиданная ошибка.');
    }
  }
};
</script>
