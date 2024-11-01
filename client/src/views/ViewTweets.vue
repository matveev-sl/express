<template>
  <div>
    <h1>Просмотреть твиты</h1>
    
    <!-- Условие для отображения состояния загрузки -->
    <div v-if="loading">Загрузка...</div>

    <!-- Условие для отображения сообщения, если нет твитов -->
    <div v-else-if="tweets.length === 0">Нет твитов для отображения.</div>

    <!-- Отображение списка твитов -->
    <ul v-else>
      <li v-for="tweet in tweets" :key="tweet._id" class="tweet-item">
        <strong>{{ tweet.userName }}:</strong> {{ tweet.text }} - {{ tweet.createdAt }}

      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchTweets } from '@/api';

const tweets = ref([]);
const loading = ref(true);

const fetchTweetsAction = async () => {
  try {
    tweets.value = await fetchTweets();
  } catch (error) {
    console.error('Ошибка при получении твитов:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTweetsAction);
</script>

<style>
</style>
