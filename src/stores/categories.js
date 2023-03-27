import { defineStore } from 'pinia';
import { getCategories, createCategory } from '@/db';

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [],
  }),
  actions: {
    async fetchCategories() {
      this.categories = await getCategories();
    },
    async addCategory(name) {
      const newCategory = { name };
      await createCategory(newCategory);
      await this.fetchCategories();
    },
  },
});
