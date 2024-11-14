<template>
  <v-btn v-if="!userStore.isLoggedIn" @click="show = true">Войти</v-btn>
  <div v-else>Привет, {{ userStore.userName }}
     <v-btn @click="logout">Выйти</v-btn>
  </div>

  <v-dialog v-model="show" max-width="800">
    <v-card>
      <v-card-title>{{ isLoginMode ? 'Войти' : 'Регистрация' }}</v-card-title>
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
      <v-card-actions>
        <v-btn @click="isLoginMode ? login() : register()">
          {{ isLoginMode ? 'Войти' : 'Зарегистрироваться' }}
        </v-btn>
        <v-btn @click="show = false">Отмена</v-btn>
        <v-btn text @click="toggleMode">
          {{ isLoginMode ? ' Зарегистрироваться' : ' Войти' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore} from '@/stores/userStore';
import { loginUser, registerUser } from '@/api';

const userStore = useUserStore();
const show = ref(false);
const isLoginMode = ref(true); 
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

onMounted(() => {
  userStore.initializeUser();
});

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
};

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



const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Пароли не совпадают');
    return;
  }
  try {
    if (
    await registerUser({ name: name.value, email: email.value, password: password.value })) {
    alert('Регистрация успешна! Теперь вы можете войти.');
    toggleMode();} // Переключаемся на форму входа
  } catch (error) {
    if (error.response) {
      console.error('Ошибка ответа:', error.response); // Посмотрим, что содержится в error.response

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
const logout = () => {
  userStore.logout();
};
</script>
