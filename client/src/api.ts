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

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(BACKEND_URL + 'users/login', { email, password });
    const data = response.data;

    if (data.token) {
      const userStore = useUserStore();
      userStore.setUser({
        token: data.token,
        userName: data.userName, 
      });
    }

    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Неверные данные для входа:', error.response.data.message);
      throw new Error('Неверные данные для входа');
    } else {
      console.error('Ошибка при попытке входа:', error);
      throw new Error('Ошибка на сервере, попробуйте позже');
    }
  }
};

// Функция для регистрации пользователя
export const registerUser = async (data: { name: string, email: string, password: string }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}users/register`, data);
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
