<template>
    <form @submit.prevent="submitForm">
        <label for="question">Question :</label>
        <input type="text" id="question" v-model="cardData.question" required />

        <label for="answer">Réponse :</label>
        <input type="text" id="answer" v-model="cardData.answer" required />

        <select v-model="cardData.category">
            <option disabled value="">Choisissez</option>
            <option v-for="(category, index) in categories" :key="index" :category="category">
                {{ category.category }}
            </option>
        </select>
        <span>Sélectionné : {{ cardData.category }}</span>

        <button type="submit">{{ isEditing ? 'Enregistrer' : 'Ajouter' }}</button>
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
        const isEditing = ref(false);
        const cardData = ref(props.initialValues || { question: '', answer: '', category: '' });

        if (props.cardIndex !== undefined) {
            isEditing.value = true;
            const card = quizStore.cards[props.cardIndex];
            cardData.value = { ...card };
        }

        const submitForm = () => {
            if (isEditing.value) {
                quizStore.editCard(props.cardIndex, cardData.value);
            } else {
                quizStore.addCard(cardData.value);
            }
            cardData.value = { question: '', answer: '', category: '' };
            isEditing.value = false;
        };

        return { cardData, submitForm, categories: quizStore.categories, isEditing };
    },
};
</script>
