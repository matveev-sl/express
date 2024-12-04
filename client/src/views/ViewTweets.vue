<template>
  <div class="tweets-container" ref="container">
    <h1>Просмотреть твиты</h1>

    <!-- Состояние загрузки -->
    <div v-if="tweetsStore.isLoading">Loading...</div>

    <!-- Сообщение, если нет твитов -->
    <div v-else-if="tweetsStore.tweets.length === 0">No tweets...</div>

    <!-- Список твитов -->
    <ul v-else class="tweets-list">
      <li v-for="tweet in tweetsStore.tweets" :key="tweet.id" class="tweet-item">
        <div class="tweet-content">
          <!-- Имя пользователя и текст -->
          <p><strong>{{ tweet.userName }}:</strong> {{ tweet.text }}</p>
          <p class="tweet-date">{{ new Date(tweet.createdAt).toLocaleString() }}</p>
          <!-- Условное отображение изображения -->
          <img v-if="tweet.image" :src="getFullImageUrl(tweet.image)" alt="Tweet image" class="tweet-image" />
        </div>
      </li>
    </ul>

    <div v-if="tweetsStore.isLoading" class="loading-more">Loading more tweets...</div>

    <div v-if="!tweetsStore.isMoreTweets" class="no-more-tweets">Больше твитов нет</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useTweetsStore } from '@/stores/tweets.store';

const tweetsStore = useTweetsStore();
const container = ref<HTMLDivElement | null>(null);

const handleScroll = () => {
  if (!container.value) return;

  const { scrollTop, scrollHeight, clientHeight } = container.value;
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    if (!tweetsStore.isLoading && !tweetsStore.noMoreTweets) {
      tweetsStore.loadMoreTweets();
    }
  }
};

onMounted(() => {
  tweetsStore.loadMoreTweets();
  container.value?.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  container.value?.removeEventListener('scroll', handleScroll);
});

const BASE_URL = 'http://localhost:3000/';
const getFullImageUrl = (imagePath: string): string => `${BASE_URL}${imagePath}`;
</script>

<style scoped>
.tweets-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  height: 80vh; /* Ограниченная высота для скролла */
  overflow-y: auto;
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

.loading-more {
  text-align: center;
  margin: 10px 0;
  font-size: 14px;
  color: #666;
}

.no-more-tweets {
  text-align: center;
  font-size: 16px;
  color: #888;
}
</style>
