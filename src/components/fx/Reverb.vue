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
    store.reverb = reverb;
  }
  else {
    store.reverb = null;
  }
});

watch(reverbUrl, (value) => {
  if (reverb) {
    reverb.reverbUrl = value;
  }
});


</script>

<template>
  <div class="reverb">
    <h2>Reverb</h2>
    <label>Enabled: <input v-model="enabled" type="checkbox"></label>
    <label>Impulse Response:
      <select v-model="reverbUrl">
        <option v-for="impulseResponse in impulseResponses" :key="impulseResponse.url" :value="impulseResponse.url">{{ impulseResponse.name }}</option>
      </select>
    </label>
  </div>
</template>

