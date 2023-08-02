<script setup>
import { ref, onMounted } from 'vue';

const prompts = ref([]);

import promptsValue from "../assets/data/db.json"

onMounted(async () => {
  try {
    prompts.value = promptsValue.prompts;
  } catch (error) {
    console.log(error);
  }
})

</script>

<template>
    <h2 class="text-center py-20 font-secondary text-white/20 font-bold bg-[#121212]">PromptPilot</h2>
    <section class="card__container__section bg-[#121212]">

        <div v-if="prompts" class="card__container">
                <router-link class="card ring-white hover:ring-2 bg-[#FF5145]" :to="{ name: 'FreePrompt'}">
                    <div class=" backdrop-blur-lg px-4 py-2 flex items-center bg-neutral-600/[0.1] rounded-3xl font-semibold">
                        <p class="card__prompt hover:text-white text-white">Partir de 0</p>
                    </div>
                </router-link>
                <router-link v-for="prompt in prompts" :key="prompt.id" class="card ring-white hover:ring-2 bg-no-repeat" :style="{ backgroundImage: `url(${ prompt.imageUrl })` }" :to="{ name: 'CardDetails', params: { id: prompt.id }}">
                    <div class=" backdrop-blur-lg px-4 py-2 flex items-center bg-neutral-600/[0.1] rounded-3xl font-semibold">
                        <p class="card__prompt hover:text-white text-white">{{ prompt.original_prompt }}</p>
                    </div>
                </router-link>
                <router-link class="card ring-white hover:ring-2 bg-[#121212]" :to="{ name: 'FreePrompt'}">
                    <div class=" backdrop-blur-lg px-4 py-2 flex items-center bg-neutral-600/[0.1] rounded-3xl font-semibold">
                        <p class="card__prompt hover:text-white text-white">deja fini</p>
                    </div>
                </router-link>
        </div>

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
    background-size: cover;
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
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card__container{
    &:has(> :last-child:nth-child(odd)) > :first-child,
    &:has(> :last-child:nth-child(odd)) > :nth-child(7),
    &:has(> :last-child:nth-child(odd)) > :nth-child(10),
    &:has(> :last-child:nth-child(odd)) > :nth-child(16) {
        width: calc((100%/2.5) - (30px));
        aspect-ratio: 230/140;
    }
}


</style>