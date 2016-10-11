import { wiringPiSetup, wiringPiSetupGpio } from 'wiring-pi';

export enum PinEnumerator {
    wpi,
    bcm,
    phys
}

export class PinAllocator {
    public static setup(pinEnumerator: PinEnumerator = PinEnumerator.wpi): void {
        switch(pinEnumerator) {
            case PinEnumerator.bcm: wiringPiSetupGpio();
            default: wiringPiSetup();
        }
    }
}

export default PinAllocator;