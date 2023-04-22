<script setup>
  import Card from '../components/Card.vue'
  import intro from '../components/intro.vue';
</script>

<template>

  <section class="w-full h-full">
   <intro></intro>

  </section>
  
  <section class="component__container">
    
    <Card></Card>
    
  </section>

</template>

<style scoped lang="scss">

.component__container{
  width: 100%;
  // max-width: 1280px;
}
</style>
