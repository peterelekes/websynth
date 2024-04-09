<script setup>
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  audioContext: Object,
  oscillators: Array,
});

let audioContext = props.audioContext;
let oscillators = props.oscillators;
</script>

<template>
  <div class="visualizer">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>

</style>