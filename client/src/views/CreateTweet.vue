<template>
  <div>
    <h1>Создать твит</h1>
    <input v-model="tweetBody" placeholder="Введите текст твита" />
    <button @click="saveTweetAction">Сохранить</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { saveTweet } from '@/api';

const tweetBody = ref('');
const userStore = useUserStore();

const saveTweetAction = async () => {
  try {
    const userName = userStore.userName;
    const token = userStore.token;
    await saveTweet(tweetBody.value, userName, token);
    tweetBody.value = '';
    alert('Твит сохранен!');
  } catch (error) {
    console.error('Ошибка при сохранении твита:', error);
  }
};
</script>
