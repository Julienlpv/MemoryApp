<template>
    <div>
        <h1>Quiz Page</h1>
        <div>{{ Message }}</div>
        <button v-if="showNextQuestion" @click="nextQuestion">Prochaine question</button>

        <div v-if="currentCard && !showNextQuestion">
            <h2>{{ currentCard.question }}</h2>
            <input v-model="userAnswer" @keydown.enter="submitAnswer" />
            <button @click="submitAnswer">Envoyer la réponse</button> 
        </div>
        <div v-else>
            <h2>Finito pipo pour aujourd'hui!</h2>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";
import { useQuizStore } from "../stores/quizStore";

export default {
    setup() {
        const quizStore = useQuizStore();
        const userAnswer = ref("");
        const Message = ref("");
        const showNextQuestion = ref(false);
        const filteredCards = computed(() => quizStore.filteredCards);

        const currentCard = computed(() => {
            return filteredCards.value.length > 0 ? filteredCards.value[0] : null;
        });

        function nextQuestion() {
            quizStore.refreshCards();
            userAnswer.value = "";
            Message.value = "";
            showNextQuestion.value = false;
        }

        const submitAnswer = () => {
            if (userAnswer.value.trim() === "") {
                return;
            }

            const isCorrect =
                userAnswer.value.toLowerCase().trim() ===
                currentCard.value.answer.toLowerCase().trim();

            if (isCorrect) {
                console.log('bibi');
                Message.value = "Bravo, vous passez au niveau suivant!";
                quizStore.answerCard(quizStore.cards.indexOf(currentCard.value), true);
                showNextQuestion.value = true;
            }
            else {
                Message.value = "Mauvaise réponse, vous revenez au niveau 1";
                quizStore.answerCard(quizStore.cards.indexOf(currentCard.value), false);
                showNextQuestion.value = false;
                
            }

            userAnswer.value = "";
        };

        return {
            currentCard,
            userAnswer,
            submitAnswer,
            Message,
            nextQuestion,
            showNextQuestion,
        };
    },
};
</script>




<style scoped>

.carte {
    background-color: rgb(199, 136, 18);
    padding: 10px;
    max-width: 800px;
}

input { 
    width: 80%;
      max-width: 800px;
  display: block;
    margin-left: auto;
   margin-right: auto;
}

h2 {
   margin-left: 5%;
}

.btn  {
      max-width: 800px;
  display: block;
    margin-left: auto;
   margin-right: auto;
}

</style>