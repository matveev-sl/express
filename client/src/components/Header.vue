<template>
  <div>
    <router-link to="/view">Посмотреть твиты</router-link>
    <router-link to="/create">Создать твит</router-link>
  </div>
  <v-btn @click="open">Открыть</v-btn>
  <Modal :isOpen=showModal @close="close">
    <template #close>
      Custom close
    </template>
    <p>Привет я контент модал!</p>
  </Modal>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Modal from '@/components/Modal.vue'
const showModal = ref(false)

const open = ()=> {
  showModal.value = true
}
const close = ()=>{
  showModal.value = false
}

</script>
