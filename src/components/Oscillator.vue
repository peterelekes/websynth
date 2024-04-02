<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      volume: 0.5 // Default volume set to 50%
    };
  },
  computed: {
    selectedWaveform() {
      switch (this.type) {
        case "sine":
          return "sine";
        case "square":
          return "square";
        case "triangle":
          return "triangle";
        case "sawtooth":
          return "sawtooth";
        default:
          return "sine";
      }
    }
  }
};
</script>
