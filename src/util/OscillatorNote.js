import {Note} from "@/util/Note.js";

export class OscillatorNote extends Note {
    constructor(audioContext,
                noteProperties,
                oscillatorProperties,
                velocity
    ) {
        super(audioContext, noteProperties, velocity);
        oscillatorProperties.forEach(oscillatorProperty => {
            let gain = this.audioContext.createGain();
            gain.gain.value = oscillatorProperty.gain;
            let oscillator = this.audioContext.createOscillator();
            oscillator.detune.value = oscillatorProperty.detune || 0;
            oscillator.frequency.value = oscillatorProperty.frequency || 440;
            if (oscillatorProperty.real && oscillatorProperty.imag) {
                let wave = this.audioContext.createPeriodicWave(oscillatorProperty.real, oscillatorProperty.imag);
                oscillator.setPeriodicWave(wave);
            }
            else {
                oscillator.type = oscillatorProperty.type || "sine";
            }
            oscillator.connect(gain).connect(this.gainNode);
            oscillator.start();
            this.oscillators.push(oscillator);
            if(noteProperties.chorus){
                for(let i=0; i<3; i++) {
                    let chorus = this.audioContext.createOscillator();
                    chorus.detune.value = noteProperties.chorus.detune * Math.pow(-1, i);
                    chorus.frequency.value = oscillatorProperty.frequency;
                    chorus.type = oscillatorProperty.type;
                    let chorusGain = this.audioContext.createGain();
                    chorusGain.gain.value = oscillatorProperty.gain / 3;
                    let chorusDelay = this.audioContext.createDelay();
                    chorusDelay.delayTime.value = noteProperties.chorus.delayTime;
                    chorus.connect(chorusGain).connect(chorusDelay).connect(gain);
                    chorus.start();
                    this.oscillators.push(chorus);
                }
            }
        });
    }
}
export default OscillatorNote;