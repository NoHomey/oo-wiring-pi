import { pinMode, INPUT } from 'wiring-pi';

export class InputPin {
    public constructor(pin: number) {
        pinMode(pin, INPUT);
    }
}

export default InputPin;