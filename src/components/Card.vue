<script setup>

import { ref } from 'vue'

const data = ref(null)
const prompts = ref(null)

fetch('http://localhost:3000/prompts')
    .then(response => response.json())
    .then(data => prompts.value = data)
    .catch(err => console.log("error fetch"));

</script>

<template>

    <h2 class="text-center my-20 font-secondary text-white/20 font-bold">PromptPilot</h2>
    <section class="card__container__section">


        <div class="card__container card__container--6">
                <router-link v-for="prompt in prompts" :key="prompt.id" class="card"  :style="{ backgroundImage: `url(${ prompt.imageUrl })` }" :to="{ name: 'CardDetails', params: { id: prompt.id }}">
                    <p class="card__prompt">{{ prompt.original_prompt }}</p>
                    <img>
                </router-link>
        </div>
        
        <!-- <div v-if="prompts">
            <div class="card__container--category">
                <div class="card card--category">
                <p class="card__prompt">{{ prompts[0].category }}</p>
                </div>
            </div>
        </div> -->


    </section>

</template>


<style lang="scss">

:root{
    --grid-item-margin: 15px;
}

@media (max-width: 1200px) {
    :root{
    --grid-item-margin: 15px;
}
}

.card__container__section {
    display: flex;
}

.card__container{
    margin: 0 15px;
    display: flex;
    flex-wrap: wrap;
}


.card{
    @apply border-2 rounded-3xl border-white/40 hover:scale-[98%];
    width: calc((100%/5) - (30px));
    margin: var(--grid-item-margin);
    font-size: 16px;
    font-weight: 500;
    background-position: center;
    background-size: 120%;
    transition-duration: 0.2s;
    aspect-ratio: 230/300;
    display: flex;
    align-items: flex-end;
    padding: 10px;
    line-height: 130%;   

    &--category{
        width: 100%;
    }
}

.card__prompt{
    @apply flex items-center bg-neutral-600/[0.1];
    backdrop-filter: blur(17.5px);
    padding: 10px 1vw;
    border-radius: 24px;
    height: 90px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -max-lines: 3;
}

.card__container{
    &:has(> :last-child:nth-child(odd)) > :first-child {
        width: calc((100%/2.5) - (30px));
        aspect-ratio: 230/140;
    }}


</style>