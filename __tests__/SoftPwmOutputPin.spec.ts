jest.mock('wiring-pi');
import { pinMode, SOFT_PWM_OUTPUT } from 'wiring-pi';
import SoftPwmOutputPin from '../src/SoftPwmOutputPin';

describe('SoftPwmOutputPin', () => {
    describe('constructor', () => {
        it('sets the given pin as SOFT_PWM_OUTPUT', () => {
            let pin: SoftPwmOutputPin = new SoftPwmOutputPin(1);
            expect(pinMode).toBeCalledWith(1, SOFT_PWM_OUTPUT);
        });

        it('throws RangeError if value is not in range [0..range]', () => {
            expect(() => { let pin: SoftPwmOutputPin = new SoftPwmOutputPin(2, 120, 110) }).toThrowError(RangeError);
        });
    });
});