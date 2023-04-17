<!-- src/components/QuizForm.vue -->
<template>
    <form @submit.prevent="submitForm">
        <label for="category">Catégorie :</label>
        <input type="text" id="category" v-model="cardData.category" required />
        <button type="submit">Enregistrer</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useQuizStore } from '../stores/quizStore';

export default {
    props: {
        cardIndex: Number,
        initialValues: Object,
    },
    setup(props) {
        const quizStore = useQuizStore();
        const cardData = ref(props.initialValues || { category: ''});

        const submitForm = () => {
            if (props.cardIndex !== undefined) {
                quizStore.updateCategory(props.cardIndex, cardData.value);
            } else {
                quizStore.addCategory(cardData.value);
            }
            cardData.value = { category: ''};
        };

        return { cardData, submitForm };
    },
};
</script>
