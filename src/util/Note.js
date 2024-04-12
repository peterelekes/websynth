export class Note {
    audioContext;
    attack;
    decay;
    sustain;
    release;
    filters;
    oscillators = [];
    velocity;
    constructor(audioContext, noteProperties, velocity) {
        this.audioContext = audioContext;
        this.attack = noteProperties.attack;
        this.decay = noteProperties.decay;
        this.sustain = noteProperties.sustain;
        this.release = noteProperties.release;
        this.velocity = velocity;
        this.filters = noteProperties.filters;
        this.gainNode = this.audioContext.createGain();
        if( this.filters.length === 0 ) {
            this.gainNode.connect(this.audioContext.destination);
        }
        this.filters.forEach(filter => {
            this.gainNode.connect(filter);
            filter.connect(this.audioContext.destination);
        });
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.gainNode.gain
            .linearRampToValueAtTime(this.velocity, this.audioContext.currentTime + this.attack);
        this.gainNode.gain
            .setTargetAtTime(this.sustain * this.velocity, this.audioContext.currentTime + this.attack, this.decay);
        if(noteProperties.panner) {
            let panner = this.audioContext.createStereoPanner();
            //it should cycle between deviation and -deviation every frequency seconds
            panner.pan.setTargetAtTime(-noteProperties.panner.deviation, this.audioContext.currentTime, noteProperties.panner.frequency);
            panner.pan.setTargetAtTime(noteProperties.panner.deviation, this.audioContext.currentTime + noteProperties.panner.frequency / 2, noteProperties.panner.frequency);
            this.gainNode.connect(panner);
            panner.connect(this.audioContext.destination);
        }
    }
    releaseNote() {
        this.oscillators.forEach(oscillator => {
            oscillator.stop(this.audioContext.currentTime + this.release);
        });
        this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioContext.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(
            0,
            this.audioContext.currentTime + this.release
        );
    }

}
export default Note;