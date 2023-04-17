<!-- src/components/QuizForm.vue -->
<template>
    <form @submit.prevent="submitForm">
        <label for="question">Question :</label>
        <input type="text" id="question" v-model="cardData.question" required />

        <label for="answer">Réponse :</label>
        <input type="text" id="answer" v-model="cardData.answer" required />

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
        const cardData = ref(props.initialValues || { question: '', answer: '' });

        const submitForm = () => {
            if (props.cardIndex !== undefined) {
                quizStore.updateCard(props.cardIndex, cardData.value);
            } else {
                quizStore.addCard(cardData.value);
            }
            cardData.value = { question: '', answer: '' };
        };

        return { cardData, submitForm };
    },
};
</script>
