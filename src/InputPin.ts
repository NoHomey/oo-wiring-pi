import Pin from './Pin';
import ReadablePin from './ReadablePin';
import { pinMode, INPUT, HIGH, PUD_OFF, digitalRead, pullUpDnControl } from 'wiring-pi';
export class InputPin extends Pin implements ReadablePin<boolean> {
    public constructor(pin: number) {
        super(pin);
        pinMode(pin, INPUT);
        pullUpDnControl(pin, PUD_OFF);
    }

    public read(): boolean {
        return this.isHigh();
    }

    public isHigh(): boolean {
        return digitalRead(this.pin) === HIGH;
    }

    public isLow(): boolean {
        return !this.isHigh();
    }
}

export default InputPin;