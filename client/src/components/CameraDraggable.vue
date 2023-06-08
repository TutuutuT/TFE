<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

const containerRef = ref(null);
const knobRef = ref(null);
const percentRef = ref('');

let W, H, X, Y, D, BB, Xpercent = 0, Ypercent = 0, snapRatio = 4;

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

</script>


<template>
    <div id='container' ref='containerRef'>
      <div class="origin" id='origin'></div>
      <div class="knob" ref='knobRef'></div>
      <div class="text" id="percent">{{ percentRef }}</div>
    </div>
  </template>


<style scoped lang="scss">

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
    height:250px;
}

.text {
    font-family: customFont, sans-serif;
    font-size:20px;
    color:gray;
    margin:30px;
}

</style>