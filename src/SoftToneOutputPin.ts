import Pin from './Pin';
import { softToneCreate } from 'wiring-pi';

export class SoftToneOutputPin extends Pin {
    public constructor(pin: number) {
        super(pin);
        if(softToneCreate(pin) !== 0) {
            throw new Error(`Could not set pin: ${pin} as SoftwareToneOutputPin`);
        }
    }
}

export default SoftToneOutputPin;