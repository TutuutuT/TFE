<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['id'])
const Addparams = ref(null);
const prompt = ref(null);
const dialog = ref(null);
const paramPrompt = ref('')
const selectedParams = ref({});

fetch('http://localhost:3000/prompts/' + props.id)
.then(response => response.json())
.then(data => prompt.value = data)
.catch(err => console.log("error fetch details"));

fetch('http://localhost:3000/AddParameters/')
.then(response => response.json())
.then(data => Addparams.value = data)


function openDialog() {
  dialog.value.showModal();
}

function closeDialog() {
  dialog.value.close();
}

</script>

<template>

<div v-if="prompt">
    <p>L'id est {{ id }}</p>
    <div>{{ selectedParams }}</div>
    <div>{{ prompt.original_prompt }} {{ selectedParams[1] }} {{ selectedParams[2] }} {{ selectedParams[3] }}</div>
  </div>

  <button @click="openDialog">Modifier</button>

  <dialog ref="dialog" class=" p-1 space-x-1 bg-white/1 backdrop-blur-sm rounded-xl text-white border border-white/40 p-8">
    <h2>Modifier le prompt</h2>
    <form class="h-8 my-2 rounded w-96 flex" v-for="paramPrompt in Addparams" :key="paramPrompt.id">
      
      <label class="label__title ml-2 mr-4 w-10">{{ paramPrompt.titleShort }}</label>

      <div class=" flex justify-between w-full bg-zinc-800 rounded-full">

        <label class="label__param h-8 w-14 py-[3px] text-center text-sm leading-6 text-white hover:bg-zinc-500/30 rounded-full shadow"> None

          <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="null" v-model="selectedParams[paramPrompt.id]"/>

        </label>

  
        <label class="label__param w-14 py-[3px] text-center label__param h-8 text-sm leading-6 text-white hover:hover:bg-zinc-500/30 rounded-full shadow transition-all" v-for="param in paramPrompt.params" :key="param.id"> {{ param.param }}
  
          <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="param.param" v-model="selectedParams[paramPrompt.id]"/>
  
        </label>

      </div>

    </form>
    <div>
      <button @click="closeDialog">Fermer</button>
    </div>
  </dialog>

</template>

<style lang="scss">

label:has(input[type="radio"]:checked) {
  @apply bg-zinc-500;
}

</style>