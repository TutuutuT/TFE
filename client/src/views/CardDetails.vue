<script setup>
import { ref, computed, onMounted } from 'vue'
import Footer from '../components/Footer.vue';
// https://we.tl/t-3Go16yuHEy
import promptsValue from "../assets/data/db.json"

const props = defineProps(['id'],['ClickedPrompt'],['ClickedPromptTemporary'])
const ClickedPromptCat = ref(null)
const ClickedList = ref({})
let ClickedPrompt = ref(null)
const Addparams = ref(null)
const Switchparams = ref(null)
const prompt = ref(null)
const dialog = ref(null)
const paramPrompt = ref('')
const paramPromptSwitch = ref('')
const selectedParams = ref({})
let openSettings = ref(false)
let openCamera = ref(false)
let openSend = ref(false)
const ListChangeable = ref(null)
const CameraParams = ref(null)

onMounted(async () => {
  try {
    prompt.value = promptsValue.prompts[props.id - 1];
    Addparams.value = promptsValue.AddParameters;
    Switchparams.value = promptsValue.SwitchParameters;
    ListChangeable.value = promptsValue.ListChangeable;
    CameraParams.value = promptsValue.CameraParameters
  } catch (error) {
    console.log(error);
  }
})

function openDialog() {
  dialog.value.showModal();
}

function closeDialog() {
  dialog.value.close();
}

let PromptCopie = ref(null)
let ClickOk = ref(false)


const copyText = () => {
    const range = document.createRange()
    range.selectNode(PromptCopie.value)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand("copy")
    window.getSelection().removeAllRanges()
    ClickOk.value = true
    setTimeout(() => {
      ClickOk.value = false
    }, 2000)
  }


const styleDialog = ref(false)



</script>

<template>

<h2 class="absolute w-full text-center mt-9 font-secondary text-white/20 font-bold">PromptPilot</h2>

                  <!-- Champt de txt -->

<div class="w-full flex justify-center px-8 pt-32" v-if="prompt">

    <p ref="PromptCopie" class="p-4 min-h-[80px] rounded-xl border-2 border-white/40 max-w-3xl font-semibold">
      
    <span v-for="ListCategory in prompt.detailed_prompt">
      <span class="PromptHover group" v-for="(value, key) in ListCategory">
        <span @click="styleDialog = !styleDialog; ClickedPromptTemporary = value.id; ClickedPromptCat = value.cat">
          <span v-if=" ClickedList[value.id] != null">
            {{ ClickedList[value.id] }}
          </span>
          <span v-else>
            {{ value.item }}
          </span>
        </span>
      </span>
    </span>
      
      {{ selectedParams[1] }} {{ selectedParams[2] }} {{ selectedParams[3] }} {{ selectedParams[4] }} {{ selectedParams[5] }} {{ selectedParams[6] }} {{ selectedParams[7] }} {{ selectedParams[8] }}
    
  </p>

      
    <div class="flex items-center">
    <button class="group rounded-l-none border-l-0 px-3 py-4 !important" @click="copyText">
      <svg class="w-6 fill-white group-hover:fill-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.32" d="M17.9999 7.25V10C17.9999 12.8003 17.9999 14.2004 17.4549 15.27C16.9755 16.2108 16.2106 16.9757 15.2698 17.455C14.2003 18 12.8001 18 9.99988 18H7.25C7.25 18.6967 7.25 19.0451 7.29329 19.3369C7.55182 21.0797 8.92025 22.4482 10.6631 22.7067C10.9549 22.75 11.3033 22.75 12 22.75H16.35C18.5902 22.75 19.7103 22.75 20.566 22.314C21.3186 21.9305 21.9305 21.3186 22.314 20.566C22.75 19.7103 22.75 18.5902 22.75 16.35V12.0001C22.75 11.3033 22.75 10.9549 22.7067 10.663C22.4481 8.92023 21.0798 7.55186 19.337 7.29331C19.0451 7.25 18.6967 7.25 17.9999 7.25Z"/>
        <path d="M7.65 1.25C5.40979 1.25 4.28968 1.25 3.43404 1.68597C2.68139 2.06947 2.06947 2.68139 1.68597 3.43404C1.25 4.28968 1.25 5.40979 1.25 7.65V10.35C1.25 12.5902 1.25 13.7103 1.68597 14.566C2.06947 15.3186 2.68139 15.9305 3.43404 16.314C4.28968 16.75 5.40979 16.75 7.65 16.75H10.35C12.5902 16.75 13.7103 16.75 14.566 16.314C15.3186 15.9305 15.9305 15.3186 16.314 14.566C16.75 13.7103 16.75 12.5902 16.75 10.35V7.65C16.75 5.40979 16.75 4.28968 16.314 3.43404C15.9305 2.68139 15.3186 2.06947 14.566 1.68597C13.7103 1.25 12.5902 1.25 10.35 1.25H7.65Z"/>
      </svg>
    </button>
    <div v-if="ClickOk" class="flex absolute translate-x-16">
      <div class="bg-neutral-800  rounded-md before:block before:absolute before:w-3 before:h-3 p-1 before:rounded-sm before:-translate-x-[10px] before:translate-y-[5px] before:bg-neutral-800 before:-z-10 before:rotate-45">Copié!</div>
    </div>
  </div>
  
