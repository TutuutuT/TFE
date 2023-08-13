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
  <button class="group ring-blue-500 hover:ring">
    <svg class="w-6 mx-8 fill-white group-hover:fill-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.7499 5.9848C12.7499 3.18698 12.7499 1.78808 12.2268 1.21521C11.774 0.719349 11.1025 0.483823 10.4392 0.588153C9.67282 0.708686 8.79892 1.80105 7.05114 3.98579L2.59867 9.55136C1.2672 11.2157 0.60146 12.0479 0.600704 12.7482C0.600047 13.3573 0.876976 13.9335 1.353 14.3135C1.90035 14.7504 2.96605 14.7504 5.09745 14.7504H5.64992C6.20997 14.7504 6.49 14.7504 6.70391 14.8594C6.89207 14.9553 7.04505 15.1082 7.14093 15.2964C7.24992 15.5103 7.24992 15.7903 7.24992 16.3504V18.016C7.24992 20.8138 7.24992 22.2127 7.77306 22.7856C8.22587 23.2814 8.89731 23.517 9.56066 23.4126C10.327 23.2921 11.2009 22.1997 12.9487 20.015L17.4012 14.4494C18.7326 12.7851 19.3984 11.9529 19.3991 11.2525C19.3998 10.6435 19.1229 10.0673 18.6468 9.6873C18.0995 9.25039 17.0338 9.25039 14.9024 9.25039H14.3499C13.7899 9.25039 13.5098 9.25039 13.2959 9.1414C13.1078 9.04552 12.9548 8.89254 12.8589 8.70438C12.7499 8.49047 12.7499 8.21044 12.7499 7.65039V5.9848Z"/>
    </svg>
    <span class="pointer-events-none block opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-white absolute text-xs px-2 py-2 bg-neutral-800 rounded-md -left-[8.5rem] top-[0.4rem] before:block before:absolute before:w-3 before:h-3 p-1 before:rounded-sm before:-right-1 before:top-2.5 before:bg-neutral-800 before:-z-10 before:rotate-45">Ouvrir Midjourney</span>
  </button>
</a>


  <button v-on:click="openSend = !openSend" class="group">
    <svg class="w-6 mx-8 fill-white group-hover:fill-black transition-all" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.88154 11.2192C2.45325 9.90064 0.739098 9.24135 0.307963 8.35607C-0.0649225 7.59041 -0.0223838 6.68758 0.420843 5.96037C0.933307 5.11955 2.70185 4.62436 6.23894 3.63398L16.234 0.835356C18.4734 0.208323 19.5931 -0.105194 20.3615 0.185803C21.0314 0.439517 21.5603 0.968408 21.814 1.63831C22.1049 2.40666 21.7914 3.52637 21.1644 5.76577L18.3657 15.7608C17.3753 19.2979 16.88 21.0664 16.0392 21.5789C15.312 22.0221 14.4092 22.0646 13.6435 21.6917C12.7582 21.2606 12.099 19.5464 10.7804 16.1181L10.0877 14.3167C9.95255 13.9655 9.885 13.7898 9.88126 13.6152C9.87796 13.4609 9.91043 13.3079 9.97613 13.1682C10.0504 13.0102 10.1835 12.8772 10.4496 12.611L12.9999 10.0607C13.2928 9.76784 13.2928 9.29296 12.9999 9.00007V9.00007C12.7071 8.70718 12.2322 8.70718 11.9393 9.00007L9.38911 11.5502C9.12298 11.8164 8.98991 11.9494 8.83189 12.0238C8.69221 12.0895 8.53921 12.1219 8.38489 12.1186C8.2103 12.1149 8.03466 12.0473 7.68338 11.9122L5.88154 11.2192Z"/>
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