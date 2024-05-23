export class Distortion {
    audioContext;
    intensity;
    lowPassFrequency;
    nodes;

    constructor(audioContext, intensity, lowPassFrequency) {
        this.audioContext = audioContext;
        this.intensity = intensity;
        this.lowPassFrequency = lowPassFrequency;
        let filter = this.audioContext.createBiquadFilter();
        let waveShaper = this.audioContext.createWaveShaper();
        filter.type = "lowpass";
        filter.frequency.value = this.lowPassFrequency;
        this.nodes = {
            lowPassFilter: filter,
            waveShaper: waveShaper
        }
    }

    connectNodes(inputNode) {
        this.makeDistortionCurve(this.intensity);
        let lastNode = inputNode;
        lastNode.connect(this.nodes['waveShaper']);
        lastNode = this.nodes['waveShaper'];
        lastNode.connect(this.nodes['lowPassFilter']);
        lastNode = this.nodes['lowPassFilter'];
        return lastNode;
    }

    disconnectNodes() {
        this.nodes['waveShaper']?.disconnect();
        this.nodes['lowPassFilter']?.disconnect();
    }

    makeDistortionCurve(intensity) {
        let n_samples =  44100;
        let curve = new Float32Array(n_samples);
        let deg = Math.PI / 180;
        let x;
        for(let i = 0; i < n_samples; i++) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + intensity) * x * 20 * deg / (Math.PI + intensity * Math.abs(x));
        }
        this.nodes['waveShaper'].curve = curve;
        this.nodes['waveShaper'].oversample = "4x";
    }
}