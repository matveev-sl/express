import { defineStore } from 'pinia';
import { postTweet, fetchTweets } from '@/api';

export interface Tweet {
  id: string;
  text: string;
  userName: string;
  createdAt: string;
  image: string | null;
}

interface TweetsState {
  tweets: Array<Tweet>;
  count: number;
  isLoading: boolean;
  limit: number;
  error: string | null;
  query: string;
  noMoreTweets: boolean;
}

export const useTweetsStore = defineStore('tweets', {
  state: (): TweetsState => ({
    tweets: [],
    isLoading: false,
    count: Infinity,
    limit: 5,
    error: null,
    query: '',
    noMoreTweets: false,
  }),
  getters: {
    isMoreTweets(): boolean {
      return this.tweets.length < this.count
    },
    skip(): number {
      return this.tweets.length
    }
  },
  actions: {
    async saveTweet(tweetBody: string, imageFile: File | null) {
        await postTweet(tweetBody, imageFile);
    },

    async loadMoreTweets() {
      console.log ('Loadmoretweets')
      this.isLoading = true;
      this.error = null;
      const { count, tweets} = await fetchTweets( this.skip, this.limit, this.query );
      this.isLoading = false;
      this.tweets = [...this.tweets, ...tweets];
      this.count = count;
    },
  },
});
