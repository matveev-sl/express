
import { defineStore } from 'pinia';

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
      setUser(name: string, token: string) {
        this.userName = name;
        this.token = token;
        this.isLoggedIn = true;
        localStorage.setItem('userName', name);
        localStorage.setItem('token', token);
      },
      logout() {
        this.userName = '';
        this.token = '';
        this.isLoggedIn = false;
      },
      initializeUser() {
        const storedUserName = localStorage.getItem('userName');
        const storedToken = localStorage.getItem('token');
      
        if (storedUserName && storedToken) {
          this.setUser(storedUserName, storedToken);
         
        } else {
          console.log('No user found in localStorage');
        }
      },
    },
  });
