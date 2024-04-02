<script setup>
import { ref } from "vue";
import CustomOscillator from "./CustomOscillator.vue";

const volume = ref(0.5);
const type = ref("sine");
const showOscillator = ref(false); // Control the visibility of Oscillator component

function toggleOscillator() {
  showOscillator.value = !showOscillator.value;
}
</script>

<template>
  <div class="controls">
    <h2>Controls</h2>
    <div class="oscillator-controls">
      <h3>Oscillator</h3>
      <div>
        <label for="waveform">Waveform:</label>
        <select id="waveform" v-model="type">
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Sawtooth</option>
        </select>
      </div>
      <div>
        <label for="volume">Volume:</label>
        <input id="volume" type="range" v-model="volume" min="0" max="1" step="0.01">
      </div>
      <button @click="toggleOscillator">Toggle Oscillator</button> <!-- Button to toggle oscillator -->
    </div>
    <!-- Add other controls here as needed -->

    <!-- Render Oscillator component only if showOscillator is true -->
    <CustomOscillator v-if="showOscillator" :type="type" :volume="volume"/>
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
