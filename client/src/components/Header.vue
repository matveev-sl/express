<template>
  <div>
    <!-- Навигационные ссылки -->
    <router-link to="/view">Посмотреть твиты</router-link>
    <router-link to="/create">Создать твит</router-link>

    <!-- Если пользователь не залогинен -->
    <div v-if="!userStore.isLoggedIn">
      <v-btn @click="open(true)">Войти</v-btn>
      <v-btn @click="open(false)">Регистрироваться</v-btn>
    </div>

    <!-- Если пользователь залогинен -->
    <div v-else>
      Привет, {{ userStore.userName }}
      <v-btn @click="logout">Выйти</v-btn>
    </div>

    <!-- Модальное окно -->
    <Modal :isOpen="showModal" @close="close">
      <template #close>
        Закрыть
      </template>
      <template v-if="isLoginMode">
        <Login @switchToRegister="switchToRegister" :close="close"/>
      </template>
      <template v-else>
        <Register @switchToLogin="switchToLogin" :close="close"/>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Modal from '@/components/Modal.vue';
import Register from './Register.vue';
import Login from './Login.vue';
import { useUserStore } from '@/stores/userStore'; // Ваш Pinia Store
onMounted(() => {
  userStore.initializeUser();
});
const showModal = ref(false);
const isLoginMode = ref(true);
const userStore = useUserStore();

const open = (loginMode: boolean) => {
  isLoginMode.value = loginMode; // Устанавливаем режим (вход или регистрация)
  showModal.value = true; // Показываем модальное окно
};

const close = () => {
  console.log('Закрываю модальное окно');  // Добавьте лог
  showModal.value = false; // Закрываем модальное окно
};

const switchToRegister = () => {
  isLoginMode.value = false; // Переключаемся на форму регистрации
};

const switchToLogin = () => {
  isLoginMode.value = true; // Переключаемся на форму входа
};

const logout = () => {
  userStore.logout(); // Сбрасываем данные пользователя в хранилище
};
</script>
