import { defineStore } from 'pinia';
import { loginUser, registerUser, saveTweet, fetchTweets } from '@/api';

interface UserState {
  userName: string;
  token: string;
  isLoggedIn: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userName: '',
    token: '',
    isLoggedIn: false,
  }),
  actions: {
    // Установка пользователя
    setUser(name: string, token: string) {
      this.userName = name;
      this.token = token;
      this.isLoggedIn = true;
      localStorage.setItem('userName', name);
      localStorage.setItem('token', token);
    },

    // Логаут
    logout() {
      this.userName = '';
      this.token = '';
      this.isLoggedIn = false;
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
    },

    // Инициализация пользователя из localStorage
    initializeUser() {
      const storedUserName = localStorage.getItem('userName');
      const storedToken = localStorage.getItem('token');

      if (storedUserName && storedToken) {
        this.setUser(storedUserName, storedToken);
      }
    },

    // Авторизация пользователя через API
    async login(email: string, password: string) {
      try {
        const data = await loginUser(email, password);
        this.setUser(data.userName, data.token);
      } catch (error) {
        console.error('Ошибка при логине:', error);
        throw error;
      }
    },

    // Регистрация пользователя через API
    async register(name: string, email: string, password: string) {
      try {
        await registerUser({ name, email, password });
        alert('Регистрация прошла успешно');
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
        throw error;
      }
    },

    // Сохранение твита через API
    async saveTweet(tweetBody: string, imageFile: File | null) {
      try {
        if (!this.isLoggedIn) {
          throw new Error('Вы не авторизованы');
        }
        await saveTweet(tweetBody, imageFile, this.userName, this.token);
      } catch (error) {
        console.error('Ошибка при сохранении твита:', error);
        throw error;
      }
    },

    // Получение списка твитов через API
    async fetchTweets() {
      try {
        return await fetchTweets();
      } catch (error) {
        console.error('Ошибка при получении твитов:', error);
        throw error;
      }
    },
  },
});
