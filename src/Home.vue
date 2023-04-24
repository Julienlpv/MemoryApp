<template>
  <div>
    <h1>Quiz de mémorisation</h1>
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

</style>