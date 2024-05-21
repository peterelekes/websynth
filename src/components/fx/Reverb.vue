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
    <div class="enabled">
      <input v-model="enabled" type="checkbox">
    </div>
    <div class="reverbUrl">
      <label>Impulse Response:
        <select v-model="reverbUrl">
          <option v-for="impulseResponse in impulseResponses" :key="impulseResponse.url" :value="impulseResponse.url">{{ impulseResponse.name }}</option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped>
.reverb {
  display: grid;
  text-align: center;
}

input[type="checkbox"] {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
}

select {
  width: 100%;
}
</style>
