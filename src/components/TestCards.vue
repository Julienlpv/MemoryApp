<template>
    <div>
        <h1>Categories</h1>
        <ul>
            <li v-for="category in categories" :key="category.id">{{ category.name }}</li>
        </ul>
        <h1>Cards</h1>
        <ul>
            <li v-for="card in cards" :key="card.id">{{ card.title }}</li>
        </ul>
    </div>

    <div>
        <!-- Ajouter cette partie pour créer un formulaire d'ajout de catégorie -->
        <h2>Add Category</h2>
        <form @submit.prevent="addCategory">
          <label for="categoryName">Category Name:</label>
          <input id="categoryName" type="text" v-model="newCategoryName" />
          <button type="submit">Add Category</button>
        </form>

        <h2>Add Cards</h2>
            <form @submit.prevent="addCard">
              <label for="cardname">Category Name:</label>
              <input id="cardname" type="text" v-model="newCardname" />
              <button type="submit">Add Category</button>
            </form>
        <!-- ... -->
      </div>


</template>

<script>
import { getCategories, createCategory, getCards, createCard } from '../db';

export default {
    data() {
        return {
            categories: [],
            cards: [],
            newCategoryName: '',
            newCardname:'',
        };
    },
    async created() {
        this.categories = await getCategories();
        this.cards = await getCards();
    },
    methods: {
        async addCategory() {
            const newCategory = { name: this.newCategoryName };
            await createCategory(newCategory);
            this.categories = await getCategories();
        },
        async addCard() {
            const newCard = { title: this.newCardname, categoryId: this.categoryId };
            console.log(this.categoryId)
            await createCard(newCard);
            this.cards = await getCards();
        },
    },
};
</script>

<style scoped>
/* Votre style Vue.js */
</style>
