<script setup>
import { ref } from 'vue'
const tutoStep = ref(0)

const incrment = () => {
	tutoStep.value = tutoStep.value + 1
}

const decrment = () => {
  if (tutoStep.value > 0) {
    tutoStep.value = tutoStep.value - 1
  } else {
    tutoStep.value = tutoStep.value
  }
	
}
</script>

<template>

    
    <div v-if="tutoStep == 0" class="absolute w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-sm z-40">
        <div class="h-[14rem] w-[40rem] rounded-3xl border-2 border-white/40 bg-neutral-800 p-6">
            <div class="flex justify-center text-xl font-bold mb-6">Bienvenue</div>
            <p class="flex justify-center text-xl">Ce tuto va vous expliquer comment utiliser PromptPilot.</p>
            <div class="flex justify-center mt-6">
                <button @click="incrment">Démarrer</button>
            </div>
        </div>
    </div>

    <div v-if="tutoStep == 1" class="grid auto-rows-auto absolute pointer-events-none w-full h-full z-40 max-h-[824px]">

      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>
      <div class=" h-[4.7rem] pointer-events-auto"></div>

        <div class="absolute bottom-6 max-w-sm left-6 rounded-3xl border-2 pointer-events-auto border-white/40 bg-neutral-800 p-6">
          <p class="flex justify-center text-xl text-center mb-4 pb-4 border-b-2 border-white/40">Pour commencer, le champ de texte avec le prompt.</p>
          <p class="flex justify-center">Celui-ci vous permet de voir le prompt prédéfini (ou vide si vous avez choisi un prompt libre).</p>
          <div class="flex justify-center mt-6 gap-12">
            <button @click="decrment">Retour</button>
            <button @click="incrment">Suivant</button>
          </div>
        </div>
    </div>

    <div v-if="tutoStep == 2" class="grid auto-rows-auto absolute pointer-events-none w-full h-full z-40 max-h-[824px]">

      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[9.4rem]"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>
      <div class=" h-[4.7rem] pointer-events-auto"></div>

        <div class="absolute bottom-6 max-w-sm left-6 rounded-3xl border-2 pointer-events-auto border-white/40 bg-neutral-800 p-6">
          <p class="flex justify-center text-xl text-center mb-4 pb-4 border-b-2 border-white/40">Penchons-nous sur les termes</p>
          <p class="flex justify-center">Si vous survolez les différents termes, vous pourrez voir à quelle catégorie ils appartiennent.</p>
          <p class="flex justify-center mt-4">En cliquant dessus, vous pourrez choisir un autre terme de la catégorie pour le remplacer, ou par votre propre terme en utilisant le champ de texte</p>
          <div class="flex justify-center mt-6 gap-12">
            <button @click="decrment">Retour</button>
            <button @click="incrment">Suivant</button>
          </div>
        </div>
    </div>


    <div v-if="tutoStep == 3" class="grid auto-rows-auto absolute pointer-events-none w-full h-full z-40 max-h-[824px]">

      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] "></div>
      <div class="h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>
      <div class=" h-[4.7rem] pointer-events-auto"></div>

        <div class="absolute bottom-6 max-w-sm left-6 rounded-3xl border-2 pointer-events-auto border-white/40 bg-neutral-800 p-6">
          <p class="flex justify-center text-xl text-center mb-4 pb-4 border-b-2 border-white/40">Ajouter des termes personalisés</p>
          <p class="flex justify-center">Si vous souhaitez ajouter vos propres termes sans passer par les catégories, c'est tout à fait possible.</p>
          <p class="flex justify-center mt-4">En écrivant vos termes dans le champ de texte, ils s'ajouteront directement au prompt.</p>
          <div class="flex justify-center mt-6 gap-12">
            <button @click="decrment">Retour</button>
            <button @click="incrment">Suivant</button>
          </div>
        </div>
    </div>



    <div v-if="tutoStep == 4" class="grid auto-rows-auto absolute pointer-events-none w-full h-full z-40 max-h-[824px]">

      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[9.4rem] pointer-events-auto"></div>
      <div class="h-[4.7rem]"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>
      <div class=" h-[4.7rem] pointer-events-auto"></div>

        <div class="absolute bottom-6 max-w-sm left-6 rounded-3xl border-2 pointer-events-auto border-white/40 bg-neutral-800 p-6">
          <p class="flex justify-center text-xl text-center mb-4 pb-4 border-b-2 border-white/40">Exclure des termes personalisés</p>
          <p class="flex justify-center">Si vous souhaitez que certains termes n'apparaissent pas dans l'image générée, vous pouvez les ajouter dans ce champ de texte.</p>
          <div class="flex justify-center mt-6 gap-12">
            <button @click="decrment">Retour</button>
            <button @click="incrment">Suivant</button>
          </div>
        </div>
    </div>



    <div v-if="tutoStep == 5" class="grid auto-rows-auto absolute pointer-events-none w-full h-full z-40 max-h-[824px]">

      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem]"></div>
      <div class=" h-[4.7rem]"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>
      <div class=" h-[4.7rem] pointer-events-auto"></div>

        <div class="absolute bottom-6 max-w-sm left-6 rounded-3xl border-2 pointer-events-auto border-white/40 bg-neutral-800 p-6">
          <p class="flex justify-center text-xl text-center mb-4 pb-4 border-b-2 border-white/40">Les paramètres caméra.</p>
          <p class="flex justify-center">Si vous cliquez sur le bouton "caméra", une fenêtre va s'ouvrir, contenant tous les paramètres de caméra.</p>
          <p class="flex justify-center mt-4">Pour changer de paramètre, il vous suffit de cliquer sur le bouton "paramètres de caméra" et de sélectionner le paramètre que vous souhaitez modifier.</p>
          <div class="flex justify-center mt-6 gap-12">
            <button @click="decrment">Retour</button>
            <button @click="incrment">Suivant</button>
          </div>
        </div>
    </div>



    <div v-if="tutoStep == 6" class="grid auto-rows-auto absolute pointer-events-none w-full h-full z-40 max-h-[824px]">

      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem]"></div>
      <div class=" h-[4.7rem]"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>
      <div class=" h-[4.7rem] pointer-events-auto"></div>

        <div class="absolute bottom-6 max-w-sm left-6 rounded-3xl border-2 pointer-events-auto border-white/40 bg-neutral-800 p-6">
          <p class="flex justify-center text-xl text-center mb-4 pb-4 border-b-2 border-white/40">Les paramètres Midjourney.</p>
          <p class="flex justify-center">Si vous cliquez sur le bouton avec les curseurs, une fenêtre s'ouvrira contenant tous les paramètres Midjourney.</p>
          <p class="flex justify-center mt-4">Pour une meilleure compréhension des paramètres, vous pouvez survoler le nom de chaque élément à gauche ou cliquer sur le bouton "i" à droite du bouton de paramètres Midjourney.</p>
          <div class="flex justify-center mt-6 gap-12">
            <button @click="decrment">Retour</button>
            <button @click="incrment">Suivant</button>
          </div>
        </div>
    </div>



    <div v-if="tutoStep == 7" class="grid auto-rows-auto absolute pointer-events-none w-full h-full z-40 max-h-[824px]">

      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem]"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem]"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>

        <div class="absolute bottom-6 max-w-sm left-6 rounded-3xl border-2 pointer-events-auto border-white/40 bg-neutral-800 p-6">
          <p class="flex justify-center text-xl text-center mb-4 pb-4 border-b-2 border-white/40">Générer votre image.</p>
          <p class="flex justify-center">Lorsque vous êtes satisfait de votre prompt, vous pouvez générer l'image en utilisant ce bouton.</p>
          <p class="flex justify-center mt-4">L'image apparaîtra après environ 20 secondes.</p>
          <div class="flex justify-center mt-6 gap-12">
            <button @click="decrment">Retour</button>
            <button @click="incrment">Suivant</button>
          </div>
        </div>
    </div>




    <div v-if="tutoStep == 8" class="grid auto-rows-auto absolute pointer-events-none w-full h-full z-40 max-h-[824px]">

      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem]"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem]"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>

        <div class="absolute bottom-6 max-w-sm left-6 rounded-3xl border-2 pointer-events-auto border-white/40 bg-neutral-800 p-6">
          <p class="flex justify-center text-xl text-center mb-4 pb-4 border-b-2 border-white/40">Partagez votre prompt.</p>
          <p class="flex justify-center">Vous pouvez également le partager en utilisant le bouton de partage.</p>
          <p class="flex justify-center mt-4">Et si vous souhaitez accéder au site de Midjourney, vous pouvez vous y rendre à l'aide du bouton de gauche.</p>
          <div class="flex justify-center mt-6 gap-12">
            <button @click="decrment">Retour</button>
            <button @click="incrment">Suivant</button>
          </div>
        </div>
    </div>




    <div v-if="tutoStep == 9" class="grid auto-rows-auto absolute pointer-events-none w-full h-full z-40 max-h-[824px]">

      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[9.4rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem]"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class=" bg-black/50 backdrop-blur-sm h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[9.4rem]"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>
      <div class="h-[4.7rem] pointer-events-auto"></div>

        <div class="absolute bottom-6 max-w-sm left-6 rounded-3xl border-2 pointer-events-auto border-white/40 bg-neutral-800 p-6">
          <p class="flex justify-center text-xl text-center mb-4 pb-4 border-b-2 border-white/40">Accéder aux images.</p>
          <p class="flex justify-center">Lorsque votre image sera générée, ces boutons apparaîtront et vous pourrez ainsi accéder à l'image souhaitée.</p>
          <div class="flex justify-center mt-6 gap-12">
            <button @click="decrment">Retour</button>
            <button @click="incrment">Suivant</button>
          </div>
        </div>
    </div>




    <div v-if="tutoStep == 10" class="absolute w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-sm z-40">
        <div class="h-[14rem] w-[40rem] rounded-3xl border-2 border-white/40 bg-neutral-800 p-6">
          <div class="flex justify-center text-xl font-bold mb-6">Fini.</div>
          <p class="flex justify-center text-xl">Merci d'avoir suivi ce tuto.</p>
          <div class="flex justify-center mt-6">
            <router-link class=" bg-white/5 backdrop-blur-sm rounded-2xl text-base font-semibold text-white border-2 border-white/40 px-5 py-2 cursor-pointer hover:bg-white hover:text-zinc-950 transition-all duration-200" :to="{ name: 'Home'}">
              Terminer
            </router-link>
          </div>
        </div>
    </div>

    <div class="absolute w-full z-40 top-10 flex justify-center ">
        <div class="w-[30rem] h-0.5 bg-white flex justify-between">
            <div class="h-5 w-5 rounded-full border-4 border-black -mt-[0.55rem] duration-200 transition-all" :class="{ white : tutoStep >= 0}"></div>
            <div class="h-5 w-5 rounded-full border-4 border-black -mt-[0.55rem] duration-200 transition-all" :class="{ white : tutoStep >= 1, grey : tutoStep < 1}"></div>
            <div class="h-5 w-5 rounded-full border-4 border-black -mt-[0.55rem] duration-200 transition-all" :class="{ white : tutoStep >= 2, grey : tutoStep < 2}"></div>
            <div class="h-5 w-5 rounded-full border-4 border-black -mt-[0.55rem] duration-200 transition-all" :class="{ white : tutoStep >= 3, grey : tutoStep < 3}"></div>
            <div class="h-5 w-5 rounded-full border-4 border-black -mt-[0.55rem] duration-200 transition-all" :class="{ white : tutoStep >= 4, grey : tutoStep < 4}"></div>
            <div class="h-5 w-5 rounded-full border-4 border-black -mt-[0.55rem] duration-200 transition-all" :class="{ white : tutoStep >= 5, grey : tutoStep < 5}"></div>
            <div class="h-5 w-5 rounded-full border-4 border-black -mt-[0.55rem] duration-200 transition-all" :class="{ white : tutoStep >= 6, grey : tutoStep < 6}"></div>
            <div class="h-5 w-5 rounded-full border-4 border-black -mt-[0.55rem] duration-200 transition-all" :class="{ white : tutoStep >= 6, grey : tutoStep < 7}"></div>
            <div class="h-5 w-5 rounded-full border-4 border-black -mt-[0.55rem] duration-200 transition-all" :class="{ white : tutoStep >= 6, grey : tutoStep < 8}"></div>
            <div class="h-5 w-5 rounded-full border-4 border-black translate-x-0.5 -mt-[0.55rem] duration-200 transition-all" :class="{ white : tutoStep >= 9, grey : tutoStep < 9}"></div>
        </div>
    </div>

</template>

<style>

.white{
    @apply bg-white;
}

.grey{
    @apply bg-neutral-800;
}

</style>