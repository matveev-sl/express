// src/api.ts
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
const BACKEND_URL = 'http://localhost:3000/';
// Функция для получения токена из Pinia
const getAuthHeaders = () => {
  const userStore = useUserStore();
  const token = userStore.token;
  const userName = userStore.userName;

  return {
    headers: {
      'X-Token': token,
      'X-User': userName,
    },
  };
};

// Функция логина пользователя
export const loginUser = async (userName: string) => {
  const response = await axios.post(BACKEND_URL + 'login', { userName });
  return response.data;
};

// Функция для создания твита
export async function saveTweet(tweetBody: string, userName: string, token: string) {
  try {
    console.log("Юзернейм и токен из параметров", userName, token);
    await axios.post('http://localhost:3000/tweets', {
      text: tweetBody
    }, {
      headers: { 'X-User': userName, 'X-Token': token },
    });
    alert('Твит сохранен!');
  } catch (error) {
    console.error('Ошибка при сохранении твита:', error);
  }
}

// Функция для получения списка твитов
export const fetchTweets = async () => {
  const response = await axios.get('http://localhost:3000/tweets');
  return response.data;
};