</div>



<div class="absolute flex justify-center w-full">
<div class="px-6 py-4 bg-white/1 backdrop-blur-xl z-50 border-2 border-white/40 rounded-3xl" v-if="styleDialog">
  <ul>
    <li class="cursor-pointer hover:bg-neutral-500/30 transition-all" @click="ClickedList[ClickedPromptTemporary] = null; styleDialog = !styleDialog">Valeur pas défaut</li>
    <li class="cursor-pointer hover:bg-neutral-500/30 transition-all" v-for="ChangeElement in ListChangeable[ClickedPromptCat].elements" @click="ClickedList[ClickedPromptTemporary] = ChangeElement ; ClickedPrompt = ClickedPromptTemporary; styleDialog = !styleDialog">{{ ChangeElement }}</li>
  </ul>
   <button class="mt-4" @click="styleDialog = !styleDialog">Fermer</button>
</div>
</div>

                  <!-- box open settings -->

<div class="w-full flex justify-center my-6 relative gap-8">
  <button v-on:click="openCamera = !openCamera" class="group">
      <svg class="w-7 mx-7 fill-white group-hover:fill-black transition-all duration-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.32" fill-rule="evenodd" clip-rule="evenodd" d="M5.02315 4.63052C5.99968 4.43521 6.85862 3.85998 7.41103 3.03137L7.44282 2.98368C8.1649 1.90057 9.3805 1.25 10.6822 1.25L13.3178 1.25C14.6195 1.25 15.8351 1.90057 16.5572 2.98368L16.589 3.03137C17.1414 3.85998 18.0003 4.43521 18.9768 4.63052V4.63052C21.1708 5.0693 22.75 6.99565 22.75 9.23302V14.75C22.75 17.5503 22.75 18.9504 22.205 20.02C21.7257 20.9608 20.9608 21.7257 20.02 22.205C18.9504 22.75 17.5503 22.75 14.75 22.75H9.25C6.44974 22.75 5.04961 22.75 3.98005 22.205C3.03924 21.7257 2.27433 20.9608 1.79497 20.02C1.25 18.9504 1.25 17.5503 1.25 14.75L1.25 9.23302C1.25 6.99565 2.82922 5.0693 5.02315 4.63052V4.63052Z"/>
        <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"/>
      </svg>
  </button>

  <button v-on:click="openSettings = !openSettings" class="group">
    <svg class="w-7 mx-7 fill-white group-hover:fill-black group-hover:rotate-90 transition-all duration-200 " viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.32" fill-rule="evenodd" clip-rule="evenodd" d="M2.25 9C2.25 8.58579 2.58579 8.25 3 8.25H12C12.4142 8.25 12.75 8.58579 12.75 9C12.75 9.41421 12.4142 9.75 12 9.75H3C2.58579 9.75 2.25 9.41421 2.25 9ZM27.75 9C27.75 8.58579 28.0858 8.25 28.5 8.25H33C33.4142 8.25 33.75 8.58579 33.75 9C33.75 9.41421 33.4142 9.75 33 9.75H28.5C28.0858 9.75 27.75 9.41421 27.75 9ZM2.25 27C2.25 26.5858 2.58579 26.25 3 26.25H7.5C7.91421 26.25 8.25 26.5858 8.25 27C8.25 27.4142 7.91421 27.75 7.5 27.75H3C2.58579 27.75 2.25 27.4142 2.25 27ZM23.25 27C23.25 26.5858 23.5858 26.25 24 26.25L33 26.25C33.4142 26.25 33.75 26.5858 33.75 27C33.75 27.4142 33.4142 27.75 33 27.75L24 27.75C23.5858 27.75 23.25 27.4142 23.25 27Z"/>
      <path d="M20.55 2.25C18.8698 2.25 18.0298 2.25 17.388 2.57698C16.8235 2.8646 16.3646 3.32354 16.077 3.88803C15.75 4.52976 15.75 5.36984 15.75 7.05V10.95C15.75 12.6302 15.75 13.4702 16.077 14.112C16.3646 14.6765 16.8235 15.1354 17.388 15.423C18.0298 15.75 18.8698 15.75 20.55 15.75H24.45C26.1302 15.75 26.9702 15.75 27.612 15.423C28.1765 15.1354 28.6354 14.6765 28.923 14.112C29.25 13.4702 29.25 12.6302 29.25 10.95V7.05C29.25 5.36984 29.25 4.52976 28.923 3.88803C28.6354 3.32354 28.1765 2.8646 27.612 2.57698C26.9702 2.25 26.1302 2.25 24.45 2.25H20.55Z"/>
      <path d="M11.55 20.25C9.86984 20.25 9.02976 20.25 8.38803 20.577C7.82354 20.8646 7.3646 21.3235 7.07698 21.888C6.75 22.5298 6.75 23.3698 6.75 25.05V28.95C6.75 30.6302 6.75 31.4702 7.07698 32.112C7.3646 32.6765 7.82354 33.1354 8.38803 33.423C9.02976 33.75 9.86984 33.75 11.55 33.75H15.45C17.1302 33.75 17.9702 33.75 18.612 33.423C19.1765 33.1354 19.6354 32.6765 19.923 32.112C20.25 31.4702 20.25 30.6302 20.25 28.95V25.05C20.25 23.3698 20.25 22.5298 19.923 21.888C19.6354 21.3235 19.1765 20.8646 18.612 20.577C17.9702 20.25 17.1302 20.25 15.45 20.25H11.55Z"/>
    </svg>
  </button>

  <div class="absolute translate-x-40 translate-y-[10px]" @click="openDialog">

    <svg class="group w-7 fill-white transition-all cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.10" fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7Z"/>
      <path d="M12 11L12 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle fill="none" cx="12" cy="12" r="10.25" stroke="white" stroke-width="1.5"/>
    </svg>

  </div>
