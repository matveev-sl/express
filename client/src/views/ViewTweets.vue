<template>
  <div class="tweets-container">
    <h1>Просмотреть твиты</h1>
    
    <!-- Состояние загрузки -->
    <div v-if="loading" class="loading">Загрузка...</div>

    <!-- Сообщение, если нет твитов -->
    <div v-else-if="tweets.length === 0" class="no-tweets">Нет твитов для отображения.</div>

    <!-- Список твитов -->
    <ul v-else class="tweets-list">
      <li v-for="tweet in tweets" :key="tweet._id" class="tweet-item">
        <div class="tweet-content">
          <!-- Имя пользователя и текст -->
          <p><strong>{{ tweet.userName }}:</strong> {{ tweet.text }}</p>
          <p class="tweet-date">{{ new Date(tweet.createdAt).toLocaleString() }}</p>
          <!-- Условное отображение изображения -->
          <img v-if="tweet.image" :src="getFullImageUrl(tweet.image)" alt="Tweet image" class="tweet-image" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchTweets } from '@/api'; // Функция для получения твитов с API

const tweets = ref([]); // Массив твитов
const loading = ref(true); // Состояние загрузки
const BASE_URL = 'http://localhost:3000'

const getFullImageUrl = (imagePath) => {
  const fullUrl = `${BASE_URL}/${imagePath}`
  console.log ("ФуллУрл", fullUrl)
  return fullUrl;
};
const fetchTweetsAction = async () => {
  try {
    tweets.value = await fetchTweets(); // Получаем твиты
  } catch (error) {
    console.error('Ошибка при получении твитов:', error);
  } finally {
    loading.value = false; // Завершаем загрузку
  }
};

onMounted(fetchTweetsAction); // Загружаем твиты при монтировании компонента
</script>

<style scoped>
.tweets-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.loading, .no-tweets {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.tweets-list {
  list-style: none;
  padding: 0;
}

.tweet-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
}

.tweet-content p {
  margin: 0;
}

.tweet-date {
  font-size: 12px;
  color: #888;
}

.tweet-image {
  display: block;
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 8px;
}
</style>
