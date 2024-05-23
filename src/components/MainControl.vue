<script setup>
import {onMounted, onBeforeUnmount, watch} from "vue";
import emitter from "@/mitt.js";
import {store} from "@/store/store.js";
import OscillatorNote from "@/util/OscillatorNote.js";
import {NoteProperties} from "@/util/NoteProperties.js";
import {OscillatorProperties} from "@/util/OscillatorProperties.js";
import Effects from "@/components/Effects.vue";
import Visualizer from "@/components/Visualizer.vue";
import OscillatorConrol from "@/components/OscillatorControl.vue";
import Keyboard from "@/components/Keyboard.vue";
import ADSRControl from "@/components/fx/ADSRControl.vue";

const props = defineProps({
  audioContext: Object,
});

const audioContext = props.audioContext;
let playingNotes = [];
let noteProperties = null;
let attack = store.attack;
let decay = store.decay;
let sustain = store.sustain;
let release = store.release;
let volume = store.volume;
let highPassFilter = store.highPassFilter;
let lowPassFilter = store.lowPassFilter;
let panner = store.panner;
let reverb = store.reverb;
let chorus = store.chorus;
let distortion = store.distortion;
let flanger = store.flanger;
let effectOrder = store.effectOrder;

watch(() => store.attack, (value) => {
  attack = value;
});

watch(() => store.decay, (value) => {
  decay = value;
});

watch(() => store.sustain, (value) => {
  sustain = value;
});

watch(() => store.release, (value) => {
  release = value;
});

watch(() => store.volume, (value) => {
  volume = value;
});

watch(() => store.highPassFilter, (value) => {
  highPassFilter = value;
});

watch(() => store.lowPassFilter, (value) => {
  lowPassFilter = value;
});

watch(() => store.panner, (value) => {
  panner = value;
});

watch(() => store.reverb, (value) => {
  reverb = value;
});

watch(() => store.chorus, (value) => {
  chorus = value;
});

watch(() => store.distortion, (value) => {
  distortion = value;
});

watch(() => store.flanger, (value) => {
  flanger = value;
});

watch(() => store.effectOrder, (value) => {
  effectOrder = value;
});

function getFrequency(key) {
  return Math.pow(2, (key - 69) / 12) * 440;
}

onMounted(() => {
  emitter.on("playNote", (key) => {
    if(store.oscillators.length === 0) {
      return;
    }
    let oscillatorProperties = [];
    store.oscillators.forEach((oscillator) => {
      oscillatorProperties.push(
          new OscillatorProperties(
              oscillator.detune,
              getFrequency(key),
              oscillator.gain,
              oscillator.type
          )
      );
    });
    noteProperties = new NoteProperties(
        attack,
        decay,
        sustain,
        release,
        highPassFilter,
        lowPassFilter,
        panner,
        reverb,
        chorus,
        distortion,
        flanger,
        effectOrder
    );
    playingNotes.push(
        new OscillatorNote(
            audioContext,
            noteProperties,
            oscillatorProperties,
            volume / store.oscillators.length
        )
    );
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
  <div class="page">
    <div class="adsr-oscillator">
      <div class="adsr">
        <ADSRControl/>
      </div>
      <div class="oscillator">
        <OscillatorConrol/>
      </div>
    </div>
    <div class="effects">
      <Effects :audioContext="audioContext"/>
    </div>
    <div class="keyboard-visualizer">
      <div class="keyboard">
        <Keyboard/>
      </div>
      <div class="visualizer">
        <Visualizer :audioContext="audioContext"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page{
  display: flex;
  flex-direction: column;
}

.adsr-oscillator {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 25vh;
  margin: 1rem 1rem 0;
}

.effects {
  margin: 1rem;
  height: 30vh;
}

.keyboard-visualizer {
  display: grid;
  grid-template-columns: 70% 30%;
  margin: 1rem;
}

.keyboard {
  margin: 0 1rem;
}

</style>