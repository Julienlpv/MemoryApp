<template>
    <div>
        <h1>Modifier la question</h1>
        <form @submit.prevent="submitForm">
            <label for="question">Question :</label>
            <input type="text" id="question" v-model="questionData.question" required />

            <label for="answer">Réponse :</label>
            <input type="text" id="answer" v-model="questionData.answer" required />

            <select v-model="questionData.category">
                <option disabled value="">Choisissez</option>
                <option v-for="(category, index) in categories" :key="index" :category="category">
                    {{ category.category }}
                </option>
            </select>
            <span>Sélectionné : {{ questionData.category }}</span>

            <button type="submit">Enregistrer</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useQuizStore } from '../stores/quizStore';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const quizStore = useQuizStore();
        const questionIndex = parseInt(route.params.index);
        const questionData = ref(quizStore.cards[questionIndex]);

        const categories = quizStore.categories.map(category => ({ category }));

        const submitForm = () => {
            quizStore.editCard(questionIndex, {
                ...questionData.value,
                lastAnswered: null,
                correctStreak: 0,
            });
            questionData.value = { question: '', answer: '', category: '' };
            router.push({ name: 'add-question' });
        };

        return {
            questionData,
            categories,
            submitForm,
        };
    },
};
</script>
