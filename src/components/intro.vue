<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>

    <section class="h-[90vh] flex">
        <div class="w-[calc(80vw-45px)] mr-[15px] ml-[30px] mb-[15px] mt-[30px]">
            <div class="h-[30vh] flex justify-center items-center bg-white/5 backdrop-blur-sm rounded-lg text-[2vw] text-white border border-white/40">
                <h1 class="text__line">PromptPilot</h1>
            </div>
            <div class="mt-[30px] h-[30vh] flex">
                <div class="w-[calc(65vw-30px)] mr-[15px] midjourneyBck flex justify-center items-center bg-white/5 backdrop-blur-sm rounded-lg text-base font-semibold text-white border border-white/40">
                    
                </div>
                <div class="w-[calc(35vw-30px)] ml-[15px] h-[30vh] flex justify-center items-center bg-white/5 backdrop-blur-sm rounded-lg text-base font-semibold text-white border border-white/40">
                    <h2>Votre aide pour rédiger le meilleur prompt</h2>
                </div>
            </div>
        </div>
        <div class="w-[calc(20vw-45px)] ml-[15px] mr-[30px] mb-[15px] mt-[30px]">
            <div class="h-[calc(60vh+30px)] flex justify-center items-center bg-white/5 backdrop-blur-sm rounded-lg text-base font-semibold text-white border border-white/40">
                <div class="rotate-90 font-secondary font-bold text-2xl">Votre copilot</div>
            </div>
        </div>

    </section>



</template>

<style scoped lang="scss">

.midjourneyBck{
    background-image: url(../assets/MidjourneyImages/8495955.png);
    background-size: cover;
    background-position: center;
}

.text__line {
  font-variation-settings: "wght" 100, "ital" 0;
  font-family: Oddval Variable;
  line-height: 80%;
  color: #ffffff;
  white-space: nowrap;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-name: change;
  transition-timing-function: ease;
}

@keyframes change {
  0% {
    font-variation-settings: "wght" 100, "ital" 0;
  }

  25% {
    font-variation-settings: "wght" 900, "ital" 0;
  }

  50% {
    font-variation-settings: "wght" 900, "ital" 1;
  }

  75% {
    font-variation-settings: "wght" 100, "ital" 1;
  }

  100% {
    font-variation-settings: "wght" 100, "ital" 0;
  }
}
</style>
