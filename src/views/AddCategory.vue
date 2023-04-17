<template>
    <div v-if="categories">
        <h1>Ajouter une catégorie</h1>
        <category-form @submit="getCategories" />
        <div class="cards">
            <div v-for="(category, index) in categories" :key="index" :category="category" >
                {{ category.category }}
            </div>
        </div>
    </div>
    <div v-else>
        Erreur
    </div>
</template>

<script>
import CategoryForm from '../components/CategoryForm.vue';
import { useQuizStore } from '../stores/quizStore';

export default {
    components: {
        CategoryForm,
    },
    setup() {
        const quizStore = useQuizStore();
        function getCategories() {
            quizStore.getCategories();
        }
        return { categories: quizStore.categories, getCategories};
    },
};
</script>
