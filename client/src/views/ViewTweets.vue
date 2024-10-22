<template>
    <div>
      <h1>Просмотреть твиты</h1>
      <ul>
        <li v-for="tweet in tweets" :key="tweet._id">{{ tweet.body }}</li>
      </ul>
    </div>
  </template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup () {
    const tweets = ref([])

    const fetchTweets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tweets')
        tweets.value = response.data // Заполняем массив твитов
      } catch (error) {
        console.error('Ошибка при получении твитов:', error)
      }
    }

    onMounted(fetchTweets) // Получаем твиты при монтировании компонента

    return { tweets }
  }
}
</script>
