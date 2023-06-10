<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

const containerRef = ref(null);
const knobRef = ref(null);
const percentRef = ref('');

let W, H, X, Y, D, BB, Xpercent = 50, Ypercent = 50, snapRatio = 4;

function drag() {
  if (!containerRef.value) return;

  BB = containerRef.value.getBoundingClientRect();
  W = BB.width - 30;
  H = BB.height - 30;
  calcXY(Xpercent, Ypercent);
  gsap.set(knobRef.value, { x: X, y: Y });
  D[0].applyBounds({ minX: 0, minY: 0, maxX: W, maxY: H });
  calcXY(Xpercent, Ypercent);
}

function Percent(x, y) {
  Xpercent = Math.round((x / W) * 100);
  Ypercent = Math.round((y / H) * 100);
  const setting = convertToSetting(Xpercent, Ypercent);
  percentRef.value = `${setting}`;
  calcXY(Xpercent, Ypercent);
}

function calcXY(Xp, Yp) {
  X = Math.round((Xp / 100) * W);
  Y = Math.round((Yp / 100) * H);
}

onMounted(() => {
  D = Draggable.create(knobRef.value, {
    throwProps: true,
    onDrag() {
      Percent(this.x, this.y);
    },
    onThrowUpdate() {
      Percent(this.x, this.y);
    },
    liveSnap: true,
    snap: {
      x(endValue) {
        return Math.round(endValue / (W / snapRatio)) * (W / snapRatio);
      },
      y(endValue) {
        return Math.round(endValue / (H / snapRatio)) * (H / snapRatio);
      },
    },
  });

  window.addEventListener('resize', drag);
  drag();
});

const settingsCamera = [
  { name: 'Extreme Low-angle', xRange: [48, 52], yRange: [98, 100] },
  { name: 'Low-angle', xRange: [48, 52], yRange: [73, 77] },
  { name: 'Eye-Level', xRange: [48, 52], yRange: [48, 52] },
  { name: 'High-angle', xRange: [48, 52], yRange: [23, 27] },
  { name: 'Extreme High-angle', xRange: [48, 52], yRange: [0, 2] },
  { name: 'Bird-eye', xRange: [98, 100], yRange: [0, 2] },
  { name: 'Side-angle', xRange: [98, 100], yRange: [48, 52] },
  { name: 'Back-angle', xRange: [0, 2], yRange: [48, 52] }
  ]

  function convertToSetting(Xpercent, Ypercent) {
  for (const option of settingsCamera) {
    const { xRange, yRange, name } = option;
    if (
      Xpercent >= xRange[0] &&
      Xpercent <= xRange[1] &&
      Ypercent >= yRange[0] &&
      Ypercent <= yRange[1]
    ) {
      return name;
    }
  }
  return ''; // Réglage par défaut si aucune correspondance n'est trouvée
}

// onUnmounted(() => {
//   window.removeEventListener('resize', drag);
//   D[0].kill();
// });

const emits = defineEmits(['button-click']);

const handleClick = () => {
  emits('button-click', percentRef);
}

</script>


<template>
  <div>
    <div class="text-xs text-white/80 absolute w-[calc(100%-31px)] h-[calc(100%-206px)] -z-30 grid grid-cols-3 grid-rows-5 cursor-none items-center">
      <span class="h-[50%] w-[calc(100%-1px)] absolute top-0 border-b-2 opacity-10"></span>
      <span class="h-full w-[50%] absolute top-0 border-r-2 opacity-10"></span>
      <div class="text-center col-start-2 col-span-1 p-2">Extreme High-angle</div>
      <div class="text-right col-start-3 col-span-1 p-2">Bird-eye</div>
      <div class="text-center col-start-2 col-span-1 p-2">High-angle</div>
      <div class="text-left col-start-1 col-span-1 p-2">Back-angle</div>
      <div class="text-center col-start-2 col-span-1 p-2 ">Eye-level</div>
      <div class="text-right col-start-3 col-span-1 p-2">Side-angle</div>
      <div class="text-center col-start-2 col-span-1 p-2">Low-angle</div>
      <div class="text-center col-start-2 col-span-1 p-2">Extreme Low-angle</div>
    </div>

    <div id='container' ref='containerRef' class="mt-4 z-30">
      <div class="origin" id='origin'></div>
      <div class="knob" ref='knobRef' @mouseover="handleClick"></div>
    </div>
  </div>
    
  </template>


<style lang="scss">

.knob {
    background-image: url(../assets/CameraIcon.png);
    background-size: cover;
    width: 30px;
    height: 30px;
    margin:0px;
}

#container {
    @apply rounded-xl border-white/40 border-2 bg-neutral-900/10;
    width:100%;
    height:350px;
}

.text {
    font-family: customFont, sans-serif;
    font-size:20px;
    color:gray;
    margin:30px;
}

</style>