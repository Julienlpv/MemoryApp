<template>
    <div >
        Toto: {{ selectedCategory }}
        <h1>Créer un thème (set de questions)</h1>
        <select v-model="cardData.category" @change="changeValue($event)" >
            <option disabled value="">Choisissez</option>
            <option v-for="(category, index) in categories" :key="index" :category="category" :value="category.category">
                {{ category.category }}
            </option>
        </select>
        <div v-for="(card, index) in cards" :key="index" :card="card" class="cards">
            <div v-if="card.category == this.selectedCategory"
             style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <div>{{ card.question }}</div>
                <input type="checkbox" :id="card.id" :value="card.category">
            </div>
        </div>
        
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
    data() {
        return {
            //selectedCategory: "toto"
        }
    },
    setup(props) {
        const quizStore = useQuizStore();
        const cardData = ref(props.initialValues || { question: '', answer: '', category: '' });
        var selectedCategory

        const submitForm = () => {
            if (props.cardIndex !== undefined) {
                quizStore.updateCard(props.cardIndex, cardData.value);
            } else {
                quizStore.addCard(cardData.value);
            }
            cardData.value = { question: '', answer: '', category: '' };
        };

        const changeValue = (e) => {
            selectedCategory = e.target.value;
            console.log("selectedCategory = " + selectedCategory);
        }


        
        return { cardData, submitForm, changeValue, selectedCategory, categories: quizStore.categories, cards: quizStore.cards };
    },
};
</script>
