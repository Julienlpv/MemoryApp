import { defineStore } from 'pinia';
import { getCategories, createCategory, getCards, createCard } from '@/db';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    categories: [],
    cards: [],
  }),
  actions: {
    async fetchCategories() {
      this.categories = await getCategories();
    },
    async fetchCards() {
      this.cards = await getCards();
    },
    async addCategory(name) {
      const newCategory = { name };
      await createCategory(newCategory);
      await this.fetchCategories();
    },
    async addCard(title, categoryId) {
      const newCard = { title, categoryId };
      await createCard(newCard);
      await this.fetchCards();
    },
  },
});
