export class NoteProperties {
    attack;
    decay;
    sustain;
    release;
    constructor(attack, decay, sustain, release) {
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
    }
}