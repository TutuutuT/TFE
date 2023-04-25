<script setup>
import { gsap } from 'gsap';
import { VueElement, ref } from 'vue'

defineProps({
  msg: String,
})

//anim gsap

const tlPart1 = ref(null)

var tl1 = gsap.timeline();
  tl1.to(tlPart1, {y: 100})
</script>

<template>

    <section class="h-full flex">
        <div class="w-[calc(80vw-55px)] mr-[15px] ml-[30px] mb-[15px] mt-[15px]">
            <div class="h-[30vh] flex justify-center items-center bg-white/5 backdrop-blur-sm rounded-3xl text-[2.2cqi] text-white border-2 border-white/40">
                <h1 class="text__line"><span ref="tlPart1">Prompt</span><span>Pilot</span></h1>
            </div>
            <div class="mt-[30px] h-[30vh] flex">
                <div class="w-[calc(65vw-30px)] mr-[15px] midjourneyBck flex justify-center items-center bg-[white/5] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40 hover:scale-[98%] transition-all">
                    
                </div>
                <div class="w-[calc(35vw-30px)] ml-[15px] h-[30vh] flex justify-center items-center bg-[#FF5145] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                    <h2>Votre aide pour rédiger le meilleur prompt</h2>
                </div>
            </div>
            <div class="mt-[30px] h-[30vh] flex">
                <div class="width-change-part1 w-[calc(35vw-30px)] mr-[15px] flex justify-center items-center bg-[#428EFF] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                    
                </div>
                <div class="width-change-part2 w-[calc(65vw-30px)] ml-[15px]  flex justify-center items-center bg-[#FFBB00] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40 p-5 text-center">
                    <h2>Votre aide pour rédiger le meilleur prompt</h2>
                </div>
            </div>
        </div>
        <div class="w-[calc(20vw-35px)] ml-[15px] mr-[30px] mb-[15px] mt-[15px]">
            <div class="h-[calc(90vh+60px)] flex justify-center items-center bg-[#37A952] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                <div class="rotate-90 font-secondary font-bold text-4xl">Votre&nbsp;copilot&nbsp;Midjourney</div>
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
  font-family: Oddval;
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

.width-change-part1{
  animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-name: intro-boxe-width;
  transition-timing-function: ease-in-out;
}

.width-change-part2{
  animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-name: intro-boxe-width-2;
  transition-timing-function: ease-in-out;
}

@keyframes intro-boxe-width {
  0% {
    width: calc(20vw - 30px);
  }

  50% {
    width: calc(60vw - 30px);
  }

  100% {
    width: calc(20vw - 30px);
  }
}

@keyframes intro-boxe-width-2 {
  0% {
    width: calc(60vw - 30px);
  }

  50% {
    width: calc(20vw - 30px);
  }

  100% {
    width: calc(60vw - 30px);
  }
}
</style>
