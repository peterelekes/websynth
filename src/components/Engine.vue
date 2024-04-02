<script setup>
const audioContext = new window.AudioContext();
const oscillators = ['sine', 'square', 'triangle', 'sawtooth'].map(type => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = type;
  oscillator.start();
  return oscillator;
});

</script>