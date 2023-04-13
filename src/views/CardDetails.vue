<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['id'])
const Addparams = ref(null);
const Switchparams = ref(null)
const prompt = ref(null);
const dialog = ref(null);
const paramPrompt = ref('')
const paramPromptSwitch = ref('')
const selectedParams = ref({});

fetch('http://localhost:3000/prompts/' + props.id)
.then(response => response.json())
.then(data => prompt.value = data)
.catch(err => console.log("error fetch details"));

fetch('http://localhost:3000/AddParameters/')
.then(response => response.json())
.then(data => Addparams.value = data);

fetch('http://localhost:3000/SwitchParameters/')
.then(response => response.json())
.then(data => Switchparams.value = data);


function openDialog() {
  dialog.value.showModal();
}

function closeDialog() {
  dialog.value.close();
}

const handleCheckboxChange = () => {

}

  //computed pour avoir --ar + valeur si pas null

</script>

<template>

<div v-if="prompt">
    <p>L'id est {{ id }}</p>
    <div>{{ selectedParams }}</div>
    <div>{{ prompt.original_prompt }} {{ selectedParams[1] }} {{ selectedParams[2] }} {{ selectedParams[3] }} {{ selectedParams[4] }} {{ selectedParams[5] }} {{ selectedParams[6] }} {{ selectedParams[7] }} {{ selectedParams[8] }}</div>
</div>

  <button @click="openDialog">Modifier</button>

  <dialog ref="dialog" class="bg-white/1 backdrop-blur-sm rounded-xl text-white border border-white/40 p-4">
    <form class="h-8 my-3 rounded w-96 flex" v-for="paramPrompt in Addparams" :key="paramPrompt.id">
      
      <label class="label__title mr-4 w-28  font-semibold">{{ paramPrompt.titleShort }}</label>

      <div class="flex justify-between w-full bg-zinc-800 rounded-full">

        <label class="hover:bg-zinc-500/30 text-center"> None
          <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="null" v-model="selectedParams[paramPrompt.id]"/>
        </label>

  
        <label class="hover:bg-zinc-500/30 text-center" v-for="param in paramPrompt.params" :key="param.id"> {{ param.param }}
          <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="param.param" v-model="selectedParams[paramPrompt.id]"/>
        </label>

      </div>
      
    </form>

    
    <form class="h-8 my-3 rounded w-96 flex" v-for="paramPromptSwitch in Switchparams" :key="paramPromptSwitch.id">

      <label class="label__title mr-4 w-28  font-semibold">{{ paramPromptSwitch.titleShort }}</label>

      <div class="flex justify-between w-full bg-zinc-800 rounded-full">

        <label class="hover:bg-zinc-500/30 text-center w-full" :key="paramPromptSwitch.id"> Ajouter/supprimer
          <input class="sr-only" type="checkbox" :name="paramPromptSwitch.titleShort" :true-value="paramPromptSwitch.titleShort" false-value="" v-model="selectedParams[paramPromptSwitch.id]"/>
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

label:has(input[type="checkbox"]:checked) {
  @apply bg-zinc-500;
}

label{
  @apply w-14 py-[3px] h-8 text-sm leading-6 text-white rounded-full shadow transition-all;
}

</style>