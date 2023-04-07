<script setup>
    // fetch('http://localhost:3000/prompts/')
    // .then(response => response.json())
    // .then(data => prompts.value = data)
    // .catch(err => console.log("error fetch"));

    const props = defineProps(['id'])

</script>

<template>

    <p>gros chibrax de {{ id }}</p>

</template>