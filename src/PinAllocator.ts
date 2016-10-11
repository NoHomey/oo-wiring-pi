import SpecialPins from './SpecialPins/SpecialPins'

import { wiringPiSetup, wiringPiSetupGpio, wiringPiSetupPhys } from 'wiring-pi';

export enum PinEnumerator {
    wpi,
    bcm,
    phys
}

export class PinAllocator {
    private static allSpecialPins: SpecialPins;

    public static setup(pinEnumerator: PinEnumerator = PinEnumerator.wpi): void {
        switch(pinEnumerator) {
            case PinEnumerator.bcm: wiringPiSetupGpio();
            case PinEnumerator.phys: wiringPiSetupPhys();
            default: wiringPiSetup();
        }
    }

    public static get specialPins(): SpecialPins {
        return PinAllocator.allSpecialPins;
    }
}

export default PinAllocator;