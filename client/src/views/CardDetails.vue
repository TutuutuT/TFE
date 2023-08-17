<script setup>
import { ref, computed, onMounted } from 'vue'
import Footer from '../components/Footer.vue'
import CameraDraggable from '../components/CameraDraggable.vue'
import promptsValue from "../assets/data/db.json"
import MidjourneyApi from '../components/MidjourneyApi.vue'


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
const selectedCameraParams = ref({})
let openSettings = ref(false)
let openCamera = ref(false)
let openSend = ref(false)
const ListChangeable = ref(null)
const CameraParams = ref('')
const ListOpen = ref(null)
let SelectList = ref(0)
const styleDialog = ref(false)
let PromptCopie = ref(null)
let ClickOk = ref(false)

const message = ref(null);

const share = (network) => {
  message.value = PromptCopie.value.innerText;
  const shareUrl = getShareUrl(network, message.value);
  window.open(shareUrl, '_blank');
  console.log(message.value);
  // Faites quelque chose avec l'URL de partage, par exemple, ouvrez une nouvelle fenêtre avec l'URL
};

const getShareUrl = (network, message) => {
  let url = '';

  switch (network) {
    case 'Facebook':
      // URL de partage pour Facebook
      url = `//www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html`;
      break;
    case 'Twitter':
      // URL de partage pour Twitter
      url = `https://twitter.com/intent/tweet?text=Essaye mon prompt '${encodeURIComponent(message)}' sur Midjourney !`;
      break;
    case 'Reddit':
      // URL de partage pour Twitter
      url = `http://www.reddit.com/submit?text=Essaye mon prompt '${encodeURIComponent(message)}' sur Midjourney !`;
      break;
    case 'Whatsapp':
      // URL de partage pour Twitter
      url = `https://api.whatsapp.com/send?text=Essaye mon prompt '${encodeURIComponent(message)}' sur Midjourney !`;
      break;
    default:
      // Cas par défaut si le réseau social n'est pas pris en charge
      console.error(`Réseau social non pris en charge : ${network}`);
  }

  return url;
};


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

  const handleButtonClique = (percentRef) => {
  cameraAngle.value = percentRef;
}

const cameraAngle = ref('');

const hoveredItemId = ref(null)

const Free = ref('');
const FreePrompt = ref('');
const Exclu = ref('');
const ExcluPrompt = ref('');

function updateExcluPrompt() {
  if (Exclu.value !== null && Exclu.value !== '') {
    ExcluPrompt.value = `--no ${Exclu.value}`;
  } else {
    ExcluPrompt.value = '';
  }
}

function updateFreePrompt() {
  if (Free.value !== null && Free.value !== '') {
    FreePrompt.value = `${Free.value}::`;
  } else {
    FreePrompt.value = '';
  }
}
</script>


<template>
<div class=" min-h-[100svh] bg-[#121212]">

<h2 class="absolute w-full text-center mt-9 font-secondary text-white/20 font-bold">PromptPilot</h2>

                  <!-- Champt de txt -->

