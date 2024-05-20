export class NoteProperties {
    attack;
    decay;
    sustain;
    release;
    filters = [];
    panner;
    reverb;
    constructor(attack, decay, sustain, release, filters, panner, reverb) {
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
        this.filters = filters;
        this.panner = panner;
        this.reverb = reverb;
    }
}