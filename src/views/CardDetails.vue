<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps(['id'])
const prompt = ref(null);

fetch('http://localhost:3000/prompts/' + props.id)
.then(response => response.json())
.then(data => prompt.value = data)
.catch(err => console.log("error fetch details"));

</script>

<template>

    <div v-if="prompt">
        <p>gros chibrax de {{ id }}</p>
        <p>bonjour {{ prompt.original_prompt }}</p>
    </div>

</template>