<section class="w-full flex-col flex justify-center px-8 pt-32 bg-[#121212]" v-if="prompt">

  <div class="w-full flex justify-center px-8">
    <input class="min-w-[25vw] -mt-8 p-4 min-h-[40px] rounded-2xl border-2 border-white/40 max-w-3xl font-semibold z-20 bg-white/5 backdrop-blur-sm" v-model="Free" @input="updateFreePrompt" placeholder="Écrit ton idée ici" />
  </div>

  <div class="w-full flex justify-center px-8 pt-8">

    <p ref="PromptCopie" class="p-4 min-h-[80px] rounded-3xl border-2 border-white/40 max-w-3xl font-semibold z-20 bg-[#121212]">

      <span>
            {{ FreePrompt }}
      </span>
      
      <span v-for="ListCategory in prompt.detailed_prompt">
        <span class="PromptHover group transition-all whitespace-pre-wrap duration-200" v-for="(value, key) in ListCategory" :class="[{ 'opacity-50': hoveredItemId !== null && hoveredItemId !== value.id }]" @mouseover="hoveredItemId = value.id" @mouseout="hoveredItemId = null">
          <span class="group-hover:block hidden pointer-events-none absolute transition-all duration-200 group-hover:text-white text-sm px-2 py-2 bg-neutral-800 rounded-md bottom-[2.2rem] before:block before:absolute before:w-3 before:h-3 p-1 before:rounded-sm before:left-5 before:-bottom-1.5 before:bg-neutral-800 before:-z-10 before:rotate-45">{{ ListChangeable[value.cat].title }}</span>
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
        
        {{ selectedParams[2] }} {{ selectedParams[3] }} {{ selectedParams[4] }} {{ selectedParams[5] }} {{ selectedParams[6] }} {{ selectedParams[7] }} {{ selectedParams[8] }}
        {{ cameraAngle.value }} {{ selectedCameraParams[1] }} {{ selectedCameraParams[2] }} {{ selectedCameraParams[3] }} {{ selectedCameraParams[4] }} {{ selectedCameraParams[5] }} {{ selectedCameraParams[6] }}
        
        <span v-if="selectedParams[1] != null">
                  --v {{ selectedParams[1] }}
        </span>
        <span>
                {{ ExcluPrompt }}
        </span>
    </p>
  
      
    <div class="flex items-center">
      <button class="group rounded-l-none border-l-0 pr-3 pl-5 -translate-x-2 py-4 z-0 !important" @click="copyText">
        <svg class="w-6 fill-white group-hover:fill-black duration-200 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.32" d="M17.9999 7.25V10C17.9999 12.8003 17.9999 14.2004 17.4549 15.27C16.9755 16.2108 16.2106 16.9757 15.2698 17.455C14.2003 18 12.8001 18 9.99988 18H7.25C7.25 18.6967 7.25 19.0451 7.29329 19.3369C7.55182 21.0797 8.92025 22.4482 10.6631 22.7067C10.9549 22.75 11.3033 22.75 12 22.75H16.35C18.5902 22.75 19.7103 22.75 20.566 22.314C21.3186 21.9305 21.9305 21.3186 22.314 20.566C22.75 19.7103 22.75 18.5902 22.75 16.35V12.0001C22.75 11.3033 22.75 10.9549 22.7067 10.663C22.4481 8.92023 21.0798 7.55186 19.337 7.29331C19.0451 7.25 18.6967 7.25 17.9999 7.25Z"/>
          <path d="M7.65 1.25C5.40979 1.25 4.28968 1.25 3.43404 1.68597C2.68139 2.06947 2.06947 2.68139 1.68597 3.43404C1.25 4.28968 1.25 5.40979 1.25 7.65V10.35C1.25 12.5902 1.25 13.7103 1.68597 14.566C2.06947 15.3186 2.68139 15.9305 3.43404 16.314C4.28968 16.75 5.40979 16.75 7.65 16.75H10.35C12.5902 16.75 13.7103 16.75 14.566 16.314C15.3186 15.9305 15.9305 15.3186 16.314 14.566C16.75 13.7103 16.75 12.5902 16.75 10.35V7.65C16.75 5.40979 16.75 4.28968 16.314 3.43404C15.9305 2.68139 15.3186 2.06947 14.566 1.68597C13.7103 1.25 12.5902 1.25 10.35 1.25H7.65Z"/>
        </svg>
      </button>
      <div v-if="ClickOk" class="flex absolute translate-x-16">
        <div class="bg-neutral-800  rounded-md before:block before:absolute before:w-3 before:h-3 p-1 before:rounded-sm before:-translate-x-[10px] before:translate-y-[5px] before:bg-neutral-800 before:-z-10 before:rotate-45">Copié!</div>
      </div>
  </div>
  </div>

  <div class="w-full flex justify-center px-8 pt-16">
    <input class="min-w-[20vw] -mt-8 p-2 min-h-[40px] rounded-xl border-2 border-white/40 max-w-3xl z-20 bg-white/5 backdrop-blur-sm text-xs font-normal " v-model="Exclu" @input="updateExcluPrompt" placeholder="Exclus des éléments (arbres, montagnes, voitures...)" />
  </div>

  
</section>



<div class="absolute flex justify-center w-full bg-[#121212]">
<div class=" pb-4 bg-white/1 backdrop-blur-xl z-50 border-2 border-white/40 rounded-3xl" v-if="styleDialog">
  <div class="text-center font-extrabold py-3 mb-3 text-black bg-white rounded-t-3xl rounded-b-sm border-2 border-white/40">{{ ListChangeable[ClickedPromptCat].title }}</div>
  <ul class="px-6 grid grid-cols-2 gap-x-4 gap-y-4 overflow-y-scroll max-h-80">
    <li class="cursor-pointer hover:bg-neutral-500/30 transition-all rounded-md w-full bg-white text-black flex justify-center items-center" @click="ClickedList[ClickedPromptTemporary] = null; styleDialog = !styleDialog"><div>Valeur par défaut</div></li>
    <li class="rounded-md overflow-hidden h-24 w-full"><input placeholder="Valeur personnalisée" class="h-[calc(100%-23px)] text-center w-full" type="text" v-model="customInput"><div class="bg-white hover:opacity-80 transition-all text-black cursor-pointer text-center" @click="ClickedList[ClickedPromptTemporary] = customInput ; ClickedPrompt = ClickedPromptTemporary; styleDialog = !styleDialog">Changer</div></li>
    <li class="cursor-pointer hover:bg-neutral-500/30 transition-all rounded-md w-full h-auto rounded-b-md overflow-hidden" v-for="ChangeElement in ListChangeable[ClickedPromptCat].elements" @click="ClickedList[ClickedPromptTemporary] = ChangeElement.name ; ClickedPrompt = ClickedPromptTemporary; styleDialog = !styleDialog"><div class="bg-white text-black text-center rounded-t-md rounded-b-sm">{{ ChangeElement.name }}</div><img class="w-[180px]" :src="`${ ChangeElement ? ChangeElement.imageUrl: '' }`"></li>
  </ul>
   <button class="mt-4 mx-6" @click="styleDialog = !styleDialog">Fermer</button>
