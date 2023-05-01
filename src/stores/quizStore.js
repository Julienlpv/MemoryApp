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
function saveCategoriesToStorage(categories) {
  localStorage.setItem(STORAGE_KEY[1], JSON.stringify(categories));
}



export const useQuizStore = defineStore('quiz', {
  state: () => ({
    cards: loadCardsFromStorage().map((card) => ({
      ...card,
      lastAnswered: card.lastAnswered ? new Date(card.lastAnswered) : null,
      correctStreak: card.correctStreak || 0,
    })),

    categories: loadCategoryFromStorage().map((category) => ({
      ...category,
    }))
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
    
    
    shouldShowQuestion(card) {
      const now = new Date();
      const daysSinceLastAnswered = card.lastAnswered ? (now - card.lastAnswered) / (1000 * 60 * 60 * 24) : Number.POSITIVE_INFINITY;
        console.log('daysSinceLastAnswered' + daysSinceLastAnswered);
        
        console.log(card.correctStreak);

        let nbNiveau = 0
        let tab=[]
        for(var i=1; i<nbNiveau+1; i++){
          for(var j=1; j<i; j++ ){
            if(i%(j*2)==0 ){
              tab.push(j)
            }
          }
        }
          
        
    
      

      // 
      // 1 - 2 - 4 - 12 - 24 - 56


      switch (card.correctStreak) {
        case 0:
        case 1:
          return daysSinceLastAnswered >= 1;
        case 2:
          return daysSinceLastAnswered >= 3;// *2
        case 3:
          return daysSinceLastAnswered >= 6;// *3 
        default:
          return daysSinceLastAnswered >= 18;// *4
      }
      },
    
    answerCard(index, isCorrect) {
      const card = this.cards[index];
        // card.lastAnswered = new Date();

        // TESTS 3J AVANT POUR LE JUSTE ET LE FAUX : OK
        card.lastAnswered = new Date(Date.now() -  3* (24 * 60 * 60 * 1000));
        
        console.log('Last ANSWERED ' + card.lastAnswered);
      if (isCorrect) {
        card.correctStreak++;
      } else {
        card.correctStreak = 0;
      }
      saveCardsToStorage(this.cards);
      },
    
    refreshCards() {
      const availableCards = this.filteredCards;
      if (availableCards.length === 0) {
          this.currentCardIndex = -1;
      } else {
        const currentCard = this.cards[this.currentCardIndex];
        if (!currentCard || currentCard.correctStreak > 0) {
          const newIndex = Math.floor(Math.random() * availableCards.length);
          this.currentCardIndex = this.cards.indexOf(availableCards[newIndex]);
        }
      }
    },


  },
  getters: {
    filteredCards(state) {
      return state.cards.filter((card) => this.shouldShowQuestion(card));
    },
    getCategories(state){
      return state.categories;
    }
  },
});
