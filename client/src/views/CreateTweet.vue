<template>
  <div>
    <h1>Создать твит</h1>
    <input v-model="tweetBody" placeholder="Введите текст твита" />
    <button @click="saveTweet">Сохранить</button>
    <LoginModal :show-modal="showLoginModal" @update:showModal="showLoginModal = $event" />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  components: {
  
  },
  setup () {
    const tweetBody = ref('')
    const showLoginModal = ref(false)
    const saveTweet = async () => {
      try {
        await axios.post('http://localhost:3000/tweet', { body: tweetBody.value })
        tweetBody.value = ''
        alert('Твит сохранен!')
      } catch (error) {
        console.error('Ошибка при сохранении твита:', error)
      }
    }

    return { tweetBody, saveTweet, showLoginModal }
  }
}
</script>
