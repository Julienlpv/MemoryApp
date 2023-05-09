<template>
    <div>
        <h1>Créer un thème (set de questions)</h1>
       

        <!-- <form @submit.prevent="submitForm">
        <label for="theme">Thème :</label>
        <select id="theme" v-model="cardData.theme" @change="changeTheme($event)">
            <option disabled value="">Choisissez un thème</option>
            <option v-for="(theme, index) in themes" :key="index" :value="theme">
                {{ theme.theme }}
            </option>
        </select>
        <input type="text" v-model="newTheme" placeholder="Ajouter un nouveau thème">
        <button type="submit">Enregistrer</button>
    </form> -->


        <h2>Choisissez une catégorie de questions</h2>

        <select v-model="cardData.category" @change="changeCategory($event)">
            <option disabled value="">Choisissez une catégorie</option>
            <option v-for="(category, index) in categories" :key="index" :value="category.id">
                {{ category.category }}
            </option>
        </select>

        <div v-if="filteredCards.length > 0">
            <div v-for="(card, index) in filteredCards" :key="index">
                <quiz-card :card="card" />
            </div>
        </div>
        <div v-else>
            Aucune question trouvée pour ce thème
        </div>
    </div>
</template>

<script>
import QuizCard from '../components/QuizCard.vue';
import { useQuizStore } from '../stores/quizStore';
import { ref, computed } from 'vue';

export default {
    components: {
        QuizCard,
    },
   setup(props) {
        const quizStore = useQuizStore();
        const cardData = ref(props.initialValues || { question: '', answer: '', category: '', theme: '' });
        const selectedTheme = ref(null);
        const selectedCategory = ref(null);
        // const newTheme = ref('');

        

        const filteredCards = computed(() => {
            if (!selectedTheme.value) {
                return [];
            }

            return quizStore.cards.filter((card) => {
                if (selectedCategory.value) {
                    return card.theme === selectedTheme.value && card.category_id === selectedCategory.value;
                }
                return card.theme === selectedTheme.value;
            });
        });

        

        // const changeTheme = (e) => {
        //     selectedTheme.value = e.target.value;
        //     selectedCategory.value = null;
        // }

        const changeCategory = (e) => {
            selectedCategory.value = e.target.value;
        }


        const submitForm = () => {
            if (props.cardIndex !== undefined) {
                quizStore.updateTheme(props.cardIndex, cardData.value);
            } else {
                quizStore.addTheme(cardData.value);
            }
            cardData.value = { question: '', answer: '', category: '' };
        };

        return {
            cardData,
            filteredCards,
            // changeTheme,
            changeCategory,
            // selectedTheme,
            selectedCategory,
            // newTheme,
            categories: quizStore.categories,
            themes: quizStore.themes,
            submitForm
       };
        
    },

};
</script>
