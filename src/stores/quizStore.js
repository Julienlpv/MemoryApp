// src/store/quizStore.js
import { defineStore } from 'pinia';

const STORAGE_KEY = ['quiz-cards', 'category-cards'];

function loadCardsFromStorage() {
  const storedCards = localStorage.getItem(STORAGE_KEY[0]);
  if (storedCards) {
    return JSON.parse(storedCards);
  }
  return [];
}
function loadCategoryFromStorage() {
  const storedCategories = localStorage.getItem(STORAGE_KEY[1]);
  if (storedCategories) {
    return JSON.parse(storedCategories);
  }
  return [];
}

function saveCardsToStorage(cards) {
  localStorage.setItem(STORAGE_KEY[0], JSON.stringify(cards));
}
function saveCategoriesToStorage(cards) {
  localStorage.setItem(STORAGE_KEY[0], JSON.stringify(cards));
}



export const useQuizStore = defineStore('quiz', {
  state: () => ({
    cards: loadCardsFromStorage(),
    category: loadCategoryFromStorage(),
  }),
  actions: {
    addCard(card) {
      this.cards.push(card);
      saveCardsToStorage(this.cards);
    },
    updateCard(index, updatedCard) {
      this.cards.splice(index, 1, updatedCard);
      saveCardsToStorage(this.cards);
    },
    deleteCard(index) {
      this.cards.splice(index, 1);
      saveCardsToStorage(this.cards);
    },

    addCategory(category) {
      this.categories.push(category);
      saveCategoriesToStorage(this.categories);
    },
    updateCategory(index, updatedCategory) {
      this.categories.splice(index, 1, updatedCategory);
      saveCategoriesToStorage(this.categories);
    },
    deleteCategory(index) {
      this.categories.splice(index, 1);
      saveCategoriesToStorage(this.categories);
    },
  },
});
