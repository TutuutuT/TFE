<script setup>
import { VueElement, ref, onMounted } from 'vue'
import { gsap } from 'gsap';

import TestHover from './TestHover.vue';

//anim gsap

let tlPart1 = gsap.timeline()
let tlChangeOrder = gsap.timeline({repeat: -1})

const Part1 = ref(null)
const Part2 = ref(null)

onMounted(() => {
  gsap.fromTo(".appear", {x: 800, opacity: 0}, {x: 0, opacity: 100, duration: 0.3, stagger: 0.3, ease: "power2.out"})
  tlPart1.fromTo(Part1.value,  {autoAlpha: 0, y: 200}, {autoAlpha: 1, duration: 0.6, y: 0, ease: "power2.inOut"});
  tlPart1.from(Part1.value, {x: 200, duration: 0.3, ease: "power2.inOut"});
  gsap.from(".Part2", {x: 200, duration: 0.5, delay: 0.6, opacity: 0, ease: "power2.inOut", stagger: 0.08});
  tlChangeOrder
    .to(".bloc1 , .bloc2 , .bloc3", { scale:0.9, duration: 0.2, ease: "power5.inOut",delay: 5})
    .to(".bloc1 , .bloc2 , .bloc3", {y: '-100%', duration: 0.6, ease: "power5.inOut",delay: 0.1})
    .to(".bloc1 , .bloc2 , .bloc3", {scale:1  , duration: 0.2, ease: "power5.inOut"})
    .to(".bloc1 , .bloc2 , .bloc3", { scale:0.9, duration: 0.2, ease: "power5.inOut",delay: 5})
    .to(".bloc1 , .bloc2 , .bloc3", {y: '-200%', duration: 0.6, ease: "power5.inOut",delay: 0.1})
    .to(".bloc1 , .bloc2 , .bloc3", {scale:1  , duration: 0.2, ease: "power5.inOut"})

    .to(".bloc1 , .bloc2 , .bloc3", { scale:0.9, duration: 0.2, ease: "power5.inOut",delay: 5})
    .to(".bloc1 , .bloc2 , .bloc3", {y: '-100%', duration: 0.6, ease: "power5.inOut",delay: 0.1})
    .to(".bloc1 , .bloc2 , .bloc3", {scale:1  , duration: 0.2, ease: "power5.inOut"})
    .to(".bloc1 , .bloc2 , .bloc3", { scale:0.9, duration: 0.2, ease: "power5.inOut",delay: 5})
    .to(".bloc1 , .bloc2 , .bloc3", {y: '0%', duration: 0.6, ease: "power5.inOut",delay: 0.1})
    .to(".bloc1 , .bloc2 , .bloc3", {scale:1  , duration: 0.2, ease: "power5.inOut"})
    
})

</script>

<template>

    <section class="h-full flex overflow-hidden bg-[#121212]">
        <div class="w-[calc(80vw-55px)] mr-[15px] ml-[30px] mb-[15px] mt-[15px]">
            <div class="appear overflow-hidden h-[30vh] flex justify-center items-center bg-white/5 backdrop-blur-sm rounded-3xl text-[2.2cqi] text-white border-2 border-white/40">
                <h1 class="flex">
                  <span ref="Part1" class="text__line">Prompt</span>
                  <span class="text__line Part2">P</span>
                  <span class="text__line Part2">i</span>
                  <span class="text__line Part2">l</span>
                  <span class="text__line Part2">o</span>
                  <span class="text__line Part2">t</span>
                </h1>
            </div>
            <div class="mt-[30px] h-[30vh] flex">
                <div class="appear w-[calc(65vw-30px)] mr-[15px] midjourneyBck flex justify-center items-center bg-[white/5] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40 transition-all">
                  <TestHover/>
                </div>
                <div class="appear w-[calc(35vw-30px)] hover:scale-[98%] cursor-pointer ring-white hover:ring-2 duration-200 text-center ml-[15px] h-[30vh] flex justify-center items-center bg-[#FF5145] backdrop-blur-sm rounded-3xl text-lg font-semibold text-white border-2 border-white/40">
                    <h2>C'est votre premier prompt ?</h2>
                </div>
            </div>
            <div class="mt-[30px] h-[30vh] flex">

              <div class="w-full flex">

                <div class="w-[calc(35vw-30px)] overflow-hidden pr-[15px]">

                  <div class="appear bloc1  w-full h-full flex justify-center items-center bg-[#428EFF] bg-[url('./images/icon-Wide.jpg')] bg-cover bg-center backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                  </div>
                  
                  <div class="appear bloc2  w-full h-full flex justify-center items-center bg-[#2866c4] bg-[url('./images/icon-Wide.jpg')] bg-cover bg-center backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                  </div>

                  <div class="appear bloc3  w-full h-full flex justify-center items-center bg-[#c48d28] bg-[url('./images/icon-Wide.jpg')] bg-cover bg-center backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                  </div>
                  
                </div>

                <div class=" w-[calc(65vw-30px)] pl-[15px]">

                  <div class="appear width-change-part2 w-full h-full flex justify-center items-center bg-[#FFBB00] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40 p-5 text-center">
                      <h2>Éveillez votre créativité avec Midjourney</h2>
                  </div>

                </div>

            </div>


            </div>
        </div>
        <div class="w-[calc(20vw-50px)] ml-[15px] mr-[30px] mb-[15px] mt-[15px]">
            <div class="appear h-[calc(90vh+60px)] flex justify-center items-center bg-[#37A952] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                <div class="rotate-90 font-secondary font-bold text-4xl">Votre&nbsp;copilot&nbsp;Midjourney</div>
            </div>
        </div>
        

    </section>



</template>

<style scoped lang="scss">

.midjourneyBck{
    background-image: url(./MidjourneyImages/brume.jpg);
    background-size: cover;
    background-position: bottom;
}

// .width-change-part1{
//   animation-duration: 4s;
//   animation-iteration-count: infinite;
//   animation-name: intro-boxe-width;
//   transition-timing-function: ease-in-out;
// }

// .width-change-part2{
//   animation-duration: 4s;
//   animation-iteration-count: infinite;
//   animation-name: intro-boxe-width-2;
//   transition-timing-function: ease-in-out;
// }

// @keyframes intro-boxe-width {
//   0% {
//     transform: translateY(0px);
//   }

//   50% {
//     transform: translateY(300px);
//   }

//   100% {
//     transform: translateY(0px);
//   }
// }

// @keyframes intro-boxe-width-2 {
//   0% {
//     transform: translateY(300px);
//   }

//   50% {
//     transform: translateY(0px);
//   }

//   100% {
//     transform: translateY(300px);
//   }
// }
</style>
