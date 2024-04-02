<template>
  <div class="controls">
    <h2>Controls</h2>
    <div class="oscillator-controls">
      <h3>Oscillator</h3>
      <div>
        <label for="waveform">Waveform:</label>
        <select id="waveform" v-model="selectedWaveform">
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
    </div>
    <!-- Add other controls here as needed -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedWaveform: 'sine',
      volume: 0.5 // Default volume set to 50%
    };
  }
};
</script>

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
