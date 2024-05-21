export class Reverb {
    constructor(audioContext, reverbUrl) {
        this.audioContext = audioContext;
        this.reverbUrl = reverbUrl;
        this.convolver = this.audioContext.createConvolver();
        this.loadImpulseResponse();
    }

    loadImpulseResponse() {
        fetch(this.reverbUrl)
            .then(response => response.arrayBuffer())
            .then(buffer => this.audioContext.decodeAudioData(buffer))
            .then(audioBuffer => {
                this.convolver.buffer = audioBuffer;
            });
    }
}
export default Reverb;