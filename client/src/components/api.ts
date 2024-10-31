import axios from 'axios';
import { useUserStore } from '@/stores/userStore'; 
const api = axios.create({
    baseURL: 'http://localhost:3000', // Замени на свой базовый URL
  });
  export const login = async (userName) => {
    const response = await api.post('/login', { userName });
    return response.data;
  };
  
  export const createTweet = async (body, userName) => {
    const response = await api.post('/tweet', { body, userName });
    return response.data;
  };
  export { login, createTweet };
    