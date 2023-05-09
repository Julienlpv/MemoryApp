


<!-- src/pages/AddQuestion.vue -->
<template>
    <div>
        <h1>Ajouter une question</h1>
        <!-- <quiz-form :categories="categories" :themes="themes" @submit="addCard" /> -->
        <quiz-form :categories="categories" :themes="themes" />
        <div class="cards">
            <!-- <quiz-card v-for="(card, index) in cards" :key="index" :card="card" 
            :index="index" @delete-card="deleteCard(index)  @edit-card="editCard(index, card) /> -->
            <quiz-card v-for="(card, index) in cards" :key="index" :card="card" 
            :index="index" @delete-card="deleteCard(index)" @edit-card="editCard(index, card)" />
                
        </div>
    </div>
</template>

<script>
import QuizForm from '../components/QuizForm.vue';
import QuizCard from '../components/QuizCard.vue';
import { useQuizStore } from '../stores/quizStore';
import { ref } from 'vue';

export default {
    components: {
        QuizForm,
        QuizCard,
    },
    setup() {
        const quizStore = useQuizStore();

        const categories = ref(quizStore.categories);
        const themes = ref(quizStore.themes);

        function refreshCards() {
            quizStore.refreshCards();
        }

        function addCard(card) {
            quizStore.addCard(card);
        }

        function deleteCard(index) {
            quizStore.deleteCard(index);
        }

        function editCard(index, card) {
            quizStore.editCard(index, card);
        }


        return { cards: quizStore.cards, categories, themes, addCard, deleteCard, refreshCards, editCard };
    },
};
</script>
