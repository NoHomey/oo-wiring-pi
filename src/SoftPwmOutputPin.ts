import Pin from './Pin';
import { pinMode, SOFT_PWM_OUTPUT } from 'wiring-pi';

export class SoftPwmOutputPin extends Pin {
    public constructor(pin: number, value: number = 0, range: number = 100) {
        super(pin);
        pinMode(pin, SOFT_PWM_OUTPUT);
    }
}

export default SoftPwmOutputPin;