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
});

watch(Q, (value) => {
  lowPassFilter.Q.value = value;
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
    <label>Enabled: <input v-model="enabled" type="checkbox"></label>
    <label>Frequency: <input v-model="frequency" type="range" min="40" max="1500" step="10"></label>
    {{ frequency }}
    <label>Q: <input v-model="Q" type="range" min="0.1" max="20" step="0.1"></label>
    {{ Q }}
  </div>

</template>

<style scoped>
/* Styles can be added here as needed */
.low-pass-filter {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="range"] {
  margin-left: 10px;
}

</style>