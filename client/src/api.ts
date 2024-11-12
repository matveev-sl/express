import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

// Базовый URL для API
const BACKEND_URL = 'http://localhost:3000/';

// Получение токена и имени пользователя из Pinia
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
  try {
    const response = await axios.post(`${BACKEND_URL}login`, { userName });
    return response.data;
  } catch (error) {
    console.error('Ошибка при логине:', error);
    throw new Error('Не удалось войти');
  }
};

// Функция для регистрации пользователя
export const registerUser = async (data: { name: string, email: string, password: string }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}user`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Ошибка ответа от сервера:', error.response);
      throw error; // Повторно выбрасываем ошибку для обработки в компоненте
    } else {
      console.error('Ошибка при запросе:', error);
      throw error;
    }
  }
};

// Функция для создания твита
export const saveTweet = async (tweetBody: string, userName: string, token: string) => {
  try {
    await axios.post(`${BACKEND_URL}tweets`, {
      text: tweetBody,
    }, getAuthHeaders());

    alert('Твит сохранен!');
  } catch (error) {
    console.error('Ошибка при сохранении твита:', error);
    alert('Не удалось сохранить твит');
  }
};

// Функция для получения списка твитов
export const fetchTweets = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}tweets`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении твитов:', error);
    throw new Error('Не удалось получить твиты');
  }
};
