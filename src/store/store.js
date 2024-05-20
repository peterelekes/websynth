import {reactive} from "vue";

export const store = reactive({
    volume: 0.5,
    attack: 0.1,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,
    oscillators: [],
    filters: [],
    panner: null,
    reverb: null,
});