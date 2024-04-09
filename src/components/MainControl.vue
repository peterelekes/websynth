<script setup>
import {onMounted, onBeforeUnmount, ref, watch} from "vue";
import emitter from "@/mitt.js";
import {store} from "@/store/store.js";
import OscillatorNote from "@/util/OscillatorNote.js";
import {NoteProperties} from "@/util/NoteProperties.js";
import {OscillatorProperties} from "@/util/OscillatorProperties.js";
import Visualizer from "@/components/Visualizer.vue";

let audioContext;
let playingNotes = [];
const attack = ref(0.1);
const decay = ref(0.1);
const sustain = ref(0.5);
const release = ref(0.1);
const volume = ref(0.5);
let velocity = 0.2;
let noteProperties = new NoteProperties(attack.value, decay.value, sustain.value, release.value);


function initAudioContext() {
  audioContext = new AudioContext();
  const masterGain = audioContext.createGain();
  masterGain.gain.value = volume.value;
}

function getFrequency(key) {
  return Math.pow(2, (key - 69) / 12) * 440;
}

onMounted(() => {
  emitter.on("playNote", (key) => {
    if(store.oscillators.length === 0) {
      return;
    }
    if (!audioContext) {
      initAudioContext();
    }
    let oscillatorProperties = [];
    store.oscillators.forEach((oscillator) => {
      oscillatorProperties.push(new OscillatorProperties(oscillator.detune, getFrequency(key), oscillator.gain, oscillator.type));
    });
    noteProperties = new NoteProperties(parseFloat(attack.value), parseFloat(decay.value), parseFloat(sustain.value), parseFloat(release.value));
    playingNotes.push(new OscillatorNote(audioContext, noteProperties, oscillatorProperties, velocity+parseFloat(volume.value)));
  });
  emitter.on("releaseNote", (key) => {
    playingNotes = playingNotes.filter((note) => {
      if (Math.round(note.oscillators[0].frequency.value) === Math.round(getFrequency(key))) {
        note.releaseNote();
        return false;
      }
      return true;
    });
  });
});

onBeforeUnmount(() => {
  emitter.off("playNote");
});
</script>

<template>
  <div class="adsr-controls">
    <h2>ADSR Controls</h2>
    <label>Attack: <input v-model="attack" type="range" min="0.05" max="1" step="0.01"></label>
    <label>Decay: <input v-model="decay" type="range" min="0" max="1" step="0.01"></label>
    <label>Sustain: <input v-model="sustain" type="range" min="0" max="1" step="0.01"></label>
    <label>Release: <input v-model="release" type="range" min="0" max="1" step="0.01"></label>
    <label>Volume: <input v-model="volume" type="range" min="0" max="1" step="0.01"></label>
  </div>
</template>

<style scoped>
/* Styles can be added here as needed */
.adsr-controls {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="range"] {
  margin-left: 10px;
}
</style>