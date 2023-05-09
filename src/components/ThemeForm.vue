<!-- src/components/QuizForm.vue -->
<template>
    <form @submit.prevent="submitForm">
        <label for="theme">Theme</label>
        <input type="text" id="theme" v-model="cardData.theme" required />
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
        const cardData = ref(props.initialValues || { category: '', theme: '' });

        const submitForm = () => {
            if (props.cardIndex !== undefined) {
                quizStore.updateTheme(props.cardIndex, cardData.value);
            } else {
                quizStore.addTheme(cardData.value);
            }
            cardData.value = { theme: '' };
        };

        return { cardData, submitForm };
    },
};
</script>
