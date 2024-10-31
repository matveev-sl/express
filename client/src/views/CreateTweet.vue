<template>
  <div>
    <h1>Создать твит</h1>
    <input v-model="tweetBody" placeholder="Введите текст твита" />
    <button @click="saveTweet">Сохранить</button>
    <!-- <LoginModal :show-modal="showLoginModal" @update:showModal="showLoginModal = $event" /> что за строчка?--> 
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore';

export default {
  components: {
  
  },
  setup () {
    const tweetBody = ref('')
    const showLoginModal = ref(false)
    const userStore = useUserStore();
    const saveTweet = async () => {
      try {
        const userName = userStore.userName;
        const token = userStore.token;
        console.log ("Юзернейм и токен из пиньи", userName, token)
        console.log(userName)
        await axios.post('http://localhost:3000/tweet', {
          body: tweetBody.value,
          userName: userName,

        }, {
          headers: {'X-User' : userName, 'X-Token' : token}

        });
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
