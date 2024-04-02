<script setup>
import Control from "@/components/Control.vue";
import Keyboard from "@/components/Keyboard.vue";
import Oscillator from "@/components/CustomOscillator.vue";
</script>

<template>
  <Control />
  <Keyboard />
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
