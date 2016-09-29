import { Pull } from './InputPin';

export { Pull }

export type InterruptHandler = (delta: number) => void;

export enum Edge {
    Falling,
    Rising,
    Both,
    Setup
}

export class InterruptHandlerPin {
    public constructor(pin: number, handler: InterruptHandler, pull: Pull = Pull.Off, edge: Edge = Edge.Setup) {

    }

}

export default InterruptHandlerPin;