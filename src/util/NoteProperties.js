export class NoteProperties {
    attack;
    decay;
    sustain;
    release;
    highPassFilter;
    lowPassFilter;
    panner;
    reverb;
    constructor(attack, decay, sustain, release, highPassFilter, lowPassFilter, panner, reverb) {
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
        this.highPassFilter = highPassFilter;
        this.lowPassFilter = lowPassFilter;
        this.panner = panner;
        this.reverb = reverb;
    }
}