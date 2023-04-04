<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>

  <div class="content__container">
    <div class="text__line">PromptPilot</div>
  </div>

  <h2>{{ msg }}</h2>

</template>

<style scoped lang="scss">

  .content-container {
  text-align: center;
}

.text__line {
  font-variation-settings: "wght" 100, "ital" 0;
  font-family: Oddval Variable;
  font-size: 10vh;
  line-height: 80%;
  color: #ffffff;
  white-space: nowrap;

  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-name: change;
  transition-timing-function: ease;

  
}

@keyframes change {
  0% {
    font-variation-settings: "wght" 100, "ital" 0;
  }

  25% {
    font-variation-settings: "wght" 900, "ital" 0;
  }

  50% {
    font-variation-settings: "wght" 900, "ital" 1;
  }

  75% {
    font-variation-settings: "wght" 100, "ital" 1;
  }

  100% {
    font-variation-settings: "wght" 100, "ital" 0;
  }
}
</style>
