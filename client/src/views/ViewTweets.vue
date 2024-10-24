<template>
  <div>
    <h1>Просмотреть твиты</h1>

    <!-- Ссылка на страницу создания твита -->
    <router-link to="/create" class="create-tweet-link">Создать новый твит</router-link>
    
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
.tweet-item {
  margin: 10px 0; /* Отступы между твитами */
  padding: 10px; /* Внутренние отступы */
  border: 1px solid #e0e0e0; /* Граница твита */
  border-radius: 5px; /* Закругление углов */
  background-color: #f9f9f9; /* Фоновый цвет */
  transition: background-color 0.3s; /* Плавный переход фона */
}

.tweet-item:hover {
  background-color: #f1f1f1; /* Изменение фона при наведении */
}

.create-tweet-link {
  display: inline-block; /* Блочный элемент для стилей */
  margin-bottom: 15px; /* Отступ снизу */
  padding: 10px 15px; /* Внутренние отступы */
  background-color: #6200ea; /* Фоновый цвет */
  color: white; /* Цвет текста */
  border-radius: 5px; /* Закругление углов */
  text-decoration: none; /* Убираем подчеркивание */
}

.create-tweet-link:hover {
  background-color: #3700b3; /* Темный цвет при наведении */
}
</style>
