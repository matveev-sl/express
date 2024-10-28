<template>
  <v-btn @click="show = true">Войти</v-btn>
  <v-dialog v-model="show" max-width="400">
    <v-card>
      <v-card-title>Войти</v-card-title>
      <v-card-text>
      <v-text-field v-model="name" label="Введите ваше имя" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="login">Войти</v-btn>
        <v-btn @click="show = false">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from "axios";
  const show = ref(false)
  const name = ref('')
  
  
    const login = async () => {
      try {
        const response = await axios.post('http://localhost:3000/login', { userName: name.value });
        name.value = ''
        console.log("Вывод логина" , response)
      } catch (error) {
        console.error('Ошибка при Логине:', error)
      }
    }
</script>
