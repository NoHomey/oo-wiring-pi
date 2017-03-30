import Pin from './Pin';
import Releasable from './Releasable';
import { softToneCreate, softToneStop, softToneWrite } from 'wiring-pi';

export class SoftToneOutputPin extends Pin implements Releasable {
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
            throw new RangeError(`value must be in range [0..5000], ${tone} is not in range [0..5000]`);
        }
        softToneWrite(this.pin, tone);
    }
}

export default SoftToneOutputPin;