</div>

                  <!-- inline box send and link -->

<div class="w-full flex justify-center mt-6 relative gap-8">
  <a href="https://www.midjourney.com/app/" target="_blank">
  <button class="group ring-blue-500 hover:ring">
    <svg class="w-6 mx-8 fill-white group-hover:fill-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.7499 5.9848C12.7499 3.18698 12.7499 1.78808 12.2268 1.21521C11.774 0.719349 11.1025 0.483823 10.4392 0.588153C9.67282 0.708686 8.79892 1.80105 7.05114 3.98579L2.59867 9.55136C1.2672 11.2157 0.60146 12.0479 0.600704 12.7482C0.600047 13.3573 0.876976 13.9335 1.353 14.3135C1.90035 14.7504 2.96605 14.7504 5.09745 14.7504H5.64992C6.20997 14.7504 6.49 14.7504 6.70391 14.8594C6.89207 14.9553 7.04505 15.1082 7.14093 15.2964C7.24992 15.5103 7.24992 15.7903 7.24992 16.3504V18.016C7.24992 20.8138 7.24992 22.2127 7.77306 22.7856C8.22587 23.2814 8.89731 23.517 9.56066 23.4126C10.327 23.2921 11.2009 22.1997 12.9487 20.015L17.4012 14.4494C18.7326 12.7851 19.3984 11.9529 19.3991 11.2525C19.3998 10.6435 19.1229 10.0673 18.6468 9.6873C18.0995 9.25039 17.0338 9.25039 14.9024 9.25039H14.3499C13.7899 9.25039 13.5098 9.25039 13.2959 9.1414C13.1078 9.04552 12.9548 8.89254 12.8589 8.70438C12.7499 8.49047 12.7499 8.21044 12.7499 7.65039V5.9848Z"/>
    </svg>
  </button>
