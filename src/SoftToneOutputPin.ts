import Pin from './Pin';
import { softToneCreate, softToneStop } from 'wiring-pi';

export class SoftToneOutputPin extends Pin {
    public constructor(pin: number) {
        super(pin);
        if(softToneCreate(pin) !== 0) {
            throw new Error(`Could not set pin: ${pin} as SoftwareToneOutputPin`);
        }
    }

    public release(): void {
        softToneStop(this.pin);
        super.release();
    }

    public tone(tone: number): void {
        if((tone < 0) || (tone > 5000)) {
            throw new RangeError();
        }
    }
}

export default SoftToneOutputPin;