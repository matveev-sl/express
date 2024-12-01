import { defineStore } from 'pinia';
import { loginUser, registerUser} from '@/api';

interface UserState {
  userName: string;
  token: string;
  isLoggedIn: boolean;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userName: '',
    token: '',
    isLoggedIn: false,
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
  },
});
