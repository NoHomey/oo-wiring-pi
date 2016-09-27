jest.mock('wiring-pi');
import { pinMode, INPUT } from 'wiring-pi';
import InputPin from '../src/InputPin';

describe('InputPin', () => {
    describe('constructor', () => {
        it('should set the given pin as INPUT', () => {
            let pin: InputPin = new InputPin(9);
            expect(pinMode).toBeCalledWith(9, INPUT);
        });

        it('shouldn\'t throw if the given pin is not in use', () => {
            let pin: InputPin;
            expect(() => pin = new InputPin(6)).not.toThrowError();
        });

        it('thorws Error when pin is in use', () => {
            expect(() => {
                let notInUse: InputPin = new InputPin(8);
                let inUse: InputPin = new InputPin(8);
            }).toThrowError(Error);
        });
    });
});