import SpecialPins from './SpecialPins/SpecialPins';
import wpiSpecialPins from './SpecialPins/wpiSpecialPins';
import bcmSpecialPins from './SpecialPins/bcmSpecialPins';
import physSpecialPins from './SpecialPins/physSpecialPins';
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
            case PinEnumerator.bcm:
                wiringPiSetupGpio();
                PinAllocator.allSpecialPins = bcmSpecialPins;
                break;
            case PinEnumerator.phys:
                wiringPiSetupPhys();
                PinAllocator.allSpecialPins = physSpecialPins;
                break;
            default:
                wiringPiSetup();
                PinAllocator.allSpecialPins = wpiSpecialPins;
        }
    }

    public static get specialPins(): SpecialPins {
        return PinAllocator.allSpecialPins;
    }
}

export default PinAllocator;