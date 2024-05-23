export class Flanger {
    audioContext;
    delay;
    depth;
    feedback;
    speed;
    nodes;

    constructor(audioContext, delay, depth, feedback, speed) {
        this.audioContext = audioContext;
        this.delay = delay;
        this.depth = depth;
        this.feedback = feedback;
        this.speed = speed;
        this.nodes = {
            gainNode: this.audioContext.createGain(),
            wetGainNode: this.audioContext.createGain(),
            delayNode: this.audioContext.createDelay(),
            feedbackGainNode: this.audioContext.createGain(),
            oscillator: this.audioContext.createOscillator(),
        }
        this.nodes['oscillator'].type = 'sine';
        this.nodes['oscillator'].frequency.value = this.speed;
        this.nodes['oscillator'].start();
        this.nodes['gainNode'].gain.value = this.depth;
        this.nodes['feedbackGainNode'].gain.value = this.feedback;
        this.nodes['delayNode'].delayTime.value = this.delay;
    }

    connectNodes(inputNode) {
        this.nodes['oscillator'].connect(this.nodes['gainNode']);
        this.nodes['gainNode'].connect(this.nodes['delayNode'].delayTime);
        inputNode.connect(this.nodes['wetGainNode']);
        inputNode.connect(this.nodes['delayNode']);
        this.nodes['delayNode'].connect(this.nodes['wetGainNode']);
        this.nodes['delayNode'].connect(this.nodes['feedbackGainNode']);
        this.nodes['feedbackGainNode'].connect(inputNode);
        return this.nodes['wetGainNode'];
    }

    disconnectNodes() {
        this.nodes['oscillator'].disconnect();
        this.nodes['gainNode'].disconnect();
        this.nodes['delayNode'].disconnect();
        this.nodes['feedbackGainNode'].disconnect();
        this.nodes['wetGainNode'].disconnect();
    }

}
export default Flanger;