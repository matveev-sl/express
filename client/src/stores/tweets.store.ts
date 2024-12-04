import { defineStore } from 'pinia';
import { postTweet, fetchTweets } from '@/api';

interface TweetsState {
  tweets: Array<{ text: string, userName: string, createdAt: string, image: string | null }>;
  isLoading: boolean;
  skip: number;
  limit: number;
  error: string | null;
  query: string;
  noMoreTweets: boolean;
}

export const useTweetsStore = defineStore('tweets', {
  state: (): TweetsState => ({
    tweets: [],
    isLoading: false,
    skip: 0,
    limit: 5,
    error: null,
    query: '',
    noMoreTweets: false,
  }),
  actions: {
    async saveTweet(tweetBody: string, imageFile: File | null) {
        await postTweet(tweetBody, imageFile, "userStore.userName", "userStore.token");
    },

    async loadMoreTweets() {
        if (this.isLoading || this.noMoreTweets) return;
        this.isLoading = true;
        this.error = null;
        const tweets = await fetchTweets( this.skip, this.limit, this.query );
        this.isLoading = false;
        this.tweets = [...this.tweets, ...tweets];
        this.skip += this.limit; //TODO передалать количество переданных твитов с сервера ()
        console.log ('Loadmoretweets')
    },
  },
});
