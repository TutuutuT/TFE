<script setup>
  import Card from '../components/Card.vue'
  import intro from '../components/intro.vue';
  import Footer from '../components/Footer.vue';

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
  <!-- <div @click="scrollToTop" class="icon-appear fixed bottom-3 right-3 h-12 w-12 bg-[url('./assets/images/icon.jpg')] hover:bg-[url('./assets/images/PromptPilot-up.jpg')] bg-cover border-2 border-white/40 rounded-xl cursor-pointer transition-all"></div> -->

</template>

<style scoped lang="scss">

.component__container{
  width: 100%;
}
</style>
