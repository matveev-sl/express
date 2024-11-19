<template>
  <v-card-text>
    <!-- Показываем поле "Имя" и "Подтверждение пароля" только в режиме регистрации -->
    <v-text-field
      v-if="!isLoginMode"
      v-model="name"
      label="Введите ваше имя"
      :rules="nameRules"
      required
    />
    <v-text-field
      v-model="email"
      label="Введите ваш email"
      :rules="emailRules"
      required
    />
    <v-text-field
      v-model="password"
      label="Введите пароль"
      type="password"
      :rules="passwordRules"
      required
    />
    <v-text-field
      v-if="!isLoginMode"
      v-model="confirmPassword"
      label="Подтвердите пароль"
      type="password"
      :rules="[confirmPasswordRule]"
      required
    />
  </v-card-text>
  <v-btn :disabled="!isFormValid()" @click="register">
    {{ isLoginMode ? 'Войти' : 'Зарегистрироваться' }}
  </v-btn>
  <v-btn @click="toggleMode">
    {{ isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти' }}
  </v-btn>
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

// Правила для валидации
const nameRules = [
  (v) => !!v || 'Имя обязательно',
  (v) => v.length >= 2 || 'Имя должно содержать не менее 2 символов',
];
const emailRules = [
  (v) => !!v || 'Email обязателен',
  (v) => /.+@.+\..+/.test(v) || 'Введите корректный email',
];
const passwordRules = [
  (v) => !!v || 'Пароль обязателен',
  (v) => v.length >= 8 || 'Пароль должен быть не менее 8 символов',
  (v) => /[A-Z]/.test(v) || 'Пароль должен содержать хотя бы одну заглавную букву',
  (v) => /[a-z]/.test(v) || 'Пароль должен содержать хотя бы одну строчную букву',
  (v) => /\d/.test(v) || 'Пароль должен содержать хотя бы одну цифру',
];
const confirmPasswordRule = (v) =>
  v === password.value || 'Пароли должны совпадать';

// Проверка валидности всей формы
const isFormValid = () => {
  if (!isLoginMode.value) {
    // Режим регистрации
    return (
      nameRules.every((rule) => rule(name.value) === true) &&
      emailRules.every((rule) => rule(email.value) === true) &&
      passwordRules.every((rule) => rule(password.value) === true) &&
      confirmPasswordRule(confirmPassword.value) === true
    );
  } else {
    // Режим логина
    return (
      emailRules.every((rule) => rule(email.value) === true) &&
      passwordRules.every((rule) => rule(password.value) === true)
    );
  }
};

// Пропс для закрытия модального окна
const { close } = defineProps({
  close: {
    type: Function,
    required: true,
  },
});

// Функция для регистрации
const register = async () => {
  if (!isFormValid()) {
    showMessage('Форма заполнена некорректно!', 'error');
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
