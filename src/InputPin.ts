import Pin from './Pin';
import ReadablePin from './ReadablePin';
import { pinMode, INPUT, HIGH, PUD_OFF, digitalRead, pullUpDnControl } from 'wiring-pi';

export enum Pull {
    Off,
    Up,
    Down
}

export class InputPin extends Pin implements ReadablePin<boolean> {
    public constructor(pin: number, pull: Pull = Pull.Off) {
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