<script setup>
import {ref, watch} from "vue";
import {store} from "@/store/store.js";
import {Chorus} from "@/util/Chorus.js";

const props = defineProps({
  audioContext: Object,
});

const enabled = ref(false);
const delayTime = ref(0.2);
const detune = ref(0);
let chorus;

watch(enabled, (value) => {
  if (value) {
    chorus = new Chorus(props.audioContext, delayTime.value, detune.value);
    store.chorus = chorus;
  } else {
    store.chorus = null;
  }
});

watch(delayTime, (value) => {
  if (chorus && enabled.value) {
    chorus.delayTime = value;
    chorus = new Chorus(props.audioContext, delayTime.value, detune.value);
    store.chorus = chorus;
  }
});

watch(detune, (value) => {
  if (chorus && enabled.value) {
    chorus.detune = value;
    chorus = new Chorus(props.audioContext, delayTime.value, detune.value);
    store.chorus = chorus;
  }
});
</script>

<template>
  <div class="chorus">
    <h2>Chorus</h2>
    <div class="enabled">
      <input v-model="enabled" type="checkbox">
    </div>
    <div class="delayTime">
      <label>Delay Time: {{delayTime}} <input v-model="delayTime" type="range" min="0.1" max="1" step="0.01"></label>
    </div>
    <div class="detune">
      <label>Detune: {{detune}} <input v-model="detune" type="range" min="-50" max="50" step="1"></label>
    </div>
  </div>
</template>

<style scoped>
.chorus {
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