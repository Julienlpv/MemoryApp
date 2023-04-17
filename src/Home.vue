<!-- src/Home.vue -->
<template>
  <div>
    <h1>Quiz de mémorisation</h1>
    <nav>
      <router-link to="/addquestion">Ajouter une question</router-link>
      <router-link to="/addcategory">Ajouter une catégorie</router-link>
      <router-link to="/quiz">Démarrer le quiz</router-link>
    </nav>
  </div>
</template>

<script>

import { useQuizStore } from './stores/quizStore';

export default {
  
  setup() {
    const quizStore = useQuizStore();

    function refreshCards() {
      quizStore.refreshCards();
    }

    return { cards: quizStore.cards, refreshCards };
  },
};
</script>

<style>
h1{
  text-align: center;
}
nav{
  display: flex;
  text-align: center;
}
</style>