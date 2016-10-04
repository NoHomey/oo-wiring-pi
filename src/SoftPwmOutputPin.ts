import Pin from './Pin';
import { pinMode, SOFT_PWM_OUTPUT } from 'wiring-pi';

export class SoftPwmOutputPin extends Pin {
    private static throwIfValueIsOutOfRange(value: number, range: number): void {
        if((value < 0) || (value > range)) {
            throw new RangeError(`value must be in range [0..range], ${value} is not in range [0..${range}]`);
        }
    }

    public constructor(pin: number, value: number = 0, range: number = 100) {
        super(pin);
        if(range < 1) {
            throw new RangeError(`range must be positve integer, ${range} is less than 1`);
        }
        SoftPwmOutputPin.throwIfValueIsOutOfRange(value, range);
        pinMode(pin, SOFT_PWM_OUTPUT);
    }
}

export default SoftPwmOutputPin;