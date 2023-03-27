import { defineStore } from 'pinia';
import { getCards, createCard } from '@/db';

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    cards: [],
  }),
  actions: {
    async fetchCards() {
      this.cards = await getCards();
    },
    async addCard(title, categoryId) {
      const newCard = { title, categoryId };
      await createCard(newCard);
      await this.fetchCards();
    },
  },
});
