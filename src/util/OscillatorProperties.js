export class OscillatorProperties {
    detune;
    frequency;
    gain;
    type;
    real;
    imag;
    constructor(detune, frequency, gain, type, real, imag) {
        this.detune = detune;
        this.frequency = frequency;
        this.gain = gain;
        this.type = type;
        this.real = real;
        this.imag = imag;
    }
}