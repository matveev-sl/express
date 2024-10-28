<template>
  <div>
    <router-link to="/view">Посмотреть твиты</router-link>
    <router-link to="/create">Создать твит</router-link>
  </div>
  <LoginModal/>
</template>

<script>
import { ref } from 'vue'
import LoginModal from '@/components/LoginModal.vue'

export default {
  components: {
    LoginModal
  },
  setup () {
    const showLoginModal = ref(false)
    return {showLoginModal}
  }
  
}
</script>