jest.mock('wiring-pi');
import { pinMode, SOFT_PWM_OUTPUT } from 'wiring-pi';
import SoftPwmOutputPin from '../src/SoftPwmOutputPin';

describe('SoftPwmOutputPin', () => {
    describe('constructor', () => {
        it('throws RangeError if range is less than 1', () => {
            expect(() => { let pin: SoftPwmOutputPin = new SoftPwmOutputPin(1, 0, 0) }).toThrowError(RangeError);
        });

        it('throws descriptive RangeError if range is less than 1', () => {
            expect(() => { let pin: SoftPwmOutputPin = new SoftPwmOutputPin(4, 0, 0) }).toThrowError('range must be positve integer, 0 is less than 1');
        });

        it('throws RangeError if value is not in range [0..range]', () => {
            expect(() => { let pin: SoftPwmOutputPin = new SoftPwmOutputPin(2, 120, 110) }).toThrowError(RangeError);
        });

        it('sets the given pin as SOFT_PWM_OUTPUT', () => {
            let pin: SoftPwmOutputPin = new SoftPwmOutputPin(3);
            expect(pinMode).toBeCalledWith(3, SOFT_PWM_OUTPUT);
        });
    });
});