<template>
    <div v-if="categories">
        <h1>Créer un thème (set de questions)</h1>
        <!-- <select v-model="cardData.category" @change="handleChange()"> -->
        <select v-model="cardData.category">
            <option disabled value="">Choisissez</option>
            <option v-for="(category, index) in categories" :key="index" :category="category" >
                {{ category.category }}
            </option>
        </select>

        <div v-for="(card, index) in cards" :key="index" :card="card" class="cards">
            <input type="checkbox" id="{{card.id}}" value="{{card.category}}"> <label for="">{{card.question}}</label>
            <quiz-card v-if="card.category == 'toto'"    :card="card"/>
        </div>
    </div>
    <div v-else>
        Erreur
    </div>
</template>

<script>
import QuizCard from '../components/QuizCard.vue';
import { useQuizStore } from '../stores/quizStore';
import { ref } from 'vue';


export default {
    components: {
        QuizCard
    },
    setup(props) {
        const quizStore = useQuizStore();
        const cardData = ref(props.initialValues || { question: '', answer: '', category: '' });


        const submitForm = () => {
            if (props.cardIndex !== undefined) {
                quizStore.updateCard(props.cardIndex, cardData.value);
            } else {
                quizStore.addCard(cardData.value);
            }
            cardData.value = { question: '', answer: '', category: '' };
        };
        // const handleChange = (e) => {
        // if(e.target.options.selectedIndex > -1) {
        //     console.log(e.target.options[e.target.options.selectedIndex].dataset.foo)
        // }
        // }
        return { cardData, submitForm, categories: quizStore.categories, cards: quizStore.cards };
    },
};
</script>
