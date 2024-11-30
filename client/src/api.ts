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

async function callApi(url: string, isAuthorized = false, method = 'GET', body = undefined) {
  let response;
  const headers = isAuthorized ? getAuthHeaders() : {};
  
  
  // if (body instanceof FormData) {
  //   headers['headers']['Content-Type'] = 'multipart/form-data';
  // }
  
  try {
    switch (method) {
      case 'GET':
        response = await axios.get(`${BACKEND_URL}${url}`, headers);
        break;
      case 'POST':
        response = await axios.post(`${BACKEND_URL}${url}`, body, headers);
        break;
      default:
        throw new Error("callApi не поддерживает указанный метод");
    }
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
  
  console.log ("Ответ сервера:", response);
  return response.data;
}


export const loginUser = async (email: string, password: string) => {
  
    const data = await callApi(`/users/login`, false,'POST',{ email, password });
    console.log(data)
    // if (data.token) {
    //   const userStore = useUserStore();
    //   userStore.setUser({
    //     token: data.token,
    //     userName: data.userName,
    //   });
    // }
    
    return data;
};

export const registerUser = async (data: { name: string, email: string, password: string }) => {
    return await callApi(`/users/register`, false, 'POST',  data );
};



export const saveTweet = async (tweetBody: string, imageFile: File | null, userName: string, token: string) => {
  try {
    console.log("какие данные передает", tweetBody, imageFile, userName, token)
    const formData = new FormData();
    
    formData.append('text', tweetBody);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    console.log('FormData перед отправкой:');
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`${key}: ${value.name}, ${value.size} bytes`);  // Логируем имя и размер файла
      } else {
        console.log(`${key}: ${value}`); // Логируем обычные данные
      }
    });
    const headers = {
      'Authorization': `Bearer ${token}`,
      // 'Content-Type': 'multipart/form-data', // Убедитесь, что сервер поддерживает форму типа multipart
    };
    
    await callApi('/tweets', true, 'POST', formData, headers);
  } catch (error) {
    console.error('Ошибка при сохранении твита:', error);
    throw error;
  }
};

export const fetchTweets = async (skip: number, limit: number) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/tweets`, {
      params: {
        skip,  
        limit, 
      },
      headers: getAuthHeaders(),  
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении твитов:', error);
    throw new Error('Не удалось получить твиты');
  }
};
