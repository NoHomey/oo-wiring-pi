jest.mock('wiring-pi');
import { PinAllocator, PinEnumerator } from '../src/PinAllocator';
import { wiringPiSetup, wiringPiSetupGpio, wiringPiSetupPhys } from 'wiring-pi';


describe('PinAllocator', () => {
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
});