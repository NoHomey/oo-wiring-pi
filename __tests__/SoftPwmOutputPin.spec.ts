jest.mock('wiring-pi');
import { softPwmCreate, softPwmStop } from 'wiring-pi';
import SoftPwmOutputPin from '../src/SoftPwmOutputPin';

type SoftPwmCreateMock = jest.Mock<(pin: number, value: number, range: number) => number>;

(softPwmCreate as SoftPwmCreateMock).mockImplementation(() => 0);

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

        it('throws Error if softPwmCreate returns non-zero result', () => {
            (softPwmCreate as SoftPwmCreateMock).mockReturnValueOnce(() => -1);
            expect(() => { let pin: SoftPwmOutputPin = new SoftPwmOutputPin(9) }).toThrowError(Error);
        });

        it('throws descriptive Error if softPwmCreate returns non-zero result', () => {
            (softPwmCreate as SoftPwmCreateMock).mockReturnValueOnce(() => -1);
            expect(() => { let pin: SoftPwmOutputPin = new SoftPwmOutputPin(10) }).toThrowError('Could not set pin: 10 as SoftwarePwmOutputPin');
        });
    });

    describe('release', () => {
        it('releases the pin which prevents errors to be thrown when constructing new instance', () => {
            expect(() => {
                let notInUse: SoftPwmOutputPin = new SoftPwmOutputPin(11);
                notInUse.release();
                let inUse: SoftPwmOutputPin = new SoftPwmOutputPin(11);
            }).not.toThrowError(Error);
        });

        it('stops the soft pwm on the constructed pin throughout a call to softPwmStop', () => {
            let pin: SoftPwmOutputPin = new SoftPwmOutputPin(12);
            pin.release();
            expect(softPwmStop).toBeCalledWith(12);
        });
    });

    describe('pwm', () => {
        let pin: SoftPwmOutputPin = new SoftPwmOutputPin(13);

        it('throws RangeError if pwm value is not in range [0..range]', () => {
            expect(() => pin.pwm(101)).toThrowError(RangeError);
            expect(() => pin.pwm(-1)).toThrowError(RangeError);
        });
    });
});