</a>


  <button v-on:click="openSend = !openSend" class="group">
    <svg class="w-6 mx-8 fill-white group-hover:fill-black transition-all" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.88154 11.2192C2.45325 9.90064 0.739098 9.24135 0.307963 8.35607C-0.0649225 7.59041 -0.0223838 6.68758 0.420843 5.96037C0.933307 5.11955 2.70185 4.62436 6.23894 3.63398L16.234 0.835356C18.4734 0.208323 19.5931 -0.105194 20.3615 0.185803C21.0314 0.439517 21.5603 0.968408 21.814 1.63831C22.1049 2.40666 21.7914 3.52637 21.1644 5.76577L18.3657 15.7608C17.3753 19.2979 16.88 21.0664 16.0392 21.5789C15.312 22.0221 14.4092 22.0646 13.6435 21.6917C12.7582 21.2606 12.099 19.5464 10.7804 16.1181L10.0877 14.3167C9.95255 13.9655 9.885 13.7898 9.88126 13.6152C9.87796 13.4609 9.91043 13.3079 9.97613 13.1682C10.0504 13.0102 10.1835 12.8772 10.4496 12.611L12.9999 10.0607C13.2928 9.76784 13.2928 9.29296 12.9999 9.00007V9.00007C12.7071 8.70718 12.2322 8.70718 11.9393 9.00007L9.38911 11.5502C9.12298 11.8164 8.98991 11.9494 8.83189 12.0238C8.69221 12.0895 8.53921 12.1219 8.38489 12.1186C8.2103 12.1149 8.03466 12.0473 7.68338 11.9122L5.88154 11.2192Z"/>
    </svg>
  </button>
</div>

                  <!-- box settings -->

<Transition name="slide-fade">
  <div v-if="openSettings" class="flex justify-center relative">
    <div class="absolute lg:max-w-4xl max-w-auto bg-white/1 backdrop-blur-xl rounded-xl text-white border-2 border-white/40 p-4 mt-6">
      <form class="h-8 my-3 rounded w-96 flex" v-for="paramPrompt in Addparams" :key="paramPrompt.id">
        
        <label class="label__title mr-4 w-28  font-semibold">{{ paramPrompt.titleShort }}</label>
  
        <div class="flex justify-between w-full bg-neutral-800 rounded-full">
  
          <label class="hover:bg-neutral-500/30 text-center cursor-pointer"> None
            <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="null" v-model="selectedParams[paramPrompt.id]"/>
          </label>
  
    
          <label class="hover:bg-neutral-500/30 text-center cursor-pointer" v-for="param in paramPrompt.params" :key="param.id"> {{ param.param }}
            <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="param.param" v-model="selectedParams[paramPrompt.id]"/>
          </label>
  
        </div>
        
      </form>
  
      
      <form class="h-8 my-3 rounded w-96 flex" v-for="paramPromptSwitch in Switchparams" :key="paramPromptSwitch.id">
  
        <label class="label__title mr-4 w-28  font-semibold shadow-none">{{ paramPromptSwitch.titleShort }}</label>
  
        <div class="flex justify-between w-full bg-neutral-800 rounded-full">
  
          <label class="hover:bg-neutral-500/30 text-center w-full" :key="paramPromptSwitch.id"> Ajouter/supprimer
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

                  <!-- box camera -->

