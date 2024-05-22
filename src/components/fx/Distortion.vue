<script setup>
import {ref, watch} from "vue";
import {store} from "@/store/store.js";
import {Distortion} from "@/util/Distortion.js";

const props = defineProps({
  audioContext: Object,
});

const enabled = ref(false);
const amount = ref(5);
const intensity = ref(10);
let distortion;

watch(enabled, (value) => {
  if (value) {
    distortion = new Distortion(props.audioContext, amount.value, intensity.value);
    store.distortion = distortion;
  } else {
    store.distortion = null;
  }
});

watch(amount, (value) => {
  if (distortion && enabled.value) {
    distortion.amount = value;
    distortion = new Distortion(props.audioContext, amount.value, intensity.value);
    store.distortion = distortion;
  }
});

watch(intensity, (value) => {
  if (distortion && enabled.value) {
    distortion.intensity = value;
    distortion = new Distortion(props.audioContext, amount.value, intensity.value);
    store.distortion = distortion;
  }
});

</script>

<template>
  <div class="distortion">
    <h2>Distortion</h2>
    <div class="enabled">
      <input v-model="enabled" type="checkbox">
    </div>
    <div class="amount">
      <label>Amount: {{amount}} <input v-model="amount" type="range" min="1" max="10" step="1"></label>
    </div>
    <div class="intensity">
      <label>Intensity: {{intensity}} <input v-model="intensity" type="range" min="1" max="10" step="1"></label>
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