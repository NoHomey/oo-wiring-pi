import { pinMode, OUTPUT } from 'wiring-pi';

export class OutputPin {
    public constructor(pin: number) {
        pinMode(pin, OUTPUT);
    }
}

export default OutputPin;