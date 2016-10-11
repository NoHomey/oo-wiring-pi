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

namespace constants {
    export const minusOne: number = -1;
    export const one: number = 1;
}

export class PinAllocator {
    private static setuped: boolean = false;
    private static allSpecialPins: SpecialPins;
    private static allocated: Array<number> = [];

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
        if(PinAllocator.allocated.indexOf(pin) !== constants.minusOne) {
			throw new Error(`pin: ${pin} is allocated, call PinAllocator.release with the given pin or with the instace constructed with the given pin`);	
		} else {
			PinAllocator.allocated.push(pin);
		}
    }

    public static release(pin: number): void {
        const allocatedIndex: number = PinAllocator.allocated.indexOf(pin);
        if(allocatedIndex === constants.minusOne) {
			throw new Error(`pin: ${pin} can not been released, it is not allocated`);	
		} else {
			PinAllocator.allocated.splice(allocatedIndex, constants.one);
		}
    }
}

export default PinAllocator;