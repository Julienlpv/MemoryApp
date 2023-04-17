// src/store/quizStore.js
import { defineStore } from 'pinia';

const STORAGE_KEY = 'quiz-cards';

function loadCardsFromStorage() {
  const storedCards = localStorage.getItem(STORAGE_KEY);
  if (storedCards) {
    return JSON.parse(storedCards);
  }
  return [];
}

function saveCardsToStorage(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    cards: loadCardsFromStorage(),
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
  },
});
