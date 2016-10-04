import Pin from './Pin';

export class SoftPwmOutputPin extends Pin {
    public constructor(pin: number) {
        super(pin);
    }
}

export default SoftPwmOutputPin;