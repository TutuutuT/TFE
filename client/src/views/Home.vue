<script setup>
  import Card from '../components/Card.vue'
  import intro from '../components/intro.vue';
  import Footer from '../components/Footer.vue';
  import { onMounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/all';
  gsap.registerPlugin(ScrollTrigger);

  onMounted(() => {
    gsap.from(".icon-appear", {
      y: 100,
      x: 100,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: ".cards",
        start: "10% top",
        toggleActions: "play pause none reverse"
      }
});
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<template>

  <section class="w-full h-full">
   <intro></intro>

  </section>
  
  <section class="component__container">
    
    <Card></Card>
    <Footer/>
    
  </section>
  <div @click="scrollToTop" class="icon-appear fixed bottom-3 right-3 h-12 w-12 bg-[url('./assets/icon.jpg')] hover:bg-[url('./assets/PromptPilot-up.jpg')] bg-cover border-2 border-white/40 rounded-xl cursor-pointer transition-all"></div>

</template>

<style scoped lang="scss">

.component__container{
  width: 100%;
  // max-width: 1280px;
}
</style>
