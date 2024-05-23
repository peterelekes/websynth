<script setup>
import {ref, watch} from "vue";
import {store} from "@/store/store.js";
import {Reverb} from "@/util/Reverb.js";

const props = defineProps({
  audioContext: Object,
});

//TODO: Add other files, these are long and loud
//https://www.openairlib.net/
let impulseResponses = [
  {name: "Cathedral", url: "/impulse_response/cathedral.wav"},
  {name: "Reactor", url: "/impulse_response/reactor.wav"},
  {name: "Forest", url: "/impulse_response/forest.wav"},
  {name: "Silo", url: "/impulse_response/silo.m4a"},
];
const enabled = ref(false);
const reverbUrl = ref("/impulse_response/cathedral.wav");
let reverb;

watch(enabled, (value) => {
  if (value) {
    reverb = new Reverb(props.audioContext, reverbUrl.value);
    store.reverb = reverb.convolver;
  } else {
    store.reverb = null;
  }
});

watch(reverbUrl, (value) => {
  if (reverb && enabled.value) {
    reverb.reverbUrl = value;
    reverb = new Reverb(props.audioContext, reverbUrl.value);
    store.reverb = reverb.convolver;
  }
});


</script>
<template>
  <div class="reverb">
    <h2>Reverb</h2>
    <div class="reverbUrl">
      <label>Impulse Response
        <select v-model="reverbUrl">
          <option v-for="impulseResponse in impulseResponses" :key="impulseResponse.url" :value="impulseResponse.url">{{ impulseResponse.name }}</option>
        </select>
      </label>
    </div>
    <div class="toggle">
      <input type="checkbox" id="reverbToggle" class="toggle-checkbox" v-model="enabled">
      <label for="reverbToggle" class="toggle-label"></label>
    </div>
  </div>
</template>

<style scoped>
.reverb {
  display: grid;
  text-align: center;
}

select{
  -webkit-appearance: none;
  border-radius: 5px;
  width: 75%;
  border: var(--color-dark-blue) 1px solid;
  background: var(--color-white);
  outline: none;
  transform: translateY(0.4rem);
  text-align-last: center;
}

h2{
  font-weight: bold;
  font-size: 1.3rem;
  color: var(--color-white);
  -webkit-text-stroke: 1px var(--color-dark-blue);
  text-shadow: 2px 2px 0 var(--color-dark-blue), 4px 4px 0 var(--color-dark-blue);
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  font-size: 1rem;
}

.toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  transform: translateY(1rem);
}

.toggle-checkbox {
  height: 0;
  width: 0;
  visibility: hidden;
}

.toggle-label {
  cursor: pointer;
  text-indent: -9999px;
  width: 50px;
  height: 25px;
  background: var(--color-grey);
  display: block;
  border-radius: 100px;
  position: relative;
  top: 1px;
}

.toggle-label::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: var(--color-white);
  border-radius: 50%;
  transition: 0.3s;
}

.toggle-checkbox:checked + .toggle-label {
  background: var(--color-white);
}

.toggle-checkbox:checked + .toggle-label::after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

.toggle-checkbox:checked + .toggle-label {
  background: var(--color-dark-blue);
}

.toggle-checkbox:checked + .toggle-label::after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
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
</style>
