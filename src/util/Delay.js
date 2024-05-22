export class Delay {
    audioContext;
    delayTime;
    delayNode;
    constructor(audioContext, delayTime) {
        this.audioContext = audioContext;
        this.delayTime = delayTime;
        this.delayNode = this.audioContext.createDelay();
        this.delayNode.delayTime.value = this.delayTime;
    }

    connect(node){
        this.delayNode.connect(node);
    }

    disconnect(){
        this.delayNode.disconnect();
    }
}
export default Delay;