import axios from 'axios';
import { useUserStore } from '@/stores/userStore';


const BACKEND_URL = 'http://localhost:3000';

const getAuthHeaders = () => {
  const userStore = useUserStore();
  const token = userStore.token;
  const userName = userStore.userName;

  if (!token || !userName) {
    throw new Error('Пользователь не авторизован');
  }

  return {
    headers: {
      'X-Token': token,
      'X-User': userName,
    },
  };
};

async function callApi (url:string, isAuthorized = false, method = 'GET', body = undefined) {
  let response;
  const headers = isAuthorized ? getAuthHeaders() : {};
  try {
  switch (method) {
    case 'GET':
     response = await axios.get(`${BACKEND_URL}${url}`,headers)
     break
     case 'POST':
     response = await axios.post(`${BACKEND_URL}${url}`,body, headers )
     break
    default:
     throw new Error ("callApi не поттерживает метод")
  }
  } catch (error) {
    console.error ('callApi error', error)
    if (axios.isAxiosError(error)) {
      if (error.code==="ERR_NETWORK") {
        throw new Error ("Нет соединения")
      }
      if (error.status === 500) {
        throw new Error ('Сервер отвечает ошибкой')
      } 
      throw new Error (error.response?.data.message) 
    } 
    throw error
    
  }
  console.log("Response", response)
  return response
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users/login`, { email, password });
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
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 400) {
        console.error('Неверные данные для входа:', message);
        throw new Error('Неверные данные для входа');
      } else if (status === 500) {
        console.error('Ошибка на сервере при попытке входа:', message);
        throw new Error('Ошибка на сервере, попробуйте позже');
      } 
    }

    console.error('Ошибка при попытке входа:', error);
    throw new Error('Ошибка на сервере, попробуйте позже');
  }
};

export const registerUser = async (data: { name: string, email: string, password: string }) => {
    return await callApi(`/users/register`, false, 'POST',  data );
};

export const saveTweet = async (tweetBody: string) => {
  try {
    await axios.post(`${BACKEND_URL}/tweets`, {
      text: tweetBody,
    }, getAuthHeaders());

    alert('Твит сохранен!');
  } catch (error) {
    console.error('Ошибка при сохранении твита:', error);
    alert('Не удалось сохранить твит');
  }
};

export const fetchTweets = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/tweets`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении твитов:', error);
    throw new Error('Не удалось получить твиты');
  }
};
