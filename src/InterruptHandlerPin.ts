import { InputPin, Pull } from './InputPin';
import { INT_EDGE_SETUP, wiringPiISR } from 'wiring-pi';

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
        wiringPiISR(pin, INT_EDGE_SETUP, handler);
    }

}

export default InterruptHandlerPin;