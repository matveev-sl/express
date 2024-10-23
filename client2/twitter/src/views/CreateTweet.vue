<template>
    <div>
      <h1>Создать твит</h1>
      <input v-model="tweetBody" placeholder="Введите текст твита" />
      <button @click="saveTweet">Сохранить</button>
    </div>
  </template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup () {
    const tweetBody = ref('')

    const saveTweet = async () => {
      try {
        await axios.post('http://localhost:3000/tweet', { body: tweetBody.value })
        tweetBody.value = '' // Очищаем инпут
        alert('Твит сохранен!')
      } catch (error) {
        console.error('Ошибка при сохранении твита:', error)
      }
    }

    return { tweetBody, saveTweet }
  }
}
</script>
