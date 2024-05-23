export class NoteProperties {
    attack;
    decay;
    sustain;
    release;
    highPassFilter;
    lowPassFilter;
    panner;
    reverb;
    chorus;
    distortion;
    effectOrder;
    constructor(attack,
                decay,
                sustain,
                release,
                highPassFilter,
                lowPassFilter,
                panner,
                reverb,
                chorus,
                distortion,
                flanger,
                effectOrder) {
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
        this.highPassFilter = highPassFilter;
        this.lowPassFilter = lowPassFilter;
        this.panner = panner;
        this.reverb = reverb;
        this.chorus = chorus;
        this.distortion = distortion;
        this.flanger = flanger;
        this.effectOrder = effectOrder;
    }
}