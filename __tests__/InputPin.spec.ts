jest.mock('wiring-pi');
import { pinMode, INPUT } from 'wiring-pi';
import InputPin from '../src/InputPin';

describe('InputPin', () => {
    describe('constructor', () => {
        it('should set the given pin as INPUT', () => {
            let pin: InputPin = new InputPin(9);
            expect(pinMode).toBeCalledWith(9, INPUT);
        });
    });
});