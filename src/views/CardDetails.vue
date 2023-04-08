<script setup>
import { ref } from 'vue';

const props = defineProps(['id'])
const Addparams = ref(null);
const prompt = ref(null);
const dialog = ref(null);
const editedPrompt = ref(null);

fetch('http://localhost:3000/prompts/' + props.id)
.then(response => response.json())
.then(data => prompt.value = data)
.catch(err => console.log("error fetch details"));

fetch('http://localhost:3000/AddParameters/')
.then(response => response.json())
.then(data => Addparams.value = data)
.catch(err => console.log("error fetch params"));

console.log(Addparams);

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
    <textarea v-model="editedPrompt">{{ prompt.original_prompt }}</textarea>
  </div>

  <button @click="openDialog">Modifier</button>

  <dialog ref="dialog">
    <h2>Modifier le prompt</h2>
    <form v-for="paramPrompt in Addparams" :key="paramPrompt.id">
      <label>{{ paramPrompt.titleShort }}</label>
      <label  v-for="params in paramPrompt">
            {{ params.id }}
            <input type="radio" name="params.id " value="params.param"/>
      </label>
    </form>
    <div>
      <button @click="closeDialog">Fermer</button>
    </div>
  </dialog>
    
    <!-- <dialog ref="dialog">
        <h2>Modifier le prompt</h2>
        <div>
            <label>Aspect Ratio</label>
            <input type="radio" v-model="params.category" value="0"/>
            <input type="radio" v-model="prompt.category" value="1"/>
            <input type="radio" v-model="prompt.category" value="2"/>
            <input type="radio" v-model="prompt.category" value="3"/>
            <input type="radio" v-model="prompt.category" value="4"/>
        </div>
        <div>
            <label>Style</label>
            <input type="radio" v-model="prompt.style" value="0"/>
            <input type="radio" v-model="prompt.style" value="1"/>
            <input type="radio" v-model="prompt.style" value="2"/>
            <input type="radio" v-model="prompt.style" value="3"/>
            <input type="radio" v-model="prompt.style" value="4"/>
        </div>
        <div>
            <label>Character</label>
            <input type="radio" v-model="prompt.character" value="0"/>
            <input type="radio" v-model="prompt.character" value="1"/>
            <input type="radio" v-model="prompt.character" value="2"/>
            <input type="radio" v-model="prompt.character" value="3"/>
            <input type="radio" v-model="prompt.character" value="4"/>
        </div>
        <div>
            <label>Character</label>
            <input type="radio" v-model="prompt.character" value="0"/>
            <input type="radio" v-model="prompt.character" value="1"/>
            <input type="radio" v-model="prompt.character" value="2"/>
            <input type="radio" v-model="prompt.character" value="3"/>
            <input type="radio" v-model="prompt.character" value="4"/>
        </div>
        <div>
            <label>Location</label>
            <input type="radio" v-model="prompt.location" />
        </div>
        <div>
            <label>Action</label>
            <input type="radio" v-model="prompt.action" />
        </div>
        <div>
            <label>Color</label>
            <input type="radio" v-model="prompt.color" />
        </div>
        <div>
            <label>Artist</label>
            <input type="radio" v-model="prompt.artist" />
        </div>
        <div>
            <label>Background</label>
            <input type="radio" v-model="prompt.background" />
        </div>
        <div>
            <label>Resolution</label>
            <input type="radio" v-model="prompt.resolution" />
        </div>
        <div>
            <label>Renderer</label>
            <input type="radio" v-model="prompt.renderer" />
        </div>
        <div>
            <label>Lighting</label>
            <input type="radio" v-model="prompt.lighting" />
        </div>
        <div>
            <button @click="dialog.value.close()">Fermer</button>
        </div>
    </dialog> -->

</template>