</div>
</div>

                  <!-- box open settings -->

<div class="w-full flex justify-center my-6 relative gap-8 bg-[#121212]">
  <button v-on:click="openCamera = !openCamera" class="group">
    

    <svg class="w-7 mx-7 fill-white group-hover:fill-black transition-all duration-200" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.32" fill-rule="evenodd" clip-rule="evenodd" d="M7.53485 6.94578C8.18684 6.81538 8.51284 6.75018 8.81372 6.63773C9.39697 6.41976 9.92127 6.06863 10.3449 5.61231C10.5634 5.37691 10.7478 5.10029 11.1167 4.54706L11.1644 4.47552C11.6964 3.67747 11.9624 3.27844 12.2925 2.96674C12.81 2.47803 13.4486 2.13628 14.1423 1.97675C14.5848 1.875 15.0643 1.875 16.0235 1.875L19.9768 1.875C20.9359 1.875 21.4155 1.875 21.8579 1.97675C22.5516 2.13628 23.1902 2.47803 23.7077 2.96674C24.0378 3.27845 24.3039 3.67747 24.8359 4.47552L24.8836 4.54705C25.2524 5.10029 25.4368 5.37691 25.6554 5.61231C26.079 6.06863 26.6033 6.41976 27.1865 6.63773C27.4874 6.75018 27.8134 6.81538 28.4654 6.94578V6.94578C30.02 7.25669 30.7972 7.41214 31.4235 7.73632C32.6436 8.36784 33.5501 9.47357 33.9301 10.7938C34.1251 11.4715 34.1251 12.2642 34.1251 13.8495L34.1251 26.125C34.1251 28.9253 34.1251 30.3254 33.5802 31.3949C33.1008 32.3358 32.3359 33.1007 31.3951 33.58C30.3255 34.125 28.9254 34.125 26.1251 34.125L9.87512 34.125C7.07486 34.125 5.67473 34.125 4.60517 33.58C3.66436 33.1007 2.89946 32.3358 2.42009 31.3949C1.87512 30.3254 1.87512 28.9253 1.87512 26.125L1.87512 13.8495C1.87512 12.2642 1.87512 11.4715 2.07018 10.7938C2.45016 9.47357 3.35664 8.36784 4.57673 7.73632C5.20302 7.41214 5.9803 7.25669 7.53485 6.94578V6.94578Z"/>
      <path class=" origin-center group-hover:rotate-90 transition-all" fill-rule="evenodd" clip-rule="evenodd" d="M15.1725 10.5563C14.4146 10.015 14.0356 9.74431 13.6313 9.65714C13.2441 9.57367 12.8408 9.60704 12.4727 9.75302C12.0881 9.90549 11.7588 10.2348 11.1003 10.8933L10.8935 11.1001C10.2348 11.7587 9.90551 12.0881 9.75304 12.4727C9.6071 12.8408 9.57374 13.244 9.65716 13.6311C9.74433 14.0355 10.015 14.4145 10.5565 15.1725V15.1725C10.834 15.5611 10.9728 15.7554 11.0519 15.9271C11.1533 16.147 11.1717 16.2077 11.2101 16.4468C11.2401 16.6334 11.2288 17.0216 11.2061 17.7979C11.2041 17.8649 11.2032 17.9322 11.2032 17.9997C11.2032 18.0673 11.2041 18.1347 11.2061 18.2018C11.2288 18.9782 11.2402 19.3664 11.2102 19.5531C11.1718 19.7922 11.1533 19.8528 11.052 20.0727C10.9729 20.2445 10.8341 20.4388 10.5565 20.8274V20.8274C10.015 21.5855 9.74428 21.9645 9.65712 22.369C9.57371 22.756 9.60707 23.1592 9.75298 23.5272C9.90545 23.9119 10.2348 24.2413 10.8935 24.9L11.0998 25.1063C11.7588 25.7652 12.0882 26.0947 12.473 26.2471C12.841 26.3929 13.2439 26.4263 13.6308 26.343C14.0354 26.2558 14.4146 25.985 15.1729 25.4434V25.4434C15.5616 25.1657 15.7559 25.0269 15.9277 24.9478C16.1475 24.8465 16.2081 24.8281 16.447 24.7897C16.6337 24.7596 17.022 24.771 17.7985 24.7936C17.8654 24.7956 17.9326 24.7966 18 24.7966C18.0675 24.7966 18.1347 24.7956 18.2017 24.7936C18.9782 24.7709 19.3664 24.7596 19.5531 24.7896C19.7921 24.828 19.8527 24.8465 20.0726 24.9478C20.2443 25.0269 20.4386 25.1657 20.8273 25.4433V25.4433C21.5854 25.9848 21.9645 26.2556 22.3691 26.3428C22.7561 26.4261 23.1591 26.3928 23.5271 26.2469C23.9118 26.0944 24.2412 25.765 24.9 25.1062L25.1065 24.8997C25.7652 24.2411 26.0945 23.9117 26.247 23.5271C26.3929 23.159 26.4263 22.7558 26.3429 22.3687C26.2557 21.9643 25.985 21.5853 25.4436 20.8273V20.8273C25.166 20.4387 25.0272 20.2444 24.9481 20.0727C24.8468 19.8527 24.8283 19.7921 24.7899 19.553C24.7599 19.3663 24.7712 18.9781 24.7939 18.2018C24.7959 18.1347 24.7969 18.0673 24.7969 17.9997C24.7969 17.9322 24.7959 17.8649 24.794 17.7979C24.7713 17.0217 24.7599 16.6335 24.7899 16.4469C24.8283 16.2078 24.8468 16.1471 24.9482 15.9272C25.0273 15.7555 25.166 15.5612 25.4436 15.1726V15.1726C25.985 14.4147 26.2557 14.0357 26.3428 13.6313C26.4263 13.2442 26.3929 12.841 26.2469 12.4728C26.0945 12.0882 25.7652 11.7589 25.1065 11.1003L24.8996 10.8934C24.2412 10.2349 23.9119 9.90572 23.5275 9.75325C23.1592 9.60721 22.7559 9.57382 22.3686 9.65734C21.9643 9.74452 21.5854 10.0151 20.8277 10.5564V10.5564C20.4392 10.8339 20.2449 10.9726 20.0732 11.0517C19.8532 11.1531 19.7925 11.1716 19.5533 11.21C19.3666 11.24 18.9786 11.2286 18.2024 11.2059C18.1352 11.2039 18.0677 11.2029 18 11.2029C17.9324 11.2029 17.865 11.2039 17.7978 11.2059C17.0216 11.2286 16.6335 11.2399 16.4468 11.21C16.2077 11.1716 16.147 11.1531 15.927 11.0517C15.7553 10.9726 15.561 10.8339 15.1725 10.5563V10.5563Z"/>
      <path class="fill-black group-hover:fill-white transition-all" fill-rule="evenodd" clip-rule="evenodd" d="M20.4058 17.9175C20.4058 19.2375 19.3357 20.3076 18.0156 20.3076C16.6956 20.3076 15.6255 19.2375 15.6255 17.9175C15.6255 16.5974 16.6956 15.5273 18.0156 15.5273C19.3357 15.5273 20.4058 16.5974 20.4058 17.9175Z"/>
    </svg>

      <span class="pointer-events-none block opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-white absolute text-xs px-2 py-2 bg-neutral-800 rounded-md -left-[9.8rem] top-[0.4rem] before:block before:absolute before:w-3 before:h-3 p-1 before:rounded-sm before:-right-1 before:top-2.5 before:bg-neutral-800 before:-z-10 before:rotate-45">Paramètres de caméra</span>
  </button>

  <button v-on:click="openSettings = !openSettings" class="group">
    <svg class="w-7 mx-7 fill-white group-hover:fill-black group-hover:rotate-90 transition-all duration-200 " viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.32" fill-rule="evenodd" clip-rule="evenodd" d="M2.25 9C2.25 8.58579 2.58579 8.25 3 8.25H12C12.4142 8.25 12.75 8.58579 12.75 9C12.75 9.41421 12.4142 9.75 12 9.75H3C2.58579 9.75 2.25 9.41421 2.25 9ZM27.75 9C27.75 8.58579 28.0858 8.25 28.5 8.25H33C33.4142 8.25 33.75 8.58579 33.75 9C33.75 9.41421 33.4142 9.75 33 9.75H28.5C28.0858 9.75 27.75 9.41421 27.75 9ZM2.25 27C2.25 26.5858 2.58579 26.25 3 26.25H7.5C7.91421 26.25 8.25 26.5858 8.25 27C8.25 27.4142 7.91421 27.75 7.5 27.75H3C2.58579 27.75 2.25 27.4142 2.25 27ZM23.25 27C23.25 26.5858 23.5858 26.25 24 26.25L33 26.25C33.4142 26.25 33.75 26.5858 33.75 27C33.75 27.4142 33.4142 27.75 33 27.75L24 27.75C23.5858 27.75 23.25 27.4142 23.25 27Z"/>
      <path d="M20.55 2.25C18.8698 2.25 18.0298 2.25 17.388 2.57698C16.8235 2.8646 16.3646 3.32354 16.077 3.88803C15.75 4.52976 15.75 5.36984 15.75 7.05V10.95C15.75 12.6302 15.75 13.4702 16.077 14.112C16.3646 14.6765 16.8235 15.1354 17.388 15.423C18.0298 15.75 18.8698 15.75 20.55 15.75H24.45C26.1302 15.75 26.9702 15.75 27.612 15.423C28.1765 15.1354 28.6354 14.6765 28.923 14.112C29.25 13.4702 29.25 12.6302 29.25 10.95V7.05C29.25 5.36984 29.25 4.52976 28.923 3.88803C28.6354 3.32354 28.1765 2.8646 27.612 2.57698C26.9702 2.25 26.1302 2.25 24.45 2.25H20.55Z"/>
      <path d="M11.55 20.25C9.86984 20.25 9.02976 20.25 8.38803 20.577C7.82354 20.8646 7.3646 21.3235 7.07698 21.888C6.75 22.5298 6.75 23.3698 6.75 25.05V28.95C6.75 30.6302 6.75 31.4702 7.07698 32.112C7.3646 32.6765 7.82354 33.1354 8.38803 33.423C9.02976 33.75 9.86984 33.75 11.55 33.75H15.45C17.1302 33.75 17.9702 33.75 18.612 33.423C19.1765 33.1354 19.6354 32.6765 19.923 32.112C20.25 31.4702 20.25 30.6302 20.25 28.95V25.05C20.25 23.3698 20.25 22.5298 19.923 21.888C19.6354 21.3235 19.1765 20.8646 18.612 20.577C17.9702 20.25 17.1302 20.25 15.45 20.25H11.55Z"/>
    </svg>
    <span class="pointer-events-none block opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-white absolute text-xs px-2 py-2 bg-neutral-800 rounded-md -right-[12rem] top-[0.4rem] before:block before:absolute before:w-3 before:h-3 p-1 before:rounded-sm before:-left-1 before:top-2.5 before:bg-neutral-800 before:-z-10 before:rotate-45">Paramètres Midjourney</span>
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

