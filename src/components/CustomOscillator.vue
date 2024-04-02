<script setup>
import {ref, onMounted, onBeforeUnmount, watch} from "vue";

const props = defineProps(["type", "volume"]);
const audioContext = ref(new AudioContext());
const gainNode = audioContext.value.createGain();
gainNode.connect(audioContext.value.destination);
const oscillators = ref(new Map());

watch(() => props.type, (newType) => {
  for (const oscillator of oscillators.value.values()) {
    oscillator.type = newType;
  }
});

watch(() => props.volume, (newVolume) => {
  gainNode.gain.value = newVolume / oscillators.value.size || 1;
});

emitter.on("playNote", (note) => {
  const oscillator = audioContext.value.createOscillator();
  const noteGainNode = audioContext.value.createGain();
  noteGainNode.connect(gainNode);
  oscillator.connect(noteGainNode);
  oscillator.type = props.type;
  oscillator.frequency.value = getFrequencyFromNoteNumber(note);
  oscillator.start();
  noteGainNode.gain.linearRampToValueAtTime(0, audioContext.value.currentTime);
  noteGainNode.gain.linearRampToValueAtTime(1, audioContext.value.currentTime + 0.01);
  oscillators.value.set(note, {oscillator, gainNode: noteGainNode});
  gainNode.gain.value = props.volume / oscillators.value.size;
});

emitter.on("releaseNote", (note) => {
  if (oscillators.value.has(note)) {
    const {oscillator, gainNode: noteGainNode} = oscillators.value.get(note);
    noteGainNode.gain.linearRampToValueAtTime(1, audioContext.value.currentTime);
    noteGainNode.gain.linearRampToValueAtTime(0, audioContext.value.currentTime + 0.01);
    setTimeout(() => {
      oscillator.stop();
      oscillators.value.delete(note);
      gainNode.gain.value = props.volume / oscillators.value.size || 1;
      console.log(oscillators.value.size);
    }, 10);
  }
});

onBeforeUnmount(() => {
  for (const {oscillator} of oscillators.value.values()) {
    oscillator.stop();
  }
  audioContext.value.close();
});

function getFrequencyFromNoteNumber(note) {
  return Math.pow(2, (note - 69) / 12) * 440;
}
</script>