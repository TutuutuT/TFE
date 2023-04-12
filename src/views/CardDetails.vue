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

  //computed pour avoir --ar + valeur si pas null

  <button @click="openDialog">Modifier</button>

  <dialog ref="dialog" class="bg-white/1 backdrop-blur-sm rounded-xl text-white border border-white/40 p-8">
    <form class="h-8 my-3 rounded w-96 flex ml-0" v-for="paramPrompt in Addparams" :key="paramPrompt.id">
      
      <label class="label__title mr-4 w-12">{{ paramPrompt.titleShort }}</label>

      <div class=" flex justify-between w-full bg-zinc-800 rounded-full">

        <label class="hover:bg-zinc-500/30"> None

          <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="null" v-model="selectedParams[paramPrompt.id]"/>

        </label>

  
        <label class="hover:bg-zinc-500/30" v-for="param in paramPrompt.params" :key="param.id"> {{ param.param }}
  
          <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="param.param" v-model="selectedParams[paramPrompt.id]"/>
  
        </label>

      </div>

    </form>
    <div class="w-96 flex justify-center mt-8">
      <button @click="closeDialog">Fermer</button>
    </div>
  </dialog>

</template>

<style lang="scss">

label:has(input[type="radio"]:checked) {
  @apply bg-zinc-500;
}

label{
  @apply w-14 py-[3px] text-center h-8 text-sm leading-6 text-white rounded-full shadow transition-all
}

</style>