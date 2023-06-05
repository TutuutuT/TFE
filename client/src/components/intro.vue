<script setup>
import { VueElement, ref, onMounted } from 'vue'
import { gsap } from 'gsap';

//anim gsap

let tlPart1 = gsap.timeline()

const Part1 = ref(null)
const Part2 = ref(null)

onMounted(() => {
  gsap.fromTo(".appear", {x: 800, opacity: 0}, {x: 0, opacity: 100, duration: 0.3, stagger: 0.3, ease: "power2.out"})
  tlPart1.fromTo(Part1.value,  {autoAlpha: 0, y: 200}, {autoAlpha: 1, duration: 0.6, y: 0, ease: "power2.inOut"});
  tlPart1.from(Part1.value, {x: 200, duration: 0.3, ease: "power2.inOut"})
  gsap.from(".Part2", {x: 200, duration: 0.5, delay: 0.6, opacity: 0, ease: "power2.inOut", stagger: 0.08})
})

</script>

<template>

    <section class="h-full flex overflow-hidden">
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
                <div class="appear w-[calc(65vw-30px)] mr-[15px] midjourneyBck flex justify-center items-center bg-[white/5] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40 hover:scale-[98%] transition-all">
                    
                </div>
                <div class="appear w-[calc(35vw-30px)] ml-[15px] h-[30vh] flex justify-center items-center bg-[#FF5145] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                    <h2>Votre aide pour rédiger le meilleur prompt</h2>
                </div>
            </div>
            <div class="mt-[30px] h-[30vh] flex">
                <div class="appear width-change-part1 w-[calc(35vw-30px)] mr-[15px] flex justify-center items-center bg-[#428EFF] bg-[url('./assets/icon-Wide.jpg')] bg-cover bg-center backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                    
                </div>
                <div class="appear width-change-part2 w-[calc(65vw-30px)] ml-[15px]  flex justify-center items-center bg-[#FFBB00] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40 p-5 text-center">
                    <h2>Votre aide pour rédiger le meilleur prompt</h2>
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
