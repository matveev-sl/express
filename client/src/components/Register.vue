<template>
  <v-card-text>
    <v-text-field
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
      v-model="confirmPassword"
      label="Подтвердите пароль"
      type="password"
      :rules="[confirmPasswordRule]"
      required
    />
  </v-card-text>
  <v-btn :disabled="!isFormValid" @click="register">
    Зарегистрироваться
  </v-btn>
</template>

<script setup>
import { ref, computed } from 'vue';
import { registerUser } from '@/api';

const { close } = defineProps({
  close: {
    type: Function,
    required: true,
  },
});
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

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

const isFormValid = computed(() => {
  return (
    nameRules.every((rule) => rule(name.value) === true) &&
    emailRules.every((rule) => rule(email.value) === true) &&
    passwordRules.every((rule) => rule(password.value) === true) &&
    confirmPasswordRule(confirmPassword.value) === true
  );
});


const register = async () => {
  try {
    const response = await registerUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    alert('Регистрация успешна!');
    close(); 
  } catch (error) {
    alert('Ошибка при регистрации. Попробуйте снова.');
  }
};
</script>
