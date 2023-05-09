import { defineStore } from 'pinia';
import { getThemes, createTheme } from '@/db';

export const useThemeStore = defineStore('themeStore', {
  state: () => ({
    themes: [],
  }),
  actions: {
    async fetchThemes() {
      this.themes = await getThemes();
    },
    async addTheme(name) {
      const newTheme = { name };
      await createTheme(newTheme);
      await this.fetchThemes();
    },
  },
});