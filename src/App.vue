<script setup>
import Keyboard from "@/components/Keyboard.vue";
import OscillatorConrol from "@/components/OscillatorConrol.vue";
import MainControl from "@/components/MainControl.vue";
import {ref} from "vue";
import Visualizer from "@/components/Visualizer.vue";

let audioContext = ref(null);

window.addEventListener("click", async () => {
  audioContext.value = new AudioContext();
});

</script>

<template>
  <MainControl v-if="audioContext" :audioContext="audioContext" />
  <OscillatorConrol />
  <Keyboard />
  <visualizer v-if="audioContext" :audioContext="audioContext" />
</template>

<style scoped>
body {
  font-family: "Expressway Rg", sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
