import Pin from './Pin';
import { pinMode, OUTPUT } from 'wiring-pi';

export class OutputPin extends Pin {
    public constructor(pin: number) {
        super(pin);
        pinMode(pin, OUTPUT);
    }
}

export default OutputPin;