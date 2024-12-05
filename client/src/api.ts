import axios from 'axios';
import { useUserStore } from '@/stores/users.store';
import type {Tweet} from "@/stores/tweets.store";


const BACKEND_URL = 'http://localhost:3000';

const getAuthHeaders = () => {
  const userStore = useUserStore();
  const token = userStore.token;
  const userName = userStore.userName;

  if (!token || !userName) {
    // throw new Error('Пользователь не авторизован');
    return {}
  }

  return {
    'X-Token': token,
    'X-User': userName,
  };
};

// Функция callApi с правильным типом для body
async function callApi(url: string, isAuthorized = false, method = 'GET', body: any = undefined) {
  const headers = isAuthorized ? getAuthHeaders() : {};

  // Если передается FormData, нужно установить Content-Type
  if (body instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  let serverCall
  switch (method) {
    case 'GET':
      serverCall = axios.get(`${BACKEND_URL}${url}`, { headers });
      break;
    case 'POST':
      serverCall =  axios.post(`${BACKEND_URL}${url}`, body, { headers });
      break;
    default:
      throw new Error("callApi не поддерживает указанный метод");
  }

  try {
    const response = await serverCall
    console.log ("Ответ сервера:", response);
    return response.data;
  } catch (error) {
    console.error('Ошибка в callApi:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        throw new Error("Нет соединения с сервером");
      }
      if (error.response?.status === 500) {
        throw new Error("Сервер вернул ошибку");
      }
      throw new Error(error.response?.data.message || "Неизвестная ошибка");
    }
    throw error; // Если ошибка не относится к Axios
  }
}

export const loginUser = async (email: string, password: string) => {

    const data = await callApi(`/users/login`, false,'POST',{ email, password });
    console.log(data)
    return data;
};

export const registerUser = async (data: { name: string, email: string, password: string }) => {
    return await callApi(`/users/register`, false, 'POST',  data );
};

export const postTweet = async (tweetBody: string, imageFile: File | null) => {
  try {
    const formData = new FormData();
    formData.append('text', tweetBody);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    await callApi('/tweets', true, 'POST', formData);
  } catch (error) {
    console.error('Ошибка при сохранении твита:', error);
    throw error;
  }
};

export const fetchTweets = async (skip: number, limit: number, query?: string): Promise<{ count: number, tweets: Tweet[] }> => {
  try {
    const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
    const data = await callApi(`/tweets?${params.toString()}`, true, 'GET', params);
    return { count: data.count, tweets: data.tweets };
  } catch (error) {
    console.error('Ошибка при получении твитов:', error);
    throw new Error('Не удалось получить твиты');
  }
};

