<!-- src/pages/AddQuestion.vue -->
<template>
    <div>
        <h1>Ajouter une question</h1>
        <quiz-form @submit="refreshCards" />
        <div class="cards">
            <quiz-card v-for="(card, index) in cards" :key="index" :card="card" />
        </div>
    </div>
</template>

<script>
import QuizForm from '../components/QuizForm.vue';
import QuizCard from '../components/QuizCard.vue';
import { useQuizStore } from '../stores/quizStore';

export default {
    components: {
        QuizForm,
        QuizCard,
    },
    setup() {
        const quizStore = useQuizStore();

        function refreshCards() {
            quizStore.refreshCards();
        }

        return { cards: quizStore.cards, refreshCards };
    },
};
</script>
