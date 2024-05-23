<script setup>
import MainControl from "@/components/MainControl.vue";
import WelcomePage from "@/components/WelcomePage.vue";
import {ref} from "vue";

let audioContext = ref(null);

window.addEventListener("click", async () => {
  audioContext.value = new AudioContext();
});

</script>

<template>
  <div class="app-container">
    <transition name = "fade" mode = "out-in">
      <div v-if="!audioContext" class="welcome-screen">
        <WelcomePage />
      </div>
      <div v-else class="app">
        <MainControl :audioContext="audioContext" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
body, .app-container {
  font-family: "Roboto", sans-serif;
  color: var(--color-dark-blue);
  margin: 0;
  padding: 0;
  background: rgb(34,193,195);
  background: linear-gradient(148deg, rgba(34,193,195,1) 0%, rgba(96,135,197,1) 39%, rgba(158,200,185,1) 100%);
  height: 100vh;
  width: 100vw;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>
