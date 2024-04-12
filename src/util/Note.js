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
        this.gainNode.connect(this.audioContext.destination);
        this.filters.forEach(filter => {
            this.gainNode.disconnect();
            this.gainNode.connect(filter);
            filter.connect(this.audioContext.destination);
        });
        if (noteProperties.panner) {
            let panner = this.audioContext.createStereoPanner();
            let deviation = noteProperties.panner.deviation;
            let frequency = parseFloat(noteProperties.panner.frequency);

            function updatePanning() {
                // Alternate between deviation and -deviation
                panner.pan.setTargetAtTime(-deviation, audioContext.currentTime, frequency / 2);
                panner.pan.setTargetAtTime(deviation, audioContext.currentTime + frequency / 2, frequency / 2);
            }

            updatePanning();

            setInterval(updatePanning, frequency * 1000); // Convert frequency from seconds to milliseconds

            // disconnect filters from destination and connect to panner
            if (this.filters.length > 0) {
                this.filters.forEach(filter => {
                    filter.disconnect();
                    filter.connect(panner);
                });
                panner.connect(this.audioContext.destination);
            }
            else {
                this.gainNode.disconnect();
                this.gainNode.connect(panner);
                panner.connect(this.audioContext.destination);
            }
        }
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.gainNode.gain
            .linearRampToValueAtTime(this.velocity, this.audioContext.currentTime + this.attack);
        this.gainNode.gain
            .setTargetAtTime(this.sustain * this.velocity, this.audioContext.currentTime + this.attack, this.decay);
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