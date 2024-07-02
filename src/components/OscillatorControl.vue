<script setup>
import {onMounted, ref} from "vue";
import {store} from "@/store/store.js";
import {OscillatorProperties} from "@/util/OscillatorProperties.js";
import {Icon} from "@iconify/vue";

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

onMounted(() => {
  addOscillator();
});

</script>

<template>
  <div class="oscillator-controls">
    <h2>OSCILLATORS</h2>
    <div v-for="(oscillator, index) in oscillators" :key="index" class="list-item">
        <select v-model="oscillator.type">
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      <label> Gain {{oscillator.gain}}
        <input v-model="oscillator.gain" type="range" min="0" max="1" step="0.01">
      </label>
      <label> Detune {{oscillator.detune}}
        <input v-model="oscillator.detune" type="range" min="-50" max="50" step="1">
      </label>
      <Icon
          icon="material-symbols:delete-rounded"
          @click="removeOscillator(index)"
          class="delete-button"
          height="25px"
          width="25px"
      />
    </div>
    <Icon
        icon="material-symbols:add-circle-rounded"
        @click="addOscillator"
        class="add-button"
        height="25px"
        width="25px"
    />
  </div>
</template>

<style scoped>
.oscillator-controls {
  text-align: center;
  margin: 1rem;
  padding: 1rem;
  background: var(--color-orange);
  border: var(--color-dark-blue) 1px solid;
  border-radius: 10px;
  -webkit-box-shadow: 1rem 1rem 1rem rgba(0.2, 0.9, 0.5, 0.7);
  overflow-y: auto; /* Add this line to make the div scrollable */
  height: 25vh;
  max-height: 25vh
}

h2 {
  font-weight: bold;
  font-size: 3rem;
  color: var(--color-white);
  -webkit-text-stroke: 1px var(--color-dark-blue);
  text-shadow: 2px 2px 0 var(--color-dark-blue), 4px 4px 0 var(--color-dark-blue), 6px 6px 0 var(--color-dark-blue);
  margin-bottom: 1rem;
}

.list-item {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 2%;
  justify-items: center;
  align-items: center;
  margin: 1rem;
}

label {
  font-weight: bold;
  font-size: 1.2rem;
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

select{
  -webkit-appearance: none;
  border-radius: 5px;
  width: 75%;
  height: 50%;
  border: var(--color-dark-blue) 1px solid;
  background: var(--color-white);
  outline: none;
  transform: translateY(0.4rem);
  text-align-last: center;
  font-size: 1.2rem;
}

.delete-button,.add-button {
  cursor: pointer;
  color: var(--color-dark-blue);
  justify-self: center;
  align-self: center;
  &:hover {
    color: var(--color-white);
  }
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-orange-pressed);
  border-radius: 10px;
  border: var(--color-dark-blue) 1px solid;
}

::-webkit-scrollbar-thumb {
  background: var(--color-white);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-white-pressed);
}

::-webkit-scrollbar-thumb:active {
  background: var(--color-white-pressed);
}
</style>