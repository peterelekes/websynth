<script setup>
import { ref } from "vue";
import {store} from "@/store/store.js";
import {OscillatorProperties} from "@/util/OscillatorProperties.js";

const oscillators = ref([]);

function removeOscillator(index) {
  oscillators.value.splice(index, 1);
}

function addOscillator() {
  if(oscillators.value.length) {
    const lastOscillator = oscillators.value[oscillators.value.length - 1];
    oscillators.value.push(new OscillatorProperties(lastOscillator.detune, lastOscillator.frequency, lastOscillator.gain, lastOscillator.type));
  } else {
    oscillators.value.push(new OscillatorProperties(0, 440, 0.5, "sine"));
  }
}

store.oscillators = oscillators.value;
</script>

<template>
  <div class="oscillator-controls">
    <h2>Oscillator Controls</h2>
    <button @click="addOscillator">Add Oscillator</button>
    <div v-for="(oscillator, index) in oscillators" :key="index">
      <h3>Oscillator {{ index + 1 }}</h3>
      <label>Type:
        <select v-model="oscillator.type">
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      </label>
      <label>Gain: <input v-model="oscillator.gain" type="range" min="0" max="1" step="0.01"></label>
      <label>Detune: <input v-model="oscillator.detune" type="range" min="-1200" max="1200" step="1"></label>
      <button @click="removeOscillator(index)">Remove Oscillator</button>
    </div>
  </div>
</template>

<style scoped>
/* Styles can be added here as needed */
.oscillator-controls {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

select, input[type="range"] {
  margin-left: 10px;
}
</style>