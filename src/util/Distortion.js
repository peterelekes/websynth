export class Distortion {
    audioContext;
    amount;
    intensity;
    distortionNode;
    constructor(audioContext, amount, intensity){
        this.audioContext = audioContext;
        this.amount = amount;
        this.intensity = intensity;
        this.distortionNode = this.audioContext.createWaveShaper();
        this.createDistortionCurve();
    }

    createDistortionCurve() {
        let samples = this.amount;
        let curve = new Float32Array(samples);
        let x;
        for(let i = 0; i< samples; i++) {
            x = i * 2 / samples - 1;
            curve[i] = (3 + this.intensity) * x * 20 * (Math.PI / 180) / (Math.PI + this.intensity * Math.abs(x));
            console.log(curve[i]);
        }
        this.distortionNode.curve = curve;
        this.distortionNode.oversample = "4x";
    }

    disconnect() {
        let curve = new Float32Array(this.amount);
        for (let i = 0; i < this.amount; i++) {
            curve[i] = 1;
        }
        this.distortionNode.curve = curve;
        this.distortionNode.oversample = "4x";
        this.distortionNode.disconnect();
    }
}