<script setup>
import {ref, reactive} from "vue";
import {store} from "@/store/store.js";

let presets = reactive([
  { name: "Preset 1", value: "/presets/preset1.json" },
  { name: "Upload", value: "upload" },
]);


const selectedPreset = ref("/presets/preset1.json");

const loadPresetFromJson = (data) => {
      store.attack = data.attack;
      store.decay = data.decay;
      store.sustain = data.sustain;
      store.release = data.release;
      store.volume = data.volume;
      store.oscilators = data.oscilators;
      store.highPassFilter = data.highPassFilter;
      store.lowPassFilter = data.lowPassFilter;
      store.panner = data.panner;
      store.reverb = data.reverb;
      store.chorus = data.chorus;
      store.distortion = data.distortion;
      store.flanger = data.flanger;
      store.effectOrder = data.effectOrder;
}

const handlePresetChange = (event) => {
  if (event.target.value === 'upload') {
    uploadPreset();
  }
  else {
    selectedPreset.value = event.target.value;
    fetch(event.target.value)
      .then(response => response.json())
      .then(data => {
        loadPresetFromJson(data);
      });
  }
};

const savePreset = () => {
  const jsonOutput = JSON.stringify(store);
  const blob = new Blob([jsonOutput], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${selectedPreset.value}.json`;
  link.click();
};

const uploadPreset = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  input.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        loadPresetFromJson(data); // Load the preset data
        selectedPreset.value = URL.createObjectURL(file); // Update selected preset
      } catch (error) {
        console.error("Error parsing uploaded preset:", error);
      }
    };
  });

  input.click();
};


</script>

<template>
  <div class="presets">
    <h2>Presets</h2>
    <div class="preset-select">
      <label for="preset-select">Select Preset</label>
      <select id="preset-select" @change="handlePresetChange">
        <option v-for="preset in presets" :value="preset.value">{{preset.name}}</option>
      </select>
      <button @click="savePreset">Save Preset</button>
    </div>
  </div>
</template>

<style scoped>

</style>