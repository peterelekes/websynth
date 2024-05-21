<script setup>
import {ref, watch} from "vue";
import Panner from "@/util/Panner.js";
import {store} from "@/store/store.js";

const props = defineProps({
  audioContext: Object,
});

const enabled = ref(false);
const deviation = ref(0.5);
const frequency = ref(1);
let panner;

watch(enabled, (value) => {
  if (value) {
    panner = new Panner(props.audioContext, deviation.value, frequency.value);
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
    <div class="enabled">
      <input v-model="enabled" type="checkbox">
    </div>
    <div class="deviation">
      <label>Deviation: {{deviation}} <input v-model="deviation" type="range" min="0" max="1" step="0.1"></label>
    </div>
    <div class="frequency">
      <label>Frequency: {{frequency}} <input v-model="frequency" type="range" min="1" max="5" step="0.5"></label>
    </div>
  </div>
</template>

<style scoped>
.panner {
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