<div class="w-full flex justify-center mt-6 relative gap-8 bg-[#121212]">
  <a href="https://www.midjourney.com/app/" target="_blank">
  <button class="ring-blue-500 hover:ring hover:bg-[#121212]">
    <svg  class="w-7 mx-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect width="100" height="100" fill="url(#pattern0)"/>
                        <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image0_617_236" transform="scale(0.002)"/>
                        </pattern>
                        <image id="image0_617_236" width="500" height="500" xlink:href="data:image/png;base64,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"/>
                        </defs>
    </svg>
    <span class="pointer-events-none block opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-white absolute text-xs px-2 py-2 bg-neutral-800 rounded-md -left-[8.5rem] top-[0.4rem] before:block before:absolute before:w-3 before:h-3 p-1 before:rounded-sm before:-right-1 before:top-2.5 before:bg-neutral-800 before:-z-10 before:rotate-45">Ouvrir Midjourney</span>
  </button>
</a>


  <button v-on:click="openSend = !openSend" class="group ">
    <svg class="w-6 mx-8 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect class="fill-white group-hover:fill-black transition-all" opacity="0.12" x="2" y="10" width="20" height="12" rx="4"/>
      <path class="stroke-white group-hover:stroke-black transition-all" d="M8 10L7.5 10V10C6.10444 10 5.40666 10 4.83886 10.1722C3.56046 10.56 2.56004 11.5605 2.17224 12.8389C2 13.4067 2 14.1044 2 15.5V16C2 17.8638 2 18.7956 2.30448 19.5307C2.71046 20.5108 3.48915 21.2895 4.46927 21.6955C5.20435 22 6.13623 22 8 22L16 22C17.8638 22 18.7956 22 19.5307 21.6955C20.5108 21.2895 21.2895 20.5108 21.6955 19.5307C22 18.7956 22 17.8638 22 16V15.5C22 14.1044 22 13.4067 21.8278 12.8389C21.44 11.5605 20.4395 10.56 19.1611 10.1722C18.5933 10 17.8956 10 16.5 10V10H16M12 15L12 2M12 2L8 6M12 2L16 6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="pointer-events-none block opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-white absolute text-xs px-2 py-2 bg-neutral-800 rounded-md -right-[8.5rem] top-[0.4rem] before:block before:absolute before:w-3 before:h-3 p-1 before:rounded-sm before:-left-1 before:top-2.5 before:bg-neutral-800 before:-z-10 before:rotate-45">Envoyer le prompt</span>
  </button>
</div>

                  <!-- box settings -->

<Transition name="slide-fade">
  <div v-if="openSettings" class="flex justify-center relative bg-[#121212] z-50">
    <div class="absolute lg:max-w-4xl max-w-auto bg-white/1 backdrop-blur-xl rounded-xl text-white border-2 border-white/40 p-4 mt-6">
      <form class="h-8 my-3 rounded w-96 flex" v-for="paramPrompt in Addparams" :key="paramPrompt.id">
        
        <label class="label__title mr-4 w-28 peer font-semibold">{{ paramPrompt.titleShort }}</label>
        <span class="block w-[7.6rem] text-center opacity-0 transition-all duration-200 peer-hover:opacity-100 group-hover:text-white absolute text-xs px-2 py-2 bg-neutral-800 rounded-md right-[26.3rem] before:block before:absolute before:w-3 before:h-3 p-1 before:rounded-sm before:-right-1 before:top-2.5 before:bg-neutral-800 before:-z-10 before:rotate-45 pointer-events-none">{{ paramPrompt.descri }}</span>
  
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
  
        <label class="peer label__title mr-4 w-28  font-semibold shadow-none">{{ paramPromptSwitch.titleShort }}</label>
        <span class="block w-[7.6rem] text-center opacity-0 transition-all duration-200 peer-hover:opacity-100 group-hover:text-white absolute text-xs px-2 py-2 bg-neutral-800 rounded-md right-[26.3rem] before:block before:absolute before:w-3 before:h-3 p-1 before:rounded-sm before:-right-1 before:top-2.5 before:bg-neutral-800 before:-z-10 before:rotate-45 pointer-events-none">{{ paramPromptSwitch.descri }}</span>
  
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
  <div v-if="openCamera" class="flex justify-center relative bg-[#121212] z-50">
    <div class="absolute lg:max-w-4xl max-w-auto bg-white/1 backdrop-blur-xl rounded-xl text-white border-2 border-white/40 p-4 mt-6">

      <button @click="ListOpen = !ListOpen" class="flex items-center group mx-auto">
        Parametres de caméra
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="ml-1 h-5 w-5 fill-current text-white group-hover:text-black">
          <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"></path>
        </svg>
      </button>
      
      <ul v-if="ListOpen" class="bg-neutral-800 border-2 border-white/40 rounded-2xl mt-3 absolute w-[calc(100%-30px)] z-30">
        <li class="cursor-pointer text-center py-2 hover:bg-neutral-500/30 rounded-full" v-for="paramCamera in CameraParams" :key="paramCamera.id" @click="SelectList = paramCamera.id - 1; ListOpen = !ListOpen">{{ paramCamera.title }}</li>
      </ul>
      
      <form class="h-auto my-4 rounded w-96">
  
        <label class="label__title mr-4 font-semibold shadow-none text-2xl">{{ CameraParams[SelectList].title }}</label>
  
        <div class="w-full grid rounded-md gap-4 grid-cols-2 mt-4 overflow-y-scroll h-96" v-if="SelectList != 0">

          <label class="text-center cursor-pointer w-full hover:opacity-80 bg-white text-black rounded-md font-bold"> Aucun
            <input class="sr-only" type="radio" :name="CameraParams[SelectList].title" :value="null" v-model="selectedCameraParams[SelectList]"/>
          </label>
  
          <label v-for="camera in CameraParams[SelectList].params" class="h-auto text-center rounded-md w-full cursor-pointer hover:opacity-80 py-0" :key="camera.paramId"><div class="bg-white text-black text-center rounded-t-md rounded-b-sm"> {{ camera.param }}</div><img onerror="this.onerror=null;this.src='./assets/categoriesImages/no.jpg';" class="w-full" :src="`${ camera ? camera.imageUrl: '' }`">
            <input class="sr-only" type="radio" :name="CameraParams[SelectList].title" :value="camera.param" v-model="selectedCameraParams[SelectList]"/>
          </label>

          
        </div>
        <CameraDraggable v-else class="mt-4" @button-click="handleButtonClique">
        </CameraDraggable>
  
  
      </form>
      <div class="w-96 flex justify-center mt-6">
        <button v-on:click="openCamera = !openCamera">Fermer</button>
      </div>
    </div>
    </div>
  
</Transition>


<Transition name="slide-fade">
  <div v-if="openSend" class="flex justify-center relative bg-[#121212] z-50">
    <div class="absolute lg:max-w-4xl max-w-auto bg-white/1 backdrop-blur-xl rounded-xl text-white border-2 border-white/40 p-4 mt-6">
      <ul class=" flex flex-col gap-3">

        <li class="flex items-center h-12 group ring-white hover:ring-2 bg-neutral-800 rounded-full hover:bg-neutral-500/30 transition-all" @click="copyText">
          <svg class="absolute w-8 mx-3 fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.32" d="M17.9999 7.25V10C17.9999 12.8003 17.9999 14.2004 17.4549 15.27C16.9755 16.2108 16.2106 16.9757 15.2698 17.455C14.2003 18 12.8001 18 9.99988 18H7.25C7.25 18.6967 7.25 19.0451 7.29329 19.3369C7.55182 21.0797 8.92025 22.4482 10.6631 22.7067C10.9549 22.75 11.3033 22.75 12 22.75H16.35C18.5902 22.75 19.7103 22.75 20.566 22.314C21.3186 21.9305 21.9305 21.3186 22.314 20.566C22.75 19.7103 22.75 18.5902 22.75 16.35V12.0001C22.75 11.3033 22.75 10.9549 22.7067 10.663C22.4481 8.92023 21.0798 7.55186 19.337 7.29331C19.0451 7.25 18.6967 7.25 17.9999 7.25Z"/>
            <path d="M7.65 1.25C5.40979 1.25 4.28968 1.25 3.43404 1.68597C2.68139 2.06947 2.06947 2.68139 1.68597 3.43404C1.25 4.28968 1.25 5.40979 1.25 7.65V10.35C1.25 12.5902 1.25 13.7103 1.68597 14.566C2.06947 15.3186 2.68139 15.9305 3.43404 16.314C4.28968 16.75 5.40979 16.75 7.65 16.75H10.35C12.5902 16.75 13.7103 16.75 14.566 16.314C15.3186 15.9305 15.9305 15.3186 16.314 14.566C16.75 13.7103 16.75 12.5902 16.75 10.35V7.65C16.75 5.40979 16.75 4.28968 16.314 3.43404C15.9305 2.68139 15.3186 2.06947 14.566 1.68597C13.7103 1.25 12.5902 1.25 10.35 1.25H7.65Z"/>
          </svg>
          <p class="cursor-pointer flex justify-center items-center h-8 w-full">Copier le prompt</p>
        </li>

        <li class="flex items-center h-12 group hover:ring-2 ring-orange-600 bg-neutral-800 rounded-full hover:bg-neutral-500/30 transition-all" @click="share('Reddit')">
          <svg class="absolute w-8 mx-3" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <g class="fill-white group-hover:fill-orange-600 duration-200 transition-all">
                  <path d="M228.21 124.67A51.6 51.6 0 0 1 232 144c0 39.76-46.56 72-104 72S24 183.76 24 144a51.6 51.6 0 0 1 3.79-19.33a24 24 0 1 1 31.62-34.79C77.72 78.75 101.72 72 128 72s50.28 6.75 68.59 17.88a24 24 0 1 1 31.62 34.79Z" opacity=".2"/>
                  <path d="M248 104a32 32 0 0 0-52.94-24.19c-16.75-8.9-36.76-14.28-57.66-15.53l5.19-31.17l17.72 2.72a24 24 0 1 0 2.87-15.74l-26-4a8 8 0 0 0-9.11 6.59l-6.87 41.48c-21.84.94-42.82 6.38-60.26 15.65a32 32 0 0 0-42.59 47.74A59 59 0 0 0 16 144c0 21.93 12 42.35 33.91 57.49C70.88 216 98.61 224 128 224s57.12-8 78.09-22.51C228 186.35 240 165.93 240 144a59 59 0 0 0-2.35-16.45A32.16 32.16 0 0 0 248 104Zm-64-80a8 8 0 1 1-8 8a8 8 0 0 1 8-8Zm40.13 93.78a8 8 0 0 0-3.29 10A43.62 43.62 0 0 1 224 144c0 16.53-9.59 32.27-27 44.33C178.67 201 154.17 208 128 208s-50.67-7-69-19.67c-17.41-12.06-27-27.8-27-44.33a43.75 43.75 0 0 1 3.14-16.17a8 8 0 0 0-3.27-10a16 16 0 1 1 21.07-23.24a8 8 0 0 0 10.63 2.12l.18-.11C81.45 85.9 104.25 80 128 80c23.73 0 46.53 5.9 64.23 16.6l.18.11a8 8 0 0 0 10.63-2.12a16 16 0 1 1 21.07 23.19ZM88 144a16 16 0 1 1 16-16a16 16 0 0 1-16 16Zm96-16a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm-16.93 44.25a8 8 0 0 1-3.32 10.82a76.18 76.18 0 0 1-71.5 0a8 8 0 1 1 7.5-14.14a60.18 60.18 0 0 0 56.5 0a8 8 0 0 1 10.82 3.32Z"/>
              </g>
          </svg>
          <p class="cursor-pointer flex justify-center items-center h-8 w-full">Reddit</p>
        </li>

        <li class="flex items-center group h-12 hover:ring-2 ring-blue-400 bg-neutral-800 rounded-full hover:bg-neutral-500/30 transition-all" @click="share('Twitter')">
          <svg class="absolute w-7 mx-3" viewBox="0 0 24 24" aria-hidden="true">
            <g class="fill-white group-hover:fill-blue-400 duration-200 transition-all">
              <path d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"></path>
            </g>
          </svg>
          <p class="cursor-pointer flex justify-center items-center h-8 w-full">TwitterX</p>
        </li>

        <li class="flex items-center group h-12 hover:ring-2 ring-green-600 bg-neutral-800 rounded-full hover:bg-neutral-500/30 transition-all" @click="share('Whatsapp')">
          <svg class="absolute w-8 mx-3" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <g class="fill-white group-hover:fill-green-600  duration-200 transition-all">
                <path d="M128 32a96 96 0 0 0-83.11 144.07l-12.47 37.39a8 8 0 0 0 10.12 10.12l37.39-12.47A96 96 0 1 0 128 32Zm24 152a80 80 0 0 1-80-80a32 32 0 0 1 32-32l16 32l-12.32 18.47a48.19 48.19 0 0 0 25.85 25.85L152 136l32 16a32 32 0 0 1-32 32Z" opacity=".2"/>
                <path d="m187.58 144.84l-32-16a8 8 0 0 0-8 .5l-14.69 9.8a40.55 40.55 0 0 1-16-16l9.8-14.69a8 8 0 0 0 .5-8l-16-32A8 8 0 0 0 104 64a40 40 0 0 0-40 40a88.1 88.1 0 0 0 88 88a40 40 0 0 0 40-40a8 8 0 0 0-4.42-7.16ZM152 176a72.08 72.08 0 0 1-72-72a24 24 0 0 1 19.29-23.54l11.48 23L101 118a8 8 0 0 0-.73 7.51a56.47 56.47 0 0 0 30.15 30.15A8 8 0 0 0 138 155l14.62-9.74l23 11.48A24 24 0 0 1 152 176ZM128 24a104 104 0 0 0-91.82 152.88l-11.35 34.05a16 16 0 0 0 20.24 20.24l34.05-11.35A104 104 0 1 0 128 24Zm0 192a87.87 87.87 0 0 1-44.06-11.81a8 8 0 0 0-6.54-.67L40 216l12.47-37.4a8 8 0 0 0-.66-6.54A88 88 0 1 1 128 216Z"/>
            </g>
        </svg>
          <p class="cursor-pointer flex justify-center items-center h-8 w-full">Whatsapp</p>
        </li>
        
      </ul>
      <div class="w-96 flex justify-center mt-6">
        <button v-on:click="openSend = !openSend">Fermer</button>
      </div>
    </div>
    </div>
  
</Transition>


                  <!-- box image -->

<div class="w-full flex justify-center px-8 py-6 bg-[#121212]">
  <div>
    <MidjourneyApi></MidjourneyApi>
  </div>
  <div class="flex items-center px-8">
    <div class="rounded-xl flex overflow-hidden border-2 border-white/40">
      <img class=" max-h-[600px] lg:max-w-4xl max-w-auto" :src="`${ prompt ? prompt.imageUrl: '' }`">
    </div>
  </div>
</div>



                    <!-- dialog aide -->

  <dialog ref="dialog" class="bg-white/10 backdrop-blur-xl rounded-xl text-white border-2 border-white/40 p-4 bg-[#121212]">
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
      <button @click="closeDialog">Fermer</button>
    </div>
  </dialog>
  </div>

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
  @apply w-14 py-[3px] h-8 text-sm leading-6 text-white rounded-full transition-all;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.PromptHover{
  @apply mx-[0.5px] px-[1px] hover:before:absolute before:-inset-[3px] before:bg-white/10 before:rounded-lg relative inline-block before:-z-10 z-10 cursor-pointer;
}

</style>