<template>
    <div class="card">
        <div class="category">{{ card.category }}</div>
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
