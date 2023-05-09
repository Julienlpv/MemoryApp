<template>
    <div class="card">
        <div class="question">{{ card.question }}</div>
        <div class="answer">{{ card.answer }}</div>
        <p>Catégorie : {{ card.category }}</p>
        <div class="actions">
            <button @click="deleteCard(index)">Supprimer</button>
            <button @click="editCard(index)">Modifier</button>
        </div>
    </div>
</template>

<script>
import { useQuizStore } from '../stores/quizStore';
import { useRouter } from 'vue-router';

export default {
    props: {
        card: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const quizStore = useQuizStore();
        const router = useRouter();

        const deleteCard = (index) => {
            quizStore.deleteCard(index);
        }

        const editCard = () => {
            router.push({ name: 'edit-question', params: { index: props.index } });
        };

        return { deleteCard, editCard }
    },
    methods: {
        // editCard() {
        //     if (this.$router) {
        //         this.$router.push({ name: 'EditQuestion', params: { index: this.index } });
        //     } else {
        //         console.error('Router is not defined.');
        //     }
        // },
        
    },
};
</script>
