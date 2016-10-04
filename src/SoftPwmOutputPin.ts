import Pin from './Pin';
import { pinMode, SOFT_PWM_OUTPUT } from 'wiring-pi';

export class SoftPwmOutputPin extends Pin {
    public constructor(pin: number) {
        super(pin);
        pinMode(pin, SOFT_PWM_OUTPUT);
    }
}

export default SoftPwmOutputPin;