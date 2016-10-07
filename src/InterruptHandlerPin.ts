import Releasable from './Releasable';
import { InputPin, Pull } from './InputPin';
import { INT_EDGE_SETUP, INT_EDGE_RISING, INT_EDGE_FALLING, INT_EDGE_BOTH , wiringPiISR, wiringPiISRCancel } from 'wiring-pi';

export { Pull }

export type InterruptHandler = (delta: number) => void;

export enum Edge {
    Falling,
    Rising,
    Both,
    Setup
}

export class InterruptHandlerPin extends InputPin implements Releasable {
    public constructor(pin: number, handler: InterruptHandler, pull: Pull = Pull.Off, edge: Edge = Edge.Setup) {
        let intEdge: number;
        super(pin, pull);
        switch(edge) {
            case Edge.Rising:
                intEdge = INT_EDGE_RISING;
                break;
            case Edge.Falling:
                intEdge = INT_EDGE_FALLING;
                break;
            case Edge.Both:
                intEdge = INT_EDGE_BOTH;
                break;
            default: intEdge =  INT_EDGE_SETUP; 
        }
        wiringPiISR(pin, intEdge, handler); 
    }

    public release(): void {
        wiringPiISRCancel(this.pin);
        super.release();
    }
}

export default InterruptHandlerPin;