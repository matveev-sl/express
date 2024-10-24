<template>
  <div>
    <h1>Создать твит</h1>
    <input v-model="tweetBody" placeholder="Введите текст твита" />
    <button @click="saveTweet">Сохранить</button>
    <v-btn @click="showLoginModal = true">Войти</v-btn>
    <router-link to="/view">Посмотреть твиты</router-link>
    <LoginModal :show-modal="showLoginModal" @update:showModal="showLoginModal = $event" />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import LoginModal from '@/components/LoginModal.vue'

export default {
  components: {
    LoginModal
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
