<template>
  <v-card-text>
    <!-- Показываем поле "Имя" и "Подтверждение пароля" только в режиме регистрации -->
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
  <v-btn @click="register">Зарегистрироваться</v-btn>
  <v-btn @click="toggleMode">Уже есть аккаунт? Войти</v-btn>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { registerUser } from '@/api';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoginMode = ref(false); // Состояние для переключения между регистрацией и логином

// Пропс для закрытия модального окна
const { close } = defineProps({
  close: {
    type: Function,
    required: true,
  },
});

// Функция для регистрации
const register = async () => {
  if (password.value !== confirmPassword.value) {
    showMessage('Пароли не совпадают', 'error');
    return;
  }

  try {
    const response = await registerUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    showMessage('Регистрация успешна! Теперь вы можете войти.', 'success');
    close(); // Закрытие модального окна после регистрации
  } catch (error) {
    handleError(error);
  }
};

// Функция для отображения сообщений
const showMessage = (message, type) => {
  alert(message);
};

// Функция для обработки ошибок
const handleError = (error) => {
  const message = error.response
    ? (error.response.status === 400
        ? 'Пользователь с таким email уже существует.'
        : 'Произошла ошибка при регистрации. Попробуйте снова.')
    : 'Неизвестная ошибка. Попробуйте снова.';
  showMessage(message, 'error');
};

// Переключение между режимами регистрации и логина
const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
};
</script>
