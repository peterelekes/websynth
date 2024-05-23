<script setup>
import Flanger from "@/util/Flanger.js";
import {store} from "@/store/store.js";
import {ref, watch} from "vue";

const props = defineProps({
  audioContext: Object,
});

const enabled = ref(false);
const delayTime = ref(0.005);
const depth = ref(0.002);
const feedback = ref(0.5);
const speed = ref(0.25);
let flanger;

watch(enabled, (value) => {
  if (value) {
    flanger = new Flanger(props.audioContext, delayTime.value, depth.value, feedback.value, speed.value);
    store.flanger = flanger;
  } else {
    store.flanger = null;
  }
});

watch(delayTime, (value) => {
  if (enabled.value) {
    store.flanger.nodes['delayNode'].delayTime.value = value;
  }
});

watch(depth, (value) => {
  if (enabled.value) {
    store.flanger.nodes['gainNode'].gain.value = value;
  }
});

watch(feedback, (value) => {
  if (enabled.value) {
    store.flanger.nodes['feedbackGainNode'].gain.value = value;
  }
});

watch(speed, (value) => {
  if (enabled.value) {
    store.flanger.nodes['oscillator'].frequency.value = value;
  }
});

</script>

<template>
  <div class="flanger">
    <h2>Flanger</h2>
    <div class="enabled">
      <input v-model="enabled" type="checkbox">
    </div>
    <div class="delay-time">
      <label>Delay Time: {{delayTime}} <input v-model="delayTime" type="range" min="0.001" max="0.02" step="0.001"></label>
    </div>
    <div class="depth">
      <label>Depth: {{depth}} <input v-model="depth" type="range" min="0.001" max="0.02" step="0.001"></label>
    </div>
    <div class="feedback">
      <label>Feedback: {{feedback}} <input v-model="feedback" type="range" min="0" max="1" step="0.1"></label>
    </div>
    <div class="speed">
      <label>Speed: {{speed}} <input v-model="speed" type="range" min="0.1" max="1" step="0.1"></label>
    </div>
  </div>

</template>

<style scoped>

.flanger {
  display: grid;
  text-align: center;
}

input[type="range"] {
  width: 100%;
}

input[type="checkbox"] {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
}
</style>