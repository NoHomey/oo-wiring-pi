import Pin from './Pin';
import { softToneCreate } from 'wiring-pi';

export class SoftToneOutputPin extends Pin {
    public constructor(pin: number) {
        super(pin);
        softToneCreate(pin);
    }
}

export default SoftToneOutputPin;