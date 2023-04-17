<!-- src/pages/QuizPage.vue -->
<template>
    <div class="carte">
        <div v-if="!questionAsked">
            <h2>{{ cards[currentQuestionIndex].question }}</h2>
            <input v-model="userAnswer" type="text" />
            <button class="btn" @click="checkAnswer">Valider</button>
        </div>
        <div class="btn-container" v-else>
            <h2>Bravo !</h2>
            <button @click="nextQuestion">Question suivante</button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useQuizStore } from '../stores/quizStore';

export default {
    setup() {
        const quizStore = useQuizStore();
        const cards = quizStore.cards;
        const currentQuestionIndex = ref(0);
        const userAnswer = ref('');
        const questionAsked = ref(false);

        const checkAnswer = () => {
            if (userAnswer.value === cards[currentQuestionIndex.value].answer) {
                questionAsked.value = true;
            } else {
                alert("Désolé, ce n'est pas la bonne réponse.");
            }
        };

        const nextQuestion = () => {
            currentQuestionIndex.value += 1;
            questionAsked.value = false;
            userAnswer.value = '';
        };

        onMounted(() => {
            if (cards.length === 0) {
                alert("Il n'y a pas de questions enregistrées.");
            }
        });

        return { cards, currentQuestionIndex, userAnswer, questionAsked, checkAnswer, nextQuestion };
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
}

.btn-container {
   
}

.btn  {
    text-align: center;
}

</style>