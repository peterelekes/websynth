<script setup>
import {ref, watch} from "vue";
import Panner from "@/util/Panner.js";
import {store} from "@/store/store.js";

const enabled = ref(false);
const deviation = ref(0);
const frequency = ref(0);
let panner;

watch(enabled, (value) => {
  if (value) {
    panner = new Panner(deviation.value, frequency.value);
    store.panner = panner;
  } else {
    store.panner = null;
  }
});

watch(deviation, (value) => {
  if (panner) {
    panner.deviation = value;
  }
});

watch(frequency, (value) => {
  if (panner) {
    panner.frequency = value;
  }
});


</script>

<template>
  <div class="panner">
    <h2>Panner</h2>
    <label>Enabled: <input v-model="enabled" type="checkbox"></label>
    <label>Deviation: <input v-model="deviation" type="range" min="0" max="1" step="0.1"></label>
    {{ deviation }}
    <label>Frequency: <input v-model="frequency" type="range" min="0" max="1" step="0.1"></label>
    {{ frequency }}
  </div>

</template>

<style scoped>

.panner {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="range"] {
  margin-left: 10px;
}

</style>