<template>
  <div>
    <h1>Создать твит</h1>
    <input v-model="tweetBody" placeholder="Введите текст твита" />
    <input type="file" @change="handleImageUpload" />
    <button @click="saveTweetAction">Сохранить</button>
    <div v-if="imageFile">
      <h3>Выбранное изображение:</h3>
      <img :src="imagePreviewUrl" alt="Превью изображения" width="100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { saveTweet } from '@/api'; 

const tweetBody = ref('');
const userStore = useUserStore();
const imageFile = ref<File | null>(null);
const imagePreviewUrl = ref('');

// Обработчик для загрузки изображения
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files ? input.files[0] : null;
  if (file) {
    imageFile.value = file;
    imagePreviewUrl.value = URL.createObjectURL(file); // Превью изображения
  }
};

// Функция для отправки твита
const saveTweetAction = async () => {
  try {
    const userName = userStore.userName;
    const token = userStore.token;
    
    if (!tweetBody.value || !imageFile.value) {
      alert('Пожалуйста, заполните текст и выберите изображение!');
      return;
    }

    await saveTweet(tweetBody.value, imageFile.value, userName, token);

    // После успешного сохранения очищаем поля
    tweetBody.value = '';
    imageFile.value = null;
    imagePreviewUrl.value = '';

    alert('Твит сохранен!');
  } catch (error) {
    console.error('Ошибка при сохранении твита:', error);
    alert('Не удалось сохранить твит');
  }
};
</script>

<style scoped>
.tweet-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

input[type="file"] {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
