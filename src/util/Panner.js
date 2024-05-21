export class Panner {
    audioContext;
    deviation;
    frequency;
    pannerNode;

    constructor(audioContext, deviation, frequency) {
        this.audioContext = audioContext;
        this.deviation = deviation;
        this.frequency = frequency;
        this.pannerNode = this.audioContext.createStereoPanner();
    }

    updatePanning() {
        this.pannerNode.pan.value = Math.sin(this.frequency * this.audioContext.currentTime) * this.deviation;
    }
}
export default Panner;