<Transition name="slide-fade">
  <div v-if="openCamera" class="flex justify-center relative">
    <div class="absolute lg:max-w-4xl max-w-auto bg-white/1 backdrop-blur-xl rounded-xl text-white border-2 border-white/40 p-4 mt-6">
      <form class="h-8 my-3 rounded w-96 flex" v-for="paramPrompt in Addparams" :key="paramPrompt.id">
        
        <label class="label__title mr-4 w-28  font-semibold">{{ paramPrompt.titleShort }}</label>
  
        <div class="flex justify-between w-full bg-neutral-800 rounded-full">
  
          <label class="hover:bg-neutral-500/30 text-center cursor-pointer"> None
            <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="null" v-model="selectedParams[paramPrompt.id]"/>
          </label>
  
    
          <label class="hover:bg-neutral-500/30 text-center cursor-pointer" v-for="param in paramPrompt.params" :key="param.id"> {{ param.param }}
            <input class="sr-only" type="radio" :name="paramPrompt.titleShort" :value="param.param" v-model="selectedParams[paramPrompt.id]"/>
          </label>
  
        </div>
        
      </form>
  
      
      <form class="h-8 my-3 rounded w-96 flex" v-for="paramCamera in CameraParams" :key="paramCamera.id">
  
        <label class="label__title mr-4 w-28  font-semibold shadow-none">{{ paramCamera.title }}</label>
  
        <div class="flex justify-between w-full bg-neutral-800 rounded-full">
  
          <label class="hover:bg-neutral-500/30 text-center w-full" :key="paramCamera.id"> Ajouter/supprimer
            <input class="sr-only" type="checkbox" :name="paramCamera.title" :true-value="paramCamera.title" false-value="" v-model="selectedParams[paramCamera.id]"/>
          </label>
  
        </div>
  
  
      </form>
      <div class="w-96 flex justify-center mt-6">
        <button v-on:click="openCamera = !openCamera">Fermer</button>
      </div>
    </div>
    </div>
  
</Transition>


<Transition name="slide-fade">
  <div v-if="openSend" class="flex justify-center relative">
    <div class="absolute lg:max-w-4xl max-w-auto bg-white/1 backdrop-blur-xl rounded-xl text-white border-2 border-white/40 p-4 mt-6">
      <ul>
        <li class="bg-neutral-500/30 rounded-full hover:bg-neutral-500"><a class="hover:text-white" href="#"><p class="flex justify-center items-center h-8 w-full">Copier le lien</p></a></li>
        <li>Reddit</li>
        <li>Twitter</li>
        <li>Whatsapp</li>
        <li>VK</li>
      </ul>
      <div class="w-96 flex justify-center mt-6">
        <button v-on:click="openSend = !openSend">Fermer</button>
      </div>
    </div>
    </div>
  
</Transition>


                  <!-- box image -->

<div class="w-full flex justify-center px-8 my-6">
  <div class="flex items-center px-8">
    <div class="rounded-xl flex overflow-hidden border-2 border-white/40">
      <img class=" max-h-[600px] lg:max-w-4xl max-w-auto" :src="`${ prompt ? prompt.imageUrl: '' }`">
    </div>
  </div>
</div>



                    <!-- dialog aide -->

  <dialog ref="dialog" class="bg-white/10 backdrop-blur-xl rounded-xl text-white border-2 border-white/40 p-4">
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
    <div class="w-96 flex justify-center mt-6">
      <button @click="closeDialog">Close</button>
    </div>
  </dialog>

  <Footer/>

</template>



<style lang="scss">

label:has(input[type="radio"]:checked) {
  @apply bg-neutral-500;
}

label:has(input[type="checkbox"]:checked) {
  @apply bg-neutral-500;
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

.PromptHover{
  @apply mx-[2.5px] hover:before:absolute before:-inset-[3px] before:bg-white/10 before:rounded-sm relative inline-block before:-z-10 z-10 cursor-pointer;
}

</style>