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
const speed = ref(0.3);
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
    <div class="delay-time">
      <label>Delay {{delayTime * 1000}}<input v-model="delayTime" type="range" min="0.001" max="0.02" step="0.001"></label>
    </div>
    <div class="depth">
      <label>Depth {{depth * 1000}} <input v-model="depth" type="range" min="0.001" max="0.02" step="0.001"></label>
    </div>
    <div class="feedback">
      <label>Feedback {{feedback * 10}} <input v-model="feedback" type="range" min="0" max="1" step="0.1"></label>
    </div>
    <div class="speed">
      <label>Speed {{speed * 10}} <input v-model="speed" type="range" min="0.1" max="1" step="0.1"></label>
    </div>
    <div class="toggle">
      <input type="checkbox" id="flangerToggle" class="toggle-checkbox" v-model="enabled">
      <label for="flangerToggle" class="toggle-label"></label>
    </div>
  </div>
</template>

<style scoped>

.flanger {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 0.5rem;
  text-align: center;
}

h2{
  font-weight: bold;
  font-size: 1.3rem;
  color: var(--color-white);
  -webkit-text-stroke: 1px var(--color-dark-blue);
  text-shadow: 2px 2px 0 var(--color-dark-blue), 4px 4px 0 var(--color-dark-blue);
  margin-bottom: 1rem;
  margin-top: 1rem;
  grid-column: 1 / -1;
}

label {
  font-weight: bold;
  font-size: 1rem;
}

.toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  grid-column: 1 / -1;
}

.toggle-checkbox {
  height: 0;
  width: 0;
  visibility: hidden;
}

.toggle-label {
  cursor: pointer;
  text-indent: -9999px;
  width: 50px;
  height: 25px;
  background: var(--color-grey);
  display: block;
  border-radius: 100px;
  position: relative;
  top: 1px;
}

.toggle-label::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: var(--color-white);
  border-radius: 50%;
  transition: 0.3s;
}

.toggle-checkbox:checked + .toggle-label {
  background: var(--color-white);
}

.toggle-checkbox:checked + .toggle-label::after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

.toggle-checkbox:checked + .toggle-label {
  background: var(--color-dark-blue);
}

.toggle-checkbox:checked + .toggle-label::after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}


input[type="range"] {
  -webkit-appearance: none;
  height: 5px;
  border-radius: 50px;
  border: var(--color-dark-blue) 1px solid;
  background: var(--color-white);
  width: 100%;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--color-dark-blue);
}

input[type="range"]:active::-webkit-slider-thumb {
  cursor: pointer;
  background: var(--color-white);
  border: var(--color-dark-blue) 1px solid;
}

input[type="range"]::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--color-dark-blue);
}

input[type="range"]:hover::-moz-range-thumb {
  background: var(--color-white);
}

input[type="range"]:active::-moz-range-thumb {
  background: var(--color-white-pressed);
}
</style>