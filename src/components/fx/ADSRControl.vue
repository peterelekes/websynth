<script setup>
import {computed, ref, watch} from "vue";
import {store} from "@/store/store.js";

const attack = ref(0.1);
const decay = ref(0.1);
const sustain = ref(0.5);
const release = ref(0.1);
const volume = ref(0.5);

watch(attack, (value) => {
  store.attack = parseFloat(value);
});

watch(decay, (value) => {
  store.decay = parseFloat(value);
});

watch(sustain, (value) => {
  store.sustain = parseFloat(value);
});

watch(release, (value) => {
  store.release = parseFloat(value);
});

watch(volume, (value) => {
  store.volume = parseFloat(value);
});

</script>

<template>
  <div class="adsr-controls">
    <div class="title">
      <h2>ADSR</h2>
    </div>
    <div class="control">
      <label>Attack {{attack}}<input v-model="attack" type="range" min="0.05" max="1" step="0.01"></label>
    </div>
    <div class="control">
      <label>Decay {{decay}}<input v-model="decay" type="range" min="0" max="1" step="0.01" ></label>
    </div>
    <div class="control">
      <label>Sustain {{sustain}}<input v-model="sustain" type="range" min="0" max="1" step="0.01"></label>
    </div>
    <div class="control">
      <label>Release {{release}}<input v-model="release" type="range" min="0" max="1" step="0.01"></label>
    </div>
    <div class="control full-width">
      <label>Volume {{volume}}</label>
      <br>
      <input v-model="volume" type="range" min="0" max="1" step="0.01">
    </div>
  </div>
</template>

<style scoped>
.adsr-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  text-align: center;
  margin: 1rem;
  padding: 1rem;
  background: var(--color-yellow);
  border: var(--color-dark-blue) 1px solid;
  border-radius: 10px;
  -webkit-box-shadow: 1rem 1rem 1rem rgba(0.2, 0.9, 0.5, 0.7);
  height: 30vh;
}
.adsr-controls .title {
  grid-column: span 2;
}

h2 {
  font-weight: bold;
  font-size: 2rem;
  color: var(--color-white);
  -webkit-text-stroke: 1px var(--color-dark-blue);
  text-shadow: 2px 2px 0 var(--color-dark-blue), 4px 4px 0 var(--color-dark-blue), 6px 6px 0 var(--color-dark-blue);
}

label{
  font-weight: bold;
  color: var(--color-dark-blue);
}

.adsr-controls .control {
  grid-column: span 1;
}

.adsr-controls .control.full-width {
  grid-column: span 2;
  input[type="range"] {
    width: 93%;
  }
}

input[type="range"] {
  -webkit-appearance: none;
  width: 85%;
  height: 5px;
  border-radius: 50px;
  border: var(--color-dark-blue) 1px solid;
  background: #ffffff;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--color-dark-blue);
}

input[type="range"]::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: var(--color-dark-blue);
}
</style>