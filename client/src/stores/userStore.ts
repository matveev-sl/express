import { defineStore } from 'pinia';
import { loginUser, registerUser, saveTweet, fetchTweets } from '@/api';

interface UserState {
  userName: string;
  token: string;
  isLoggedIn: boolean;
  tweets: Array<{ text: string, userName: string, createdAt: string, image: string | null }>;
  loadingTweets: boolean;
  skip: number;
  limit: number;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userName: '',
    token: '',
    isLoggedIn: false,
    tweets: [],
    loadingTweets: false,
    skip: 0,
    limit: 5,
    error: null,
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
        this.error = 'Ошибка при логине. Пожалуйста, попробуйте снова.';
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
        this.error = 'Ошибка при регистрации. Пожалуйста, попробуйте снова.';
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
        this.error = 'Ошибка при сохранении твита. Попробуйте снова.';
        console.error('Ошибка при сохранении твита:', error);
        throw error;
      }
    },

    async fetchTweets() {
      if (this.loadingTweets) return; // избегаем повторных запросов

      this.loadingTweets = true;
      this.error = null; // сбрасываем ошибку перед запросом
      try {
        const tweets = await fetchTweets({ limit: this.limit, skip: this.skip });

        this.tweets = [...this.tweets, ...tweets];

        this.skip += this.limit;
      } catch (error) {
        this.error = 'Ошибка при получении твитов. Пожалуйста, попробуйте позже.';
        console.error('Ошибка при получении твитов:', error);
        throw error;
      } finally {
        this.loadingTweets = false;
      }
    },
  },
});
