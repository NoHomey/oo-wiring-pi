import Pin from './Pin';
import { softToneCreate } from 'wiring-pi';

export class SoftToneOutputPin extends Pin {
    public constructor(pin: number) {
        super(pin);
        if(softToneCreate(pin) !== 0) {
            throw new Error();
        }
    }
}

export default SoftToneOutputPin;