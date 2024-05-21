import {store} from "@/store/store.js";

export class Note {
    audioContext;
    attack;
    decay;
    sustain;
    release;
    oscillators = [];
    velocity;
    reverbDecay;
    static playingNotes = 0; // Static variable to keep track of the number of notes playing
    constructor(audioContext, noteProperties, velocity) {
        this.audioContext = audioContext;
        this.attack = noteProperties.attack;
        this.decay = noteProperties.decay;
        this.sustain = noteProperties.sustain;
        this.release = noteProperties.release;
        this.velocity = velocity;
        this.gainNode = this.audioContext.createGain();
        Note.playingNotes++; // Increment the count of playing notes
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        let gain = this.velocity / Math.sqrt(Note.playingNotes); // Adjust the gain based on the number of playing notes
        let lastNode = this.gainNode;
        let effectTracker = 1;
        if (noteProperties.highPassFilter) {
            lastNode.connect(noteProperties.highPassFilter);
            lastNode = noteProperties.highPassFilter;
            effectTracker++;
        }
        if (noteProperties.lowPassFilter) {
            lastNode.connect(noteProperties.lowPassFilter);
            lastNode = noteProperties.lowPassFilter;
            effectTracker++;
        }
        if (noteProperties.panner) {
            lastNode.connect(noteProperties.panner.pannerNode);
            lastNode = noteProperties.panner.pannerNode;
            setInterval(() => {
                noteProperties.panner.updatePanning();
            }, 1000 / 60);
            effectTracker++;
        }
        if(noteProperties.reverb) {
            lastNode.connect(noteProperties.reverb);
            lastNode = noteProperties.reverb;
            effectTracker++;
        }
        this.gainNode.gain
            .linearRampToValueAtTime(gain, this.audioContext.currentTime + this.attack);
        this.gainNode.gain
            .setTargetAtTime(this.sustain * gain, this.audioContext.currentTime + this.attack, this.decay);
        this.gainNode.connect(lastNode);
        lastNode.connect(this.audioContext.destination);
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
        Note.playingNotes--; // Decrement the count of playing notes
    }

}

export default Note;