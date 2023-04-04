<script setup>

import { ref } from 'vue'

const data = ref(null)
const prompts = ref(null)

fetch('http://localhost:3000/prompts')
    .then(response => response.json())
    .then(data => prompts.value = data)
    .catch(err => console.log("error fetch"));;

</script>


<template>

    <div v-for="prompt in prompts" :key="prompt.id" class="card">
        <div>{{ prompt.id }}</div>
        <div>{{ prompt.category }}</div>
        <p>{{ prompt.original_prompt }}</p>
    </div>
    

</template>


<style lang="scss">

.card{
    background-color: grey;
}

</style>