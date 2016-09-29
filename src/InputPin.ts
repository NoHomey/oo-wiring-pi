import Pin from './Pin';
import ReadablePin from './ReadablePin';
import { pinMode, INPUT, HIGH, LOW, digitalRead } from 'wiring-pi';

export class InputPin extends Pin implements ReadablePin<boolean> {
    public constructor(pin: number) {
        super(pin);
        pinMode(pin, INPUT);
    }

    public read(): boolean {
        return digitalRead(this.pin) === HIGH;
    }

    public isHigh(): boolean {
        return digitalRead(this.pin) === HIGH;
    }
}

export default InputPin;