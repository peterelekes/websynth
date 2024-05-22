import Delay from "@/util/Delay.js";
export class Chorus{
    audioContext;
    detune;
    delayTime;
    delayNode;
    constructor(audioContext, delayTime, detune){
        this.audioContext = audioContext;
        this.delayTime = delayTime;
        this.detune = detune;
        this.delayNode = this.audioContext.createDelay();
        this.delayNode.delayTime.value = this.delayTime;
    }
}
export default Chorus;