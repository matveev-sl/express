<template>
  <div>
    <router-link to="/view">Посмотреть твиты</router-link>
    <router-link to="/create">Создать твит</router-link>
  </div>
  <v-btn @click="showModal=true">Открыть</v-btn>
  <Modal v-model="showModal">
<p> Привет я контент модал </p>
    </Modal>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Modal from '@/components/Modal.vue'
const showModal = ref(false)
</script>