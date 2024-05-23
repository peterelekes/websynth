import {reactive} from "vue";

export const store = reactive({
    volume: 0.5,
    attack: 0.1,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,
    oscillators: [],
    mainGainNode: null,
    highPassFilter: null,
    lowPassFilter: null,
    panner: null,
    reverb: null,
    chorus: null,
    distortion: null,
    flanger: null,
    lastNode: null,
    effectOrder: [1, 2, 3, 4, 5, 6, 7],
});