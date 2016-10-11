jest.mock('wiring-pi');
import { PinAllocator } from '../src/PinAllocator';
import { wiringPiSetup } from 'wiring-pi';


describe('PinAllocator', () => {
    describe('setup', () => {
        it('should use wpi as a default pin enumerator', () => {
            PinAllocator.setup();
            expect(wiringPiSetup).toBeCalled();
        });
    });
});