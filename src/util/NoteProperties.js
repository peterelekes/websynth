export class NoteProperties {
    attack;
    decay;
    sustain;
    release;
    filters = [];
    panner;
    constructor(attack, decay, sustain, release, filters, panner) {
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
        this.filters = filters;
        this.panner = panner;
    }
}