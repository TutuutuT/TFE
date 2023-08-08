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
    .to(".bloc1 , .bloc2 , .bloc3", { scale:0.9, duration: 0.2, ease: "power5.inOut",delay: 8})
    .to(".bloc1 , .bloc2 , .bloc3", {y: '-100%', duration: 0.6, ease: "power5.inOut",delay: 0.1})
    .to(".bloc1 , .bloc2 , .bloc3", {scale:1  , duration: 0.2, ease: "power5.inOut"})
    .to(".bloc1 , .bloc2 , .bloc3", { scale:0.9, duration: 0.2, ease: "power5.inOut",delay: 3})
    .to(".bloc1 , .bloc2 , .bloc3", {y: '-200%', duration: 0.6, ease: "power5.inOut",delay: 0.1})
    .to(".bloc1 , .bloc2 , .bloc3", {scale:1  , duration: 0.2, ease: "power5.inOut"})

    .to(".bloc1 , .bloc2 , .bloc3", { scale:0.9, duration: 0.2, ease: "power5.inOut",delay: 8})
    .to(".bloc1 , .bloc2 , .bloc3", {y: '-100%', duration: 0.6, ease: "power5.inOut",delay: 0.1})
    .to(".bloc1 , .bloc2 , .bloc3", {scale:1  , duration: 0.2, ease: "power5.inOut"})
    .to(".bloc1 , .bloc2 , .bloc3", { scale:0.9, duration: 0.2, ease: "power5.inOut",delay: 3})
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
                <div class="appear w-[calc(65vw-30px)] mr-[15px] flex justify-center items-center bg-[white/5] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40 transition-all">
                  <TestHover/>
                </div>
                <div class="appear hover:scale-[98%] w-[calc(35vw-30px)] cursor-pointer ring-white hover:ring-2 duration-200 text-center ml-[15px] h-[30vh] flex justify-center items-center bg-[#FF5145] backdrop-blur-sm rounded-3xl text-lg font-semibold text-white border-2 border-white/40">
                    <h2>C'est votre premier prompt ?</h2>
                </div>
            </div>
            <div class="mt-[30px] h-[30vh] flex">

              <div class="w-full flex">

                <div class="w-[calc(40vw-30px)] overflow-hidden pr-[15px]">

                  <div class="overflow-hidden appear bloc2  w-full h-full flex justify-center items-center bg-cover bg-center backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                    <video class="" autoplay muted loop>
                      <source src="../assets/Anim1.mp4" type="video/mp4">
                    </video>
                  </div>

                  <div class="overflow-hidden appear bloc1 w-full h-full flex justify-center items-center bg-cover bg-center backdrop-blur-sm rounded-3xl text-base font-semibold text-white">
                    
                    <div class="border-2 border-white/40 rounded-3xl bg-[#37A952] h-full w-[calc(50%-15px)] mr-[15px] flex flex-col justify-center text-center">
                      <svg class="my-auto w-[35%] mx-auto fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.32" d="M17.9999 7.25V10C17.9999 12.8003 17.9999 14.2004 17.4549 15.27C16.9755 16.2108 16.2106 16.9757 15.2698 17.455C14.2003 18 12.8001 18 9.99988 18H7.25C7.25 18.6967 7.25 19.0451 7.29329 19.3369C7.55182 21.0797 8.92025 22.4482 10.6631 22.7067C10.9549 22.75 11.3033 22.75 12 22.75H16.35C18.5902 22.75 19.7103 22.75 20.566 22.314C21.3186 21.9305 21.9305 21.3186 22.314 20.566C22.75 19.7103 22.75 18.5902 22.75 16.35V12.0001C22.75 11.3033 22.75 10.9549 22.7067 10.663C22.4481 8.92023 21.0798 7.55186 19.337 7.29331C19.0451 7.25 18.6967 7.25 17.9999 7.25Z"/>
                        <path d="M7.65 1.25C5.40979 1.25 4.28968 1.25 3.43404 1.68597C2.68139 2.06947 2.06947 2.68139 1.68597 3.43404C1.25 4.28968 1.25 5.40979 1.25 7.65V10.35C1.25 12.5902 1.25 13.7103 1.68597 14.566C2.06947 15.3186 2.68139 15.9305 3.43404 16.314C4.28968 16.75 5.40979 16.75 7.65 16.75H10.35C12.5902 16.75 13.7103 16.75 14.566 16.314C15.3186 15.9305 15.9305 15.3186 16.314 14.566C16.75 13.7103 16.75 12.5902 16.75 10.35V7.65C16.75 5.40979 16.75 4.28968 16.314 3.43404C15.9305 2.68139 15.3186 2.06947 14.566 1.68597C13.7103 1.25 12.5902 1.25 10.35 1.25H7.65Z"/>
                      </svg>
                      <p class="my-auto text-xl leading-6 text-white">Copie<br>tes prompts</p>
                    </div>

                    <div class="border-2 border-white/40 rounded-3xl bg-[#FF5145] h-full w-[calc(50%-15px)] ml-[15px] flex flex-col justify-center text-center">
                      <svg class="my-auto w-[35%] mx-auto fill-white" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.88154 11.2192C2.45325 9.90064 0.739098 9.24135 0.307963 8.35607C-0.0649225 7.59041 -0.0223838 6.68758 0.420843 5.96037C0.933307 5.11955 2.70185 4.62436 6.23894 3.63398L16.234 0.835356C18.4734 0.208323 19.5931 -0.105194 20.3615 0.185803C21.0314 0.439517 21.5603 0.968408 21.814 1.63831C22.1049 2.40666 21.7914 3.52637 21.1644 5.76577L18.3657 15.7608C17.3753 19.2979 16.88 21.0664 16.0392 21.5789C15.312 22.0221 14.4092 22.0646 13.6435 21.6917C12.7582 21.2606 12.099 19.5464 10.7804 16.1181L10.0877 14.3167C9.95255 13.9655 9.885 13.7898 9.88126 13.6152C9.87796 13.4609 9.91043 13.3079 9.97613 13.1682C10.0504 13.0102 10.1835 12.8772 10.4496 12.611L12.9999 10.0607C13.2928 9.76784 13.2928 9.29296 12.9999 9.00007V9.00007C12.7071 8.70718 12.2322 8.70718 11.9393 9.00007L9.38911 11.5502C9.12298 11.8164 8.98991 11.9494 8.83189 12.0238C8.69221 12.0895 8.53921 12.1219 8.38489 12.1186C8.2103 12.1149 8.03466 12.0473 7.68338 11.9122L5.88154 11.2192Z"/>
                      </svg>
                      <p class="my-auto text-xl leading-6 text-white">Partage<br>tes prompts</p>
                    </div>

                  </div>

                  <div class="overflow-hidden appear bloc3  w-full h-full flex justify-center items-center bg-cover bg-center backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">
                    <video class="" autoplay muted loop>
                      <source src="../assets/Anim2.mp4" type="video/mp4">
                    </video>
                  </div>
                  
                </div>

                <div class=" w-[calc(60vw-30px)] pl-[15px]">

                  <div class="overflow-hidden appear width-change-part2 w-full h-full flex justify-center items-center bg-[#FFBB00] backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40 p-5 text-center">
                    <video class="" autoplay muted loop>
                      <source src="../assets/blanc-jaune-2.mp4" type="video/mp4">
                    </video>
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


</style>
