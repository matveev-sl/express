import { defineStore } from 'pinia';
import { saveTweet, fetchTweets } from '@/api';
// import { useUserStore } from './users.store';

interface TweetsState {
  tweets: Array<{ text: string, userName: string, createdAt: string, image: string | null }>;
  isLoading: boolean;
  skip: number;
  limit: number;
  error: string | null;
    query: string;   
}
// const userStore = useUserStore()
export const useTweetsStore = defineStore('tweets', {
  state: (): TweetsState => ({
    tweets: [],
    isLoading: false,
    skip: 0,
    limit: 5,
    error: null,
    query: ''
  }),
  actions: {
 
    // async saveTweet(tweetBody: string, imageFile: File | null) {
    //   try {
    //     if (!userStore.isLoggedIn) {
    //       throw new Error('Вы не авторизованы');
    //     }
    //     await saveTweet(tweetBody, imageFile, userStore.userName, userStore.token);
    //   } catch (error) {
    //     this.error = 'Ошибка при сохранении твита. Попробуйте снова.';
    //     console.error('Ошибка при сохранении твита:', error);
    //     throw error;
    //   }
    // },

    async loadMoreTweets() {
        if (this.isLoading) return;     
        this.isLoading = true;
        this.error = null;
        const tweets = await fetchTweets( this.limit, this.skip, this.query );
        this.tweets = [...this.tweets, ...tweets];
        this.skip += this.limit; //TODO передалать количество переданных твитов с сервера ()
        console.log ('Loadmoretweets')
    },
  },
});
