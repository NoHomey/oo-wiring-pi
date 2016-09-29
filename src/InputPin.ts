import Pin from './Pin';
import ReadablePin from './ReadablePin';
import { pinMode, INPUT, HIGH, PUD_OFF, PUD_UP, PUD_DOWN, digitalRead, pullUpDnControl } from 'wiring-pi';

export enum Pull {
    Off,
    Up,
    Down
}

export class InputPin extends Pin implements ReadablePin<boolean> {
    public constructor(pin: number, pull: Pull = Pull.Off) {
        let pullControll: number;
        super(pin);
        pinMode(pin, INPUT);
        switch(pull) {
            case Pull.Up:
                pullControll = PUD_UP;
                break;
            case Pull.Down:
                pullControll = PUD_DOWN;
                break;
            default: pullControll = PUD_OFF;
        }
        pullUpDnControl(pin, pullControll);
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