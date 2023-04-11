<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['id'])
const Addparams = ref(null);
const prompt = ref(null);
const dialog = ref(null);
const editedPrompt = ref('');
const selectedParams = ref({});

fetch('http://localhost:3000/prompts/' + props.id)
.then(response => response.json())
.then(data => prompt.value = data)
.catch(err => console.log("error fetch details"));

fetch('http://localhost:3000/AddParameters/')
.then(response => response.json())
.then(data => {
  Addparams.value = data;
  // initialiser les paramètres sélectionnés avec la valeur par défaut
  data.forEach(param => {
    selectedParams.value[param.titleShort] = param.params[0];
  });
})

console.log(Addparams);

function openDialog() {
  dialog.value.showModal();
}

function closeDialog() {
  dialog.value.close();
}

const modifiedPrompt = computed(() => {
  let modified = prompt.value.original_prompt;
  Object.values(selectedParams.value).forEach(param => {
    modified = modified.replace(`{${param.title}}`, param.param);
  });
  return modified;
});


// chaque titleshort = slot dont la valeur change en fonction du bouton radio selectionné

</script>

<template>

<div v-if="prompt">
    <p>L'id est {{ id }}</p>
    <div>{{ modifiedPrompt }}</div>
  </div>

  <button @click="openDialog">Modifier</button>

  <dialog ref="dialog">
    <h2>Modifier le prompt</h2>
    <form v-for="paramPrompt in Addparams" :key="paramPrompt.id">
      <label>{{ paramPrompt.titleShort }}</label>
        <label v-for="param in paramPrompt.params" :key="param.id">
        {{ param.param }}
        <input type="radio" :name="paramPrompt.titleShort" :value="param" v-model="selectedParams[paramPrompt.titleShort]"/>
    </label>
    </form>
    <div>
      <button @click="closeDialog">Fermer</button>
    </div>
  </dialog>

</template>