import Pin from './Pin';
import { pinMode, INPUT } from 'wiring-pi';

export class InputPin extends Pin {
    public constructor(pin: number) {
        super(pin);
        pinMode(pin, INPUT);
    }
}

export default InputPin;