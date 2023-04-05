<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Card from './components/Card.vue'
</script>

<template>
  
  <section class="component__container">
    
    <HelloWorld msg="Thunus Bastien"/>
    <Card></Card>
    
  </section>

</template>

<style scoped lang="scss">

.component__container{
  width: 100%;
  // max-width: 1280px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
