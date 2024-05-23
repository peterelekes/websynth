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
    <div class="enabled">
      <input v-model="enabled" type="checkbox">
    </div>
    <div class="intensity">
      <label>Intensity: {{intensity}} <input v-model="intensity" type="range" min="100" max="900" step="1"></label>
    </div>
    <div class="low-pass-frequency">
      <label>Low Pass Frequency: {{lowPassFrequency}} <input v-model="lowPassFrequency" type="range" min="1" max="10000" step="1"></label>
    </div>
  </div>
</template>

<style scoped>
.distortion {
  display: grid;
  text-align: center;
}

.distortion input[type="range"] {
  width: 100%;
}

input[type="checkbox"] {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
}


</style>