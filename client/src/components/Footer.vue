<script setup>

import { gsap } from 'gsap';

</script>

<template>
<h2 class="text-center mb-52 py-20 font-secondary text-white/20 font-bold bg-[#121212] rounded-b-[50px] relative">PromptPilot</h2>
<footer class="h-[30svh] font-semibold bg-white pt-32 fixed bottom-0 w-full -z-50">
    <!-- <div class="flex justify-center">
        <div class="w-[calc(100vw-76px)] bg-white/5 rounded-3xl lg:py-8 py-6 border-2 border-white/40">
            <p class="w-full mb-12 text-lg text-white/40 font-normal lg:px-8 px-6">L'éditeur de prompt pour Midjourney</p>
            <div class="flex px-8 gap-12">
                <div class="w-[40vw]">
                    <h3 class="-mb-4 w-fit px-4 bg-white/5 backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">Année</h3>
                    <p class="text-[10vw]">2023</p>
                </div>
                <div class="w-[60vw] -z-10">
                    <h3 class="-mb-4 w-fit px-4 bg-white/5 backdrop-blur-sm rounded-3xl text-base font-semibold text-white border-2 border-white/40">Lieu</h3>
                    <p class="text-[10vw]">Belgique</p>
                </div>
            </div>
        </div>
    </div> -->

    <div class="text-lg">
        <ul class="italic flex justify-between lg:mx-20 mx-10 leading-8">
            <li class="primaryList">Contact
                <ul>
                    <li class="secondaryList"><a href="mailto:bastienthunus@gmail.com">bastienthunus@gmail.com</a></li>
                </ul>
            </li>
            <li class="primaryList">Réseaux
                <ul>
                    <li class="secondaryList"><a href="https://www.linkedin.com/in/bastien-thunus-14124722a" target="_blank">Linkedin</a></li>
                    <li class="secondaryList"><a href="https://twitter.com/_popeye_baba_" target="_blank">Twitter</a></li>
                    <li class="secondaryList"><a href="https://www.instagram.com/bastien_thunus/" target="_blank">Instagram</a></li>
                </ul>
            </li>
            <li class="primaryList"><a href="https://bento.me/bastien-thunus" target="_blank">Thunus Bastien</a></li>
            <li class="primaryList"><a href="https://dwt.heaj.be/" target="_blank">DWT</a></li>
            <li class="primaryList">©2023</li>
        </ul>
    </div>
    <!-- <div class="flex justify-center items-end text__line text-[2cqi] h-full text-black">PromptPilot</div> -->
</footer>

</template>

<style lang="scss">

.primaryList{
    @apply text-black/40 font-normal;
}

.secondaryList{
    @apply font-normal text-black/100 not-italic;
}

</style>