<template>
    <div>
        <h1>Ajouter une catégorie</h1>
        <category-form @submit="refreshCards" />
        <div class="cards">
            <category-card v-for="(card, index) in cards" :key="index" :card="card" />
        </div>
    </div>
</template>

<script>
import CategoryForm from '../components/CategoryForm.vue';
import CategoryCard from '../components/CategoryCard.vue';
import { useQuizStore } from '../stores/quizStore';

export default {
    components: {
        CategoryForm,
        CategoryCard,
    },
    setup() {
        const quizStore = useQuizStore();
        
        function refreshCards() {
            quizStore.refreshCards();
        }

        return { categories: quizStore.categories, refreshCards };
    },
};
</script>
