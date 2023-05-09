import { defineStore } from 'pinia';

const STORAGE_KEY = ['quiz-cards', 'category-cards', 'theme-cards'];

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

function loadThemesFromStorage() {
  const storedThemes = localStorage.getItem(STORAGE_KEY[2]);
  if (storedThemes) {
    return JSON.parse(storedThemes);
  }
  return [];
}

function saveCardsToStorage(cards) {
  localStorage.setItem(STORAGE_KEY[0], JSON.stringify(cards));
}

function saveCategoriesToStorage(categories) {
  localStorage.setItem(STORAGE_KEY[1], JSON.stringify(categories));
}

function saveThemesToStorage(themes) {
  localStorage.setItem(STORAGE_KEY[2], JSON.stringify(themes));
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
    })),

    themes: loadThemesFromStorage().map((theme) => ({
      ...theme,
    })),
  }),
  actions: {
    addCard(card) {
      this.cards.push(card);
      saveCardsToStorage(this.cards);
    },
    editCard(index, editedCard) {
      this.cards.splice(index, 1, editedCard);
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

    addTheme(theme) {
      this.themes.push(theme);
      saveThemesToStorage(this.themes);
    },
    updateTheme(index, updatedTheme) {
      this.themes.splice(index, 1, updatedTheme);
      saveThemesToStorage(this.themes);
    },
    deleteTheme(index) {
      this.themes.splice(index, 1);
      saveThemesToStorage(this.themes);
    },

        shouldShowQuestion(card) {
      const now = new Date();
      const daysSinceLastAnswered = card.lastAnswered ? (now - card.lastAnswered) / (1000 * 60 * 60 * 24) : Number.POSITIVE_INFINITY;
        console.log('daysSinceLastAnswered' + daysSinceLastAnswered);
        
        console.log(card.correctStreak);


        /////////////////
        ///REPETITION////
        /////////////////
        let createTab = (days) => {
          let resultArray = [];
          let breaksArray = [];
          const daysArray = Array.from(Array(days).keys()).map(index => index + 1);
          let continueFlag = true;
  
          console.log(daysArray);
  
          breaksArray = daysArray.map(day => {
              if(continueFlag){
                  let computedInterval = (2 ** (day - 1));
                  const computedDaysAppearance = daysArray.map(d => {
                      if(d % computedInterval == 0) return day;
                      return 'no';
                  });
                  continueFlag = false;
                  computedDaysAppearance.forEach(day => {
                      if(day != "no") continueFlag = true;
                  });
  
                  return {
                      level: day,
                      interval: computedInterval,
                      daysAppearance: computedDaysAppearance
                  };
              } else {
                  return {
                      level: day,
                      interval: 'nope',
                      daysAppearance: Array.from(Array(days).keys()).map(index => 'no')
                  }
              }
          });
  
          console.table(breaksArray.map(b => {
              return {
                  level: b?.level,
                  interval: b?.interval,
                  daysAppearance: b?.daysAppearance.toString()
              };
          }));
  
          console.log(breaksArray.map(ba => ba?.daysAppearance).filter(item => item));
          let invertedDaysAppearance = transposeArray(breaksArray.map(ba => ba?.daysAppearance).filter(item => item));
          console.log(invertedDaysAppearance);
  
          resultArray = breaksArray.map((b, index) => {
              return {
                  day: index + 1,
                  levelMax: (() => {
                      let lvlMax = 0;
                      b?.daysAppearance.forEach(da => {
                          if(da[index] != 'no') lvlMax = da[index];
                      });
                      return lvlMax;
                  }).apply(),
                  interval: b?.interval
              };
          });
  
          console.table(resultArray);
          return resultArray;
      };
  
      function transposeArray(array){
          let arrayLength = array.length;
          var newArray = [];
          for(let i = 0; i < array.length; i++){
              newArray.push([]);
          };
  
          for(let i = 0; i < array.length; i++){
              for(var j = 0; j < arrayLength; j++){
                  newArray[j].push(array[i][j]);
              };
          };
  
          return newArray;
      }
      
      let nbDay = 20;
      let Finaltab = createTab(nbDay);

      

      ///////////////////////////////
      //////FIN REPETITION///////////
      ///////////////////////////////

      
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
    },
    getThemes(state) {
      return state.themes
    },
    getQuestion(state) {
      // Retourne une fonction qui prend un index en argument et renvoie la question correspondante
      return (index) => {
        if (index >= 0 && index < state.cards.length) {
          return state.cards[index];
        }
        return null;
      };
    },
  },
});


