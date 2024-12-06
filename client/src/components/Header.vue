<template>
  <div>
    <!-- Навигационные ссылки -->
    <router-link to="/view">Посмотреть твиты</router-link>
    <router-link to="/create">Создать твит</router-link>
    
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Поиск твитов"
        @input="updateSearch"
        class="search-input"
      />
    </div>
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
import { ref, onMounted, watch } from 'vue';
import Modal from '@/components/Modal.vue';
import Register from './Register.vue';
import Login from './Login.vue';
import { useUserStore } from '@/stores/users.store';
import { useRouter } from 'vue-router';
import { useTweetsStore } from '@/stores/tweets.store';
const showModal = ref(false);
const isLoginMode = ref(true);
const userStore = useUserStore();
const tweetsStore = useTweetsStore();
const router = useRouter();
const searchQuery = ref('');

onMounted(() => {
  userStore.initializeUser();
});


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

// const updateSearch = () => {
//   router.push({ query: { search: query.value } }); 
// };
const updateSearch = async () => {
  try {
    tweetsStore.setQuery(searchQuery.value); // Устанавливаем текущий запрос в Pinia
    await tweetsStore.searchTweets(); // Выполняем поиск через Pinia
  } catch (error) {
    console.error('Ошибка при поиске твитов:', error);
  }
};
</script>

<style scoped>
.search-container {
  display: inline-block;
  margin-left: 20px;
}

.search-input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

</style>