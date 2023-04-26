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
let openSettings = ref(false)

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

                  <!-- Champt de txt -->

<div class="w-full flex justify-center px-8 pt-32" v-if="prompt">

    <p class="p-4 min-h-[80px] rounded-xl border-2 border-white/40 max-w-3xl font-semibold">{{ prompt.original_prompt }} {{ selectedParams[1] }} {{ selectedParams[2] }} {{ selectedParams[3] }} {{ selectedParams[4] }} {{ selectedParams[5] }} {{ selectedParams[6] }} {{ selectedParams[7] }} {{ selectedParams[8] }}</p>
  
    <div class="flex items-center">
    <button class="group rounded-l-none border-l-0 px-3 py-4 !important">

      <svg class="w-6 fill-white group-hover:fill-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.32" d="M17.9999 7.25V10C17.9999 12.8003 17.9999 14.2004 17.4549 15.27C16.9755 16.2108 16.2106 16.9757 15.2698 17.455C14.2003 18 12.8001 18 9.99988 18H7.25C7.25 18.6967 7.25 19.0451 7.29329 19.3369C7.55182 21.0797 8.92025 22.4482 10.6631 22.7067C10.9549 22.75 11.3033 22.75 12 22.75H16.35C18.5902 22.75 19.7103 22.75 20.566 22.314C21.3186 21.9305 21.9305 21.3186 22.314 20.566C22.75 19.7103 22.75 18.5902 22.75 16.35V12.0001C22.75 11.3033 22.75 10.9549 22.7067 10.663C22.4481 8.92023 21.0798 7.55186 19.337 7.29331C19.0451 7.25 18.6967 7.25 17.9999 7.25Z"/>
        <path d="M7.65 1.25C5.40979 1.25 4.28968 1.25 3.43404 1.68597C2.68139 2.06947 2.06947 2.68139 1.68597 3.43404C1.25 4.28968 1.25 5.40979 1.25 7.65V10.35C1.25 12.5902 1.25 13.7103 1.68597 14.566C2.06947 15.3186 2.68139 15.9305 3.43404 16.314C4.28968 16.75 5.40979 16.75 7.65 16.75H10.35C12.5902 16.75 13.7103 16.75 14.566 16.314C15.3186 15.9305 15.9305 15.3186 16.314 14.566C16.75 13.7103 16.75 12.5902 16.75 10.35V7.65C16.75 5.40979 16.75 4.28968 16.314 3.43404C15.9305 2.68139 15.3186 2.06947 14.566 1.68597C13.7103 1.25 12.5902 1.25 10.35 1.25H7.65Z"/>
      </svg>

    </button>
  </div>
</div>

                  <!-- box open settings -->

<div class="w-full flex justify-center my-6 relative z-50">
  <button v-on:click="openSettings = !openSettings" class="group">
    <svg class="w-7 mx-7 fill-white group-hover:fill-black group-hover:rotate-90 transition-all duration-200 " viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.32" fill-rule="evenodd" clip-rule="evenodd" d="M2.25 9C2.25 8.58579 2.58579 8.25 3 8.25H12C12.4142 8.25 12.75 8.58579 12.75 9C12.75 9.41421 12.4142 9.75 12 9.75H3C2.58579 9.75 2.25 9.41421 2.25 9ZM27.75 9C27.75 8.58579 28.0858 8.25 28.5 8.25H33C33.4142 8.25 33.75 8.58579 33.75 9C33.75 9.41421 33.4142 9.75 33 9.75H28.5C28.0858 9.75 27.75 9.41421 27.75 9ZM2.25 27C2.25 26.5858 2.58579 26.25 3 26.25H7.5C7.91421 26.25 8.25 26.5858 8.25 27C8.25 27.4142 7.91421 27.75 7.5 27.75H3C2.58579 27.75 2.25 27.4142 2.25 27ZM23.25 27C23.25 26.5858 23.5858 26.25 24 26.25L33 26.25C33.4142 26.25 33.75 26.5858 33.75 27C33.75 27.4142 33.4142 27.75 33 27.75L24 27.75C23.5858 27.75 23.25 27.4142 23.25 27Z"/>
      <path d="M20.55 2.25C18.8698 2.25 18.0298 2.25 17.388 2.57698C16.8235 2.8646 16.3646 3.32354 16.077 3.88803C15.75 4.52976 15.75 5.36984 15.75 7.05V10.95C15.75 12.6302 15.75 13.4702 16.077 14.112C16.3646 14.6765 16.8235 15.1354 17.388 15.423C18.0298 15.75 18.8698 15.75 20.55 15.75H24.45C26.1302 15.75 26.9702 15.75 27.612 15.423C28.1765 15.1354 28.6354 14.6765 28.923 14.112C29.25 13.4702 29.25 12.6302 29.25 10.95V7.05C29.25 5.36984 29.25 4.52976 28.923 3.88803C28.6354 3.32354 28.1765 2.8646 27.612 2.57698C26.9702 2.25 26.1302 2.25 24.45 2.25H20.55Z"/>
      <path d="M11.55 20.25C9.86984 20.25 9.02976 20.25 8.38803 20.577C7.82354 20.8646 7.3646 21.3235 7.07698 21.888C6.75 22.5298 6.75 23.3698 6.75 25.05V28.95C6.75 30.6302 6.75 31.4702 7.07698 32.112C7.3646 32.6765 7.82354 33.1354 8.38803 33.423C9.02976 33.75 9.86984 33.75 11.55 33.75H15.45C17.1302 33.75 17.9702 33.75 18.612 33.423C19.1765 33.1354 19.6354 32.6765 19.923 32.112C20.25 31.4702 20.25 30.6302 20.25 28.95V25.05C20.25 23.3698 20.25 22.5298 19.923 21.888C19.6354 21.3235 19.1765 20.8646 18.612 20.577C17.9702 20.25 17.1302 20.25 15.45 20.25H11.55Z"/>
    </svg>
</button>
<div class="absolute translate-x-24 translate-y-[10px]" @click="openDialog">

  <svg class="group w-7 fill-white transition-all cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.10" fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7Z"/>
    <path d="M12 11L12 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle fill="none" cx="12" cy="12" r="10.25" stroke="white" stroke-width="1.5"/>
  </svg>

</div>
</div>

                  <!-- box settings -->

<Transition name="slide-fade">
  <div v-if="openSettings" class="flex justify-center relative z-20">
    <div class="absolute lg:max-w-4xl max-w-auto bg-white/1 backdrop-blur-xl rounded-xl text-white border-2 border-white/40 p-4">
      <form class="h-8 my-3 rounded w-96 flex" v-for="paramPrompt in Addparams" :key="paramPrompt.id">
        
        <label class="label__title mr-4 w-28  font-semibold">{{ paramPrompt.titleShort }}</label>
  
        <div class="flex justify-between w-full bg-zinc-800 rounded-full">
  
          <label class="hover:bg-zinc-500/30 text-center cursor-pointer"> None
            <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="null" v-model="selectedParams[paramPrompt.id]"/>
          </label>
  
    
          <label class="hover:bg-zinc-500/30 text-center cursor-pointer" v-for="param in paramPrompt.params" :key="param.id"> {{ param.param }}
            <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="param.param" v-model="selectedParams[paramPrompt.id]"/>
          </label>
  
        </div>
        
      </form>
  
      
      <form class="h-8 my-3 rounded w-96 flex" v-for="paramPromptSwitch in Switchparams" :key="paramPromptSwitch.id">
  
        <label class="label__title mr-4 w-28  font-semibold shadow-none">{{ paramPromptSwitch.titleShort }}</label>
  
        <div class="flex justify-between w-full bg-zinc-800 rounded-full">
  
          <label class="hover:bg-zinc-500/30 text-center w-full" :key="paramPromptSwitch.id"> Ajouter/supprimer
            <input class="sr-only" type="checkbox" :name="paramPromptSwitch.titleShort" :true-value="paramPromptSwitch.titleShort" false-value="" v-model="selectedParams[paramPromptSwitch.id]"/>
          </label>
  
        </div>
  
  
      </form>
      <div class="w-96 flex justify-center mt-6">
        <button v-on:click="openSettings = !openSettings">Fermer</button>
      </div>
    </div>
    </div>
  
</Transition>

                  <!-- box image -->

<div class="w-full flex justify-center px-8 pt-6">
  <div class="flex items-center px-8">
    <div class="rounded-xl flex overflow-hidden border-2 border-white/40">
      <img class=" max-h-[600px] lg:max-w-4xl max-w-auto" :src="`${ prompt.imageUrl }`">
    </div>
  </div>
</div>



                    <!-- dialog aide -->

  <dialog ref="dialog" class="bg-white/1 backdrop-blur-sm rounded-xl text-white border-2 border-white/40 p-4">
    <div>
      <ul class=" list-disc px-8 pt-3">
        <li>Ratio de l’image :<span class=" font-bold "> --ar</span></li>
        <li>Version de Midjourney :<span class=" font-bold ">--v - 1, 2, 3, 4, ou 5 </span></li>
        <li>Qualité de rendu :<span class=" font-bold "> --q - .25, .5, 1, or 2</span></li>
        <li>Utiliser lumière alternative :<span class=" font-bold "> --uplight</span></li>
        <li>Style anime :<span class=" font-bold "> --niji</span></li>
        <li>Rendu hd :<span class=" font-bold "> --hd</span></li>
        <li>Images similaires :<span class=" font-bold "> --sameseed</span></li>
        <li>Vidéo de la progression :<span class=" font-bold "> --video</span></li>
      </ul>
    </div>
    <button class="mt-6" @click="closeDialog">Close</button>
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

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  scale: 0;
}

</style>