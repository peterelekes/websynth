<script setup>
import {ref, watch} from "vue";
import {store} from "@/store/store.js";
import {Distortion} from "@/util/Distortion.js";

const props = defineProps({
  audioContext: Object,
});

const enabled = ref(false);
const intensity = ref(300);
const lowPassFrequency = ref(1000);
let distortion;

watch(enabled, (value) => {
  if (value) {
    distortion = new Distortion(props.audioContext, intensity.value, lowPassFrequency.value);
    store.distortion = distortion;
  } else {
    store.distortion = null;
  }
});

watch(intensity, (value) => {
  if (distortion && enabled.value) {
    distortion.intensity = value;
    store.distortion.makeDistortionCurve(value);
  }
});

watch(lowPassFrequency, (value) => {
  if (distortion && enabled.value) {
    distortion.lowPassFrequency = value;
    store.distortion.nodes['lowPassFilter'].frequency.value = value;
  }
});

</script>

<template>
  <div class="distortion">
    <h2>Distortion</h2>
    <div class="intensity">
      <label>Intensity {{intensity}} <input v-model="intensity" type="range" min="100" max="900" step="1"></label>
    </div>
    <div class="low-pass-frequency">
      <label>Frequency {{lowPassFrequency}} <input v-model="lowPassFrequency" type="range" min="1" max="10000" step="1"></label>
    </div>
    <div class="toggle">
      <input type="checkbox" id="distortionToggle" class="toggle-checkbox" v-model="enabled">
      <label for="distortionToggle" class="toggle-label"></label>
    </div>
  </div>
</template>

<style scoped>
.distortion {
  display: grid;
  text-align: center;
}


h2{
  font-weight: bold;
  font-size: 2rem;
  color: var(--color-white);
  -webkit-text-stroke: 1px var(--color-dark-blue);
  text-shadow: 2px 2px 0 var(--color-dark-blue), 4px 4px 0 var(--color-dark-blue);
  margin-bottom: 1rem;
  margin-top: 1rem;
}

label {
  font-weight: bold;
  font-size: 1.2rem;
}

.toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
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