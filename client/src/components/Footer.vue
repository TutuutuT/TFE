<script setup>

import { gsap } from 'gsap';

</script>

<template>
<h2 class="text-center mb-52 py-20 font-secondary text-white/20 font-bold bg-[#121212] rounded-b-[50px] relative">PromptPilot</h2>
<footer class="h-[35svh] font-semibold bg-white flex pb-8  fixed bottom-0 w-full items-end -z-50">
    <div class="text-lg w-full">
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