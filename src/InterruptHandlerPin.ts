import { InputPin, Pull } from './InputPin';
import { INT_EDGE_SETUP, INT_EDGE_RISING, INT_EDGE_FALLING, INT_EDGE_BOTH ,wiringPiISR } from 'wiring-pi';

export { Pull }

export type InterruptHandler = (delta: number) => void;

export enum Edge {
    Falling,
    Rising,
    Both,
    Setup
}

export class InterruptHandlerPin extends InputPin {
    public constructor(pin: number, handler: InterruptHandler, pull: Pull = Pull.Off, edge: Edge = Edge.Setup) {
        super(pin, pull);
        switch(edge) {
            case Edge.Rising:
                wiringPiISR(pin, INT_EDGE_RISING, handler);
                break;
            case Edge.Falling:
                wiringPiISR(pin, INT_EDGE_FALLING, handler);
                break;
            case Edge.Both:
                wiringPiISR(pin, INT_EDGE_BOTH, handler);
                break;
            default: wiringPiISR(pin, INT_EDGE_SETUP, handler); 
        }
    }

}

export default InterruptHandlerPin;