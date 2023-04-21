<script>

  export default {
    methods: {
      redirect() {
        this.$router.push({ name: 'Home' })
      },
      back() {
        this.$router.go(-1)
      },
      forward() {
        this.$router.go(1)
      }
    }
  }

</script>

<template>
  
  <!-- <div class="nav">
    <router-link :to=" { name: 'Home'}">Home</router-link>
    <router-link :to=" { name: 'About'}">About</router-link>
  </div> -->

  <button @click="redirect">Home</button>
  <button @click="back">Back</button>
  <button @click="forward">Forward</button>
  
  <router-view/>

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
