<script setup>
import {ref, watch, onMounted} from "vue";
import {store} from "@/store/store.js";

const props = defineProps({
  audioContext: Object,
});

const enabled = ref(false);
const audioContext = props.audioContext;
const lowPassFilter = audioContext.createBiquadFilter();
const frequency = ref(440);
const Q = ref(1);

watch(frequency, (value) => {
  lowPassFilter.frequency.value = value;
  if (enabled.value) {
    store.lowPassFilter = lowPassFilter;
  }
});

watch(Q, (value) => {
  lowPassFilter.Q.value = value;
  if (enabled.value) {
    store.lowPassFilter = lowPassFilter;
  }
});

watch(enabled, (value) => {
  if (value) {
    store.lowPassFilter = lowPassFilter;
  } else {
    store.lowPassFilter = null;
  }
});

onMounted(() => {
  lowPassFilter.type = "lowpass";
  lowPassFilter.frequency.value = frequency.value;
  lowPassFilter.Q.value = Q.value;
});

</script>

<template>
  <div class="low-pass-filter">
    <h2>Low Pass Filter</h2>
    <div class="enabled">
      <input v-model="enabled" type="checkbox">
    </div>
    <div class="frequency">
      <label>Frequency: {{frequency}} <input v-model="frequency" type="range" min="40" max="1500" step="10"></label>
    </div>
    <div class="quality">
      <label>Quality {{Q}}<input v-model="Q" type="range" min="0.1" max="10" step="0.1"></label>
    </div>
  </div>

</template>

<style scoped>
.low-pass-filter {
  display: grid;
  text-align: center;
}

input[type="checkbox"] {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
}

input[type="range"] {
  width: 100%;
}

</style>