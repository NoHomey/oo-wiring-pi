jest.mock('wiring-pi');
import wpiSpecialPins from '../src/SpecialPins/wpiSpecialPins';
import bcmSpecialPins from '../src/SpecialPins/bcmSpecialPins';
import physSpecialPins from '../src/SpecialPins/physSpecialPins';
import { PinAllocator, PinEnumerator } from '../src/PinAllocator';
import { wiringPiSetup, wiringPiSetupGpio, wiringPiSetupPhys } from 'wiring-pi';


describe('PinAllocator', () => {
    describe('when setup has not been called first', () => {
        describe('specialPins', () => {
            it('throws Error if setup has not been called first', () => {
                expect(() => PinAllocator.specialPins).toThrowError('PinAllocator.setup has not been called, PinAllocator.setup must be called before using any other functionality from oo-wiring-pi');
            });
        });
    });

    describe('setup', () => {
        it('uses wpi as a default pin enumerator', () => {
            PinAllocator.setup();
            expect(wiringPiSetup).toBeCalled();
        });

        it('calls wiringPiSetup when pinEnumerator is PinEnumerator.wpi', () => {
            PinAllocator.setup(PinEnumerator.wpi);
            expect(wiringPiSetup).toBeCalled();
        });

        it('calls wiringPiSetupGpio when pinEnumerator is PinEnumerator.bcm', () => {
            PinAllocator.setup(PinEnumerator.bcm);
            expect(wiringPiSetupGpio).toBeCalled();
        });

        it('calls wiringPiSetupPhys when pinEnumerator is PinEnumerator.phys', () => {
            PinAllocator.setup(PinEnumerator.phys);
            expect(wiringPiSetupPhys).toBeCalled();
        });
    });

    describe('specialPins', () => {
        it('returns wpiSpecialPins after wiringPiSetup has been called', () => {
            PinAllocator.setup();
            expect(PinAllocator.specialPins).toBe(wpiSpecialPins);
        });

        it('returns bcmSpecialPins after wiringPiSetupGpio has been called', () => {
            PinAllocator.setup(PinEnumerator.bcm);
            expect(PinAllocator.specialPins).toBe(bcmSpecialPins);
        });

        it('returns physSpecialPins after wiringPiSetupPhys has been called', () => {
            PinAllocator.setup(PinEnumerator.phys);
            expect(PinAllocator.specialPins).toBe(physSpecialPins);
        });
    });

    describe('allocate', () => {
        it('allocates the given pin if it is not allocated', () => {
            expect(() => PinAllocator.allocate(1)).not.toThrow();
        });

        it('throws Error if the given pin is allocated', () => {
            expect(() => PinAllocator.allocate(1)).toThrowError('pin: 1 is allocated, call PinAllocator.release with the given pin or with the instace constructed with the given pin');
        });
    });

    describe('release', () => {
        it('throws Error if the given has not been allocated', () => {
            expect(() => PinAllocator.release(2)).toThrowError('pin: 2 can not been released, it has not been allocated');
        });

        it('releases the given pin if it has been allocated', () => {
            PinAllocator.allocate(2);
            expect(() => PinAllocator.release(2)).not.toThrowError();
            expect(() => PinAllocator.release(2)).toThrowError('pin: 2 can not been released, it has not been allocated');
        });
    });
});