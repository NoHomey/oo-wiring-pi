jest.mock('wiring-pi');
import { pinMode, SOFT_PWM_OUTPUT, softPwmCreate } from 'wiring-pi';
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

        it('throws descriptive RangeError if value is not in range [0..range]', () => {
            expect(() => { let pin: SoftPwmOutputPin = new SoftPwmOutputPin(5, 120, 110) }).toThrowError('value must be in range [0..range], 120 is not in range [0..110]');
        });

        it('sets the given pin as SOFT_PWM_OUTPUT', () => {
            let pin: SoftPwmOutputPin = new SoftPwmOutputPin(3);
            expect(pinMode).toBeCalledWith(3, SOFT_PWM_OUTPUT);
        });

        it('calls softPwmCreate with constructor arguments', () => {
            let pin: SoftPwmOutputPin = new SoftPwmOutputPin(6, 99, 101);
            expect(softPwmCreate).toBeCalledWith(6, 99, 101);
        });

        it('has 100 for default range value', () => {
            let pin: SoftPwmOutputPin = new SoftPwmOutputPin(7, 8);
            expect(softPwmCreate).toBeCalledWith(7, 8, 100);
        });

        it('has 0 for default value value', () => {
            let pin: SoftPwmOutputPin = new SoftPwmOutputPin(8);
            expect(softPwmCreate).toBeCalledWith(8, 0, 100);
        });
    });
});