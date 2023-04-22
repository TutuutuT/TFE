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

<div class="w-full flex justify-center px-8" v-if="prompt">

    <div class="p-4 min-h-[80px] rounded-xl border-2 border-white/40 max-w-3xl font-semibold">{{ prompt.original_prompt }} {{ selectedParams[1] }} {{ selectedParams[2] }} {{ selectedParams[3] }} {{ selectedParams[4] }} {{ selectedParams[5] }} {{ selectedParams[6] }} {{ selectedParams[7] }} {{ selectedParams[8] }}</div>
  
    <div class="flex items-center">
    <button class="group rounded-l-none border-l-0 px-3 py-4 !important">
      <svg class="w-6 fill-white group-hover:fill-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.32" d="M8.45 1.25C5.92976 1.25 4.66965 1.25 3.70704 1.74047C2.86031 2.1719 2.1719 2.86031 1.74047 3.70704C1.25 4.66965 1.25 5.92976 1.25 8.45V15.55C1.25 18.0702 1.25 19.3304 1.74047 20.293C2.1719 21.1397 2.86031 21.8281 3.70704 22.2595C4.66965 22.75 5.92976 22.75 8.45 22.75H15.55C18.0702 22.75 19.3304 22.75 20.293 22.2595C21.1397 21.8281 21.8281 21.1397 22.2595 20.293C22.75 19.3304 22.75 18.0702 22.75 15.55V9.67168C22.75 8.57102 22.75 8.02069 22.6257 7.5028C22.5154 7.04363 22.3336 6.60468 22.0869 6.20206C21.8086 5.74793 21.4195 5.35879 20.6412 4.58051L19.4195 3.35883C18.6412 2.58055 18.2521 2.19141 17.7979 1.91312C17.3953 1.66639 16.9564 1.48457 16.4972 1.37434C15.9793 1.25 15.429 1.25 14.3283 1.25H8.45Z"/>
        <path d="M8 8C8 8.41421 8.33579 8.75 8.75 8.75H15.25C15.6642 8.75 16 8.41421 16 8V8C16 7.58579 15.6642 7.25 15.25 7.25H8.75C8.33579 7.25 8 7.58579 8 8V8Z"/>
        <path d="M8 16.2C8 15.0799 8 14.5198 8.21799 14.092C8.40973 13.7157 8.71569 13.4097 9.09202 13.218C9.51984 13 10.0799 13 11.2 13H12.8C13.9201 13 14.4802 13 14.908 13.218C15.2843 13.4097 15.5903 13.7157 15.782 14.092C16 14.5198 16 15.0799 16 16.2V18.6C16 19.4401 16 19.8601 15.8365 20.181C15.6927 20.4632 15.4632 20.6927 15.181 20.8365C14.8601 21 14.4401 21 13.6 21H10.4C9.55992 21 9.13988 21 8.81901 20.8365C8.53677 20.6927 8.3073 20.4632 8.16349 20.181C8 19.8601 8 19.4401 8 18.6V16.2Z"/>
      </svg>
    </button>
  </div>
</div>

<div class="w-full flex justify-center mt-6">
  <button @click="openDialog" class="group">
    <svg class="w-7 mx-7 fill-white group-hover:fill-black group-hover:rotate-90 transition-all duration-200 " viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.32" fill-rule="evenodd" clip-rule="evenodd" d="M2.25 9C2.25 8.58579 2.58579 8.25 3 8.25H12C12.4142 8.25 12.75 8.58579 12.75 9C12.75 9.41421 12.4142 9.75 12 9.75H3C2.58579 9.75 2.25 9.41421 2.25 9ZM27.75 9C27.75 8.58579 28.0858 8.25 28.5 8.25H33C33.4142 8.25 33.75 8.58579 33.75 9C33.75 9.41421 33.4142 9.75 33 9.75H28.5C28.0858 9.75 27.75 9.41421 27.75 9ZM2.25 27C2.25 26.5858 2.58579 26.25 3 26.25H7.5C7.91421 26.25 8.25 26.5858 8.25 27C8.25 27.4142 7.91421 27.75 7.5 27.75H3C2.58579 27.75 2.25 27.4142 2.25 27ZM23.25 27C23.25 26.5858 23.5858 26.25 24 26.25L33 26.25C33.4142 26.25 33.75 26.5858 33.75 27C33.75 27.4142 33.4142 27.75 33 27.75L24 27.75C23.5858 27.75 23.25 27.4142 23.25 27Z"/>
      <path d="M20.55 2.25C18.8698 2.25 18.0298 2.25 17.388 2.57698C16.8235 2.8646 16.3646 3.32354 16.077 3.88803C15.75 4.52976 15.75 5.36984 15.75 7.05V10.95C15.75 12.6302 15.75 13.4702 16.077 14.112C16.3646 14.6765 16.8235 15.1354 17.388 15.423C18.0298 15.75 18.8698 15.75 20.55 15.75H24.45C26.1302 15.75 26.9702 15.75 27.612 15.423C28.1765 15.1354 28.6354 14.6765 28.923 14.112C29.25 13.4702 29.25 12.6302 29.25 10.95V7.05C29.25 5.36984 29.25 4.52976 28.923 3.88803C28.6354 3.32354 28.1765 2.8646 27.612 2.57698C26.9702 2.25 26.1302 2.25 24.45 2.25H20.55Z"/>
      <path d="M11.55 20.25C9.86984 20.25 9.02976 20.25 8.38803 20.577C7.82354 20.8646 7.3646 21.3235 7.07698 21.888C6.75 22.5298 6.75 23.3698 6.75 25.05V28.95C6.75 30.6302 6.75 31.4702 7.07698 32.112C7.3646 32.6765 7.82354 33.1354 8.38803 33.423C9.02976 33.75 9.86984 33.75 11.55 33.75H15.45C17.1302 33.75 17.9702 33.75 18.612 33.423C19.1765 33.1354 19.6354 32.6765 19.923 32.112C20.25 31.4702 20.25 30.6302 20.25 28.95V25.05C20.25 23.3698 20.25 22.5298 19.923 21.888C19.6354 21.3235 19.1765 20.8646 18.612 20.577C17.9702 20.25 17.1302 20.25 15.45 20.25H11.55Z"/>
    </svg>
</button>
</div>

  <dialog ref="dialog" class="bg-white/1 backdrop-blur-sm rounded-xl text-white border-2 border-white/40 p-4">
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