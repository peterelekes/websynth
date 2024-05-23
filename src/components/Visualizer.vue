<template v-if="props.audioContext">
  <canvas ref="canvas" :width="WIDTH" :height="HEIGHT"></canvas>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {store} from "@/store/store.js";
import emitter from "@/mitt.js";

const props = defineProps({
  audioContext: Object,
});


const analyser = props.audioContext.createAnalyser();
analyser.fftSize = 2048;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Float32Array(bufferLength); // Use Float32Array for oscilloscope

const canvas = ref(null);
let canvasCtx = null;
let drawVisual;

const WIDTH = 400;
const HEIGHT = 200;
let isPlaying = ref(false);

emitter.on("playNote", () => {
  isPlaying.value = true;
  visualize(); // Call visualize on playNote event
});

emitter.on("releaseNote", () => {
  isPlaying.value = false;
});

onMounted(() => {
  canvas.value.width = WIDTH;
  canvas.value.height = HEIGHT;
  canvasCtx = canvas.value.getContext("2d"); // Assign after mounted
});

watch(isPlaying, (value) => {
  if (value) {
    drawVisual = requestAnimationFrame(draw);
  } else {
    cancelAnimationFrame(drawVisual);
  }
});

function draw() {
  let lastNode = store.lastNode;
  if (!lastNode) {
    return;
  }

  lastNode.connect(analyser);

  analyser.getFloatTimeDomainData(dataArray);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  // Oscilloscope-like visualization using timeDomainData
  // pink
  canvasCtx.strokeStyle = "rgb(255,62,224)";
  canvasCtx.lineWidth = 3;
  canvasCtx.beginPath();

  const sliceWidth = WIDTH / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] * HEIGHT / 2; // Scale and center the value
    const y = HEIGHT / 2 + v;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.stroke();

  // Schedule the next animation frame only if playing
  if (isPlaying) {
    drawVisual = requestAnimationFrame(draw);
  }
}

const visualize = () => {
  if (isPlaying.value) {
    drawVisual = requestAnimationFrame(draw);
  }

  return () => {
    cancelAnimationFrame(drawVisual);
  };

};
</script>

<style scoped>
canvas {
  display: block;
  margin: 0 auto;
  background-color: var(--color-dark-blue);
  border-radius: 10px;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
</style>
