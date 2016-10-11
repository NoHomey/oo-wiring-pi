jest.mock('wiring-pi');
import { PinAllocator, PinEnumerator } from '../src/PinAllocator';
import { wiringPiSetup } from 'wiring-pi';


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
    });
});