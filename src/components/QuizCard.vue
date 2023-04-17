<!-- src/components/QuizCard.vue -->
<template>
    <div class="card">
        <div class="question">{{ card.question }}</div>
        <div class="answer">{{ card.answer }}</div>
    </div>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
};
</script>
