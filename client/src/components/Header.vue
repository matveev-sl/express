<template>
  <div>
    <router-link to="/view">Посмотреть твиты</router-link>
    <router-link to="/create">Создать твит</router-link>
  </div>
  <AuthDialog />
</template>

<script>
import { ref } from 'vue'
import AuthDialog from '@/components/Modal.vue'

export default {
  components: {
    AuthDialog
  },
  setup () {
    const showLoginModal = ref(false)
    return {showLoginModal}
  }
  
}
</script>