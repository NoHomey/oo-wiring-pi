import Pin from './Pin';
import { pinMode, OUTPUT, HIGH, LOW, digitalWrite } from 'wiring-pi';

export class OutputPin extends Pin {
    public constructor(pin: number) {
        super(pin);
        pinMode(pin, OUTPUT);
    }

    public high(): void {
        digitalWrite(this.pin, HIGH);
    }

    public low(): void {
        digitalWrite(this.pin, LOW);
    }
}

export default OutputPin;