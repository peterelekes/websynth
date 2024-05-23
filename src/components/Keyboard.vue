<script setup>
import keyMap from "@/util/keyMap.js";
import computerKeyboardMap from "@/util/computerKeyboardMap.js";
import {ref, onMounted, onBeforeUnmount} from "vue";
import emitter from "@/mitt.js";

const pressedKeys = ref([]);
let midiAccess;
const midiDevices = ref([]);
const selectedMidiDevice = ref(null);

function handleKeyDown(event) {
  const key = computerKeyboardMap.get(event.key);
  if (key && !pressedKeys.value.includes(key)) {
    pressedKeys.value.push(key);
    emitter.emit("playNote", key);
  }
}
function handleKeyUp(event) {
  const key = computerKeyboardMap.get(event.key);
  if (key) {
    pressedKeys.value = pressedKeys.value.filter((k) => k !== key);
    emitter.emit("releaseNote", key);
  }
}

function handleMIDIMessage(event) {
  if (event.target !== selectedMidiDevice.value) return;

  const [status, note, velocity] = event.data;
  const key = note;

  if (status === 144 && velocity > 0) { // Note on message
    emitter.emit('playNote', key);
  } else if (status === 128 || (status === 144 && velocity === 0)) { // Note off message
    emitter.emit('releaseNote', key);
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
});

onMounted(async () => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  if (navigator.requestMIDIAccess) {
    try {
      midiAccess = await navigator.requestMIDIAccess();
      midiDevices.value = Array.from(midiAccess.inputs.values());
      selectedMidiDevice.value = midiDevices.value[0];
      for (let input of midiDevices.value) {
        input.onmidimessage = handleMIDIMessage;
      }
    } catch (err) {
      console.error("No access to MIDI devices: " + err);
    }
  } else {
    console.error("Browser does not support WebMIDI!");
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
  if (midiAccess) {
    for (let input of midiDevices.value) {
      input.onmidimessage = null;
    }
  }
});
</script>

<template>
  <div class="keyboard">
    <div v-for="key in keyMap"
         :key="key.note"
         class="key"
         :class="{ white: key.white, black: !key.white, active: pressedKeys.includes(key.note) }"
         @mousedown="emitter.emit('playNote', key.note); pressedKeys.push(key.note)"
        @mouseup="emitter.emit('releaseNote', key.note); pressedKeys = pressedKeys.filter((k) => k !== key.note)"
    >
      <span>{{ key.name }}</span>
    </div>
  </div>
  <label v-if="midiDevices.length > 0">MIDI Device:
    <select v-model="selectedMidiDevice">
      <option v-for="device in midiDevices" :key="device.id" :value="device">{{ device.name }}</option>
    </select>
  </label>
</template>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: row;
}

span {
  font-size: 0.8em;
  text-align: center;

}

.key {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border: 1px var(--color-key-border) solid;
  border-radius: 0 0 5px 5px;
}

.white {
  background-color: var(--color-key-white);
  width: var(--key-width);
  height: var(--key-height);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
.white:hover {
  background-color: var(--color-key-white-hover);
}
.white.active {
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
.black.active {
  background-color: var(--color-key-black-pressed);
}
@keyframes keyPress {
  0% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.02) translateY(1px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}
.active {
  animation: keyPress 0.2s linear;
}


</style>
