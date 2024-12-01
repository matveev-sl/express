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

    <!-- Кнопка для загрузки дополнительных твитов -->
    <div v-if="!loading && !noMoreTweets">
      <button @click="loadMoreTweets" class="load-more-button">Загрузить еще</button>
    </div>

    <!-- Сообщение, если все твиты загружены -->
    <div v-if="noMoreTweets" class="no-more-tweets">Больше твитов нет</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchTweets } from '@/api'; // Функция для получения твитов с API
import { useRoute } from 'vue-router'; 

const tweets = ref<Array<any>>([]); // Массив твитов
const loading = ref<boolean>(true); // Состояние загрузки
const skip = ref<number>(0); // Параметр для пагинации
const limit = ref<number>(5); // Лимит для пагинации
const noMoreTweets = ref<boolean>(false); // Флаг, если твиты больше не загружаются
const BASE_URL = 'http://localhost:3000';
const searchQuery = ref('');
const route = useRoute();

const getFullImageUrl = (imagePath: string): string => {
  return `${BASE_URL}/${imagePath}`;
};

const fetchTweetsAction = async (query?: string) => {
  try {
    const currentScrollPosition = window.scrollY;
    const newTweets = await fetchTweets(skip.value, limit.value, query);
    if (newTweets.length === 0) {
      noMoreTweets.value = true; 
    } else {
      tweets.value.push(...newTweets); 
      skip.value += limit.value; 
    }
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollPosition);
    });
  } catch (error) {
    console.error('Ошибка при получении твитов:', error);
  } finally {
    loading.value = false; // Завершаем загрузку
  }
};

// Функция для загрузки дополнительных твитов по кнопке
const loadMoreTweets = () => {
  loading.value = true;
  fetchTweetsAction(route.query.search as string | undefined);
};

// Загружаем твиты при монтировании компонента
onMounted(() => {
  fetchTweetsAction(route.query.search as string | undefined);
});

// Наблюдаем за изменением параметра поиска в URL
watch(
  () => route.query.search,
  (newSearch) => {
    console.log('Параметр поиска:', newSearch);
    searchQuery.value = newSearch || '';
    tweets.value = []; // Сбрасываем текущий список твитов
    skip.value = 0;
    noMoreTweets.value = false;
    fetchTweetsAction(newSearch as string | undefined); // Передаем новый параметр
  },
  { immediate: true }
);
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

.load-more-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.load-more-button:hover {
  background-color: #45a049;
}

.no-more-tweets {
  text-align: center;
  font-size: 16px;
  color: #888;
}
</style>
