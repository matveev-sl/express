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
        {{ tweet.body }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup () {
    const tweets = ref([])
    const loading = ref(true) // Состояние загрузки

    const fetchTweets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tweets')
        tweets.value = response.data // Заполняем массив твитов
      } catch (error) {
        console.error('Ошибка при получении твитов:', error)
      } finally {
        loading.value = false // Устанавливаем состояние загрузки в false после получения данных
      }
    }

    onMounted(fetchTweets) // Получаем твиты при монтировании компонента

    return { tweets, loading }
  }
}
</script>

<style>
</style>
