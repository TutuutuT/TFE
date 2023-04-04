<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="bck__image">
  </div>
  
  <section class="component__container">
    
    <div>
      <a href="https://www.figma.com/file/R6Cv9zzaK4q2S8b2SptcED/TFE?node-id=0%3A1&t=kPxfIydYeeTxbvc5-1" target="_blank">
        <img src="./assets/Figma-logo.svg" class="logo" alt="Vite logo" />
      </a>
    </div>
    
    <HelloWorld msg="Thunus Bastien" />
    
  </section>

</template>

<style scoped lang="scss">

.bck__image{
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -99;
  // background-image: url(./assets/Rectangle.jpg);
  background: cover;
}

.component__container{
  width: 100%;
  place-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  // background: rgba(255, 255, 255, 0.01);
  // border: 1px solid rgba(255, 255, 255, 0.4);
  // backdrop-filter: blur(17.5px);
  // border-radius: 20px;
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
