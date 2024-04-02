<script setup>
import keyMap from "@/util/keyMap.js";
</script>

<template>
  <div class="keyboard">
    <!-- Render white keys -->
    <div v-for="key in keyMap" :key="key.note" class="key" :class="{ white: key.white, black: !key.white }">
      {{ key.name }}
    </div>
  </div>
</template>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: row;
}

.key {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 5px;
  align-items: center;
  border: 1px var(--color-key-border) solid;
}

.white {
  background-color: var(--color-key-white);
  width: var(--key-width);
  height: var(--key-height);
}
.white:hover {
  background-color: var(--color-key-white-hover);
}
.white:active {
  background-color: var(--color-key-white-pressed);
}

.black {
  background-color: var(--color-key-black);
  color: white;
  height: calc(var(--key-height) * 0.6);
  width: calc(var(--key-width) * 0.6);
  z-index: 1;
  margin-left: calc(var(--key-width) * -0.3);
  margin-right: calc(var(--key-width) * -0.3);
}
.black:hover {
  background-color: var(--color-key-black-hover);
}
.black:active {
  background-color: var(--color-key-black-pressed);
}

.key:active {
  animation: keyPress 0.2s ease-in;
}

@keyframes keyPress {
  0% {
    transform: translateY(0);
    scale: 1;
  }
  50% {
    transform: translateY(1px);
    scale: 1.02;
  }
  100% {
    transform: translateY(0);
    scale: 1;
  }
}
</style>
