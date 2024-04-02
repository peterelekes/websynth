export class Note {
    audioContext;
    gainNode;
    attack;
    decay;
    sustain;
    release;
    velocity;
    oscillators = [];
    constructor(audioContext, gainNode, attack, decay, sustain, release, velocity) {
        this.audioContext = audioContext;
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
        this.velocity = velocity;
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.gainNode.gain
            .linearRampToValueAtTime(this.velocity, this.audioContext.currentTime + this.attack);
        this.gainNode.gain
            .setTargetAtTime(this.sustain * this.velocity, this.audioContext.currentTime + this.attack, this.decay);
        this.gainNode.connect(audioContext);
    }
    releaseNote() {
        this.oscillators.forEach(oscillator => {
            oscillator.stop(this.audioContext.currentTime+ this.release);
        });
        this.gainNode
            .setTargetAtTime(
                0,
                Math.max(this.audioContext.currentTime + this.attack + this.decay, this.audioContext.currentTime),
                this.release
            );
    }
}