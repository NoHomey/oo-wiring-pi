import { wiringPiSetup, wiringPiSetupGpio, wiringPiSetupPhys } from 'wiring-pi';

export enum PinEnumerator {
    wpi,
    bcm,
    phys
}

export class PinAllocator {
    public static setup(pinEnumerator: PinEnumerator = PinEnumerator.wpi): void {
        switch(pinEnumerator) {
            case PinEnumerator.bcm: wiringPiSetupGpio();
            case PinEnumerator.phys: wiringPiSetupPhys();
            default: wiringPiSetup();
        }
    }
}

export default PinAllocator;