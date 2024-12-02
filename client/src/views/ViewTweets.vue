<template>
  <div class="tweets-container">
    <h1>Просмотреть твиты</h1>

    <!-- Состояние загрузки -->
    <div v-if="tweetsStore.isLoading">Loading...</div>

    <!-- Сообщение, если нет твитов -->
    <div v-else-if="tweetsStore.tweets.length===0">No tweets...</div>

    <!-- Список твитов -->
    <ul v-else class="tweets-list">
      <li v-for="tweet in tweetsStore.tweets" :key="tweet._id" class="tweet-item">
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
    <div >
      <button @click="loadMoreTweets" class="load-more-button">Загрузить еще</button>
    </div>

    <!-- Сообщение, если все твиты загружены -->
    <!-- <div v-if="noMoreTweets" class="no-more-tweets">Больше твитов нет</div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTweetsStore } from '@/stores/tweets.store';
const tweetsStore = useTweetsStore();
const loadMoreTweets = () => {
  tweetsStore.loadMoreTweets();
  console.log ('Loadmore tweets Component')
}
const route = useRoute();
const BASE_URL = 'http://localhost:3000/'

const getFullImageUrl = (imagePath: string): string => {
  return `${BASE_URL}/${imagePath}`;
};

onMounted(() => {
  tweetsStore.loadMoreTweets();
});
watch(
  () => route.query.search,
  (newSearch) => {
  console.log('Параметр поиска:', newSearch);
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
