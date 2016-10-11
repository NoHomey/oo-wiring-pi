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
    private static setuped: boolean = false;
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
        PinAllocator.setuped = true;
    }

    public static get specialPins(): SpecialPins {
        if(!PinAllocator.setuped) throw new Error('PinAllocator.setup has not been called, PinAllocator.setup must be called before using any other functionality from oo-wiring-pi');
        return PinAllocator.allSpecialPins;
    }

    public static allocate(pin: number): void {
        pin;
    }
}

export default PinAllocator;