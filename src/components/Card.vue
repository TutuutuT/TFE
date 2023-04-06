<script setup>

import { ref } from 'vue'

const data = ref(null)
const prompts = ref(null)

fetch('http://localhost:3000/prompts')
    .then(response => response.json())
    .then(data => prompts.value = data)
    .catch(err => console.log("error fetch"));;

</script>

                        <!-- à faire -->
                        <!-- au click -> hidden tous les autres -->

<template>

    <section class="card__container__section">

        <!-- <div v-if="prompts">
            <div class="card__container--favorite">
                <div class="card card--favorite">
                <p class="card__prompt">{{ prompts[0].original_prompt }}</p>
                </div>
            </div>
        </div> -->

        <div class="card__container card__container--6">
            <div v-for="prompt in prompts" class="card">
                <!-- <div>{{ prompt.id }}</div> -->
                <!-- <div>{{ prompt.category }}</div> -->
                <p class="card__prompt">{{ prompt.original_prompt }}</p>
            </div>
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
    --grid-items-per-row: 6
}

@media (max-width: 1200px) {
    :root{
    --grid-item-margin: 15px;
    --grid-items-per-row: 5
}
}

.card__container__section {
    display: flex;
}

.card__container{
    margin: 0 30px;
    display: flex;
    flex-wrap: wrap;

    // &--favorite{
        
    // }

    // &--category{
        
    // }
}


.card{
    width: calc(100%/ var(--grid-items-per-row) - var(--grid-item-margin) - 0.01px);
    margin: var(--grid-item-margin);
    font-size: 16px;
    font-weight: 700;
    background-image: url(../assets/image-test.jpg);
    background-position: center;
    background-size: 120%;
    transition-duration: 0.2s;
    aspect-ratio: 230/300;
    border-radius: 20px;
    border: 0.5px solid white;
    display: flex;
    align-items: flex-end;
    padding: 10px;

    &:hover{
        background-size: 125%;
    }
    
    &--favorite{
        width: 100%;
    }

    &--category{
        width: 100%;
    }
}

.card__prompt{
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(17.5px);
    padding: 5px 10px;
    border-radius: 14px;
    margin: 0;
    height: 70px;
    overflow: hidden;
}


</style>