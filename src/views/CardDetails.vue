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

computed

</script>

<template>

<div v-if="prompt">
    <p>L'id est {{ id }}</p>
    <div>{{ selectedParams }}</div>
    <div>{{ prompt.original_prompt }} {{ selectedParams[1] }} {{ selectedParams[2] }} {{ selectedParams[3] }}</div>
  </div>

  <button @click="openDialog">Modifier</button>

  <dialog ref="dialog">
    <h2>Modifier le prompt</h2>
    <form v-for="paramPrompt in Addparams" :key="paramPrompt.id">

      <label class="label__title">{{ paramPrompt.titleShort }}</label>

        <label class="label__param" v-for="param in paramPrompt.params" :key="param.id"> {{ param.param }}

        <input type="radio" :name="paramPrompt.titleShort" :value="param.param" v-model="selectedParams[paramPrompt.id]"/>

    </label>

    <label class="label__param"> Reset
    <input type="radio" :name="paramPrompt.titleShort" :value="null" v-model="selectedParams[paramPrompt.id]"/>
    </label>
    
  </form>
    <div>
      <button @click="closeDialog">Fermer</button>
    </div>
  </dialog>

</template>

<style lang="scss">

.label{
  &__title{
    margin-right: 30px;
  }

  &__param{
    inline-size: 300px;
  }
  
}

</style>