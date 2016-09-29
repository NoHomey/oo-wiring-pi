import Pin from './Pin';
import WritablePin from './WritablePin';
import { pinMode, OUTPUT, HIGH, LOW, digitalWrite } from 'wiring-pi';

export class OutputPin extends Pin implements WritablePin<boolean> {
    public constructor(pin: number) {
        super(pin);
        pinMode(pin, OUTPUT);
    }

    public write(state: boolean): void {
        digitalWrite(this.pin, state ? HIGH : LOW);
    }

    public high(): void {
        digitalWrite(this.pin, HIGH);
    }
}

export default OutputPin;