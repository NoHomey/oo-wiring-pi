jest.mock('wiring-pi');
import { softToneCreate, softToneStop, softToneWrite } from 'wiring-pi'; 
import SoftToneOutputPin from '../src/SoftToneOutputPin';

type SoftToneCreateMock = jest.Mock<(pin: number) => number>;

(softToneCreate as SoftToneCreateMock).mockImplementation(() => 0);

describe('SoftToneOutputPin', () => {
    describe('constructor', () => {
        it('throws Error if softToneCreate returns non-zero result', () => {
            (softToneCreate as SoftToneCreateMock).mockReturnValueOnce(() => -1);
            expect(() => { let pin: SoftToneOutputPin = new SoftToneOutputPin(1) }).toThrowError(Error);
        });

        it('throws descriptive Error if softToneCreate returns non-zero result', () => {
            (softToneCreate as SoftToneCreateMock).mockReturnValueOnce(() => -1);
            expect(() => { let pin: SoftToneOutputPin = new SoftToneOutputPin(2) }).toThrowError('Could not set pin: 2 as SoftwareToneOutputPin');
        });

        it('creates soft tone on the given pin', () => {
            let pin: SoftToneOutputPin = new SoftToneOutputPin(4);
            expect(softToneCreate).toBeCalledWith(4);
        });
    });

    describe('release', () => {
        it('releases the pin which prevents errors to be thrown when constructing new instance', () => {
            expect(() => {
                let notInUse: SoftToneOutputPin = new SoftToneOutputPin(5);
                notInUse.release();
                let inUse: SoftToneOutputPin = new SoftToneOutputPin(5);
            }).not.toThrowError(Error);
        });

        it('stops the soft tone on the constructed pin', () => {
            let pin: SoftToneOutputPin = new SoftToneOutputPin(6);
            pin.release();
            expect(softToneStop).toBeCalledWith(6);
        });
    });

    describe('tone', () => {
        let pin: SoftToneOutputPin = new SoftToneOutputPin(7);

        it('thorws RangeError if tone value is not in range [0..5000]', () => {
            expect(() => pin.tone(-1)).toThrowError(RangeError);
            expect(() => pin.tone(5001)).toThrowError(RangeError);
        });

        it('thorws descriptive RangeError if tone value is not in range [0..5000]', () => {
            expect(() => pin.tone(-1)).toThrowError('value must be in range [0..5000], -1 is not in range [0..5000]');
            expect(() => pin.tone(5001)).toThrowError('value must be in range [0..5000], 5001 is not in range [0..5000]');
        });

        it('calls softToneWrite with passed pwm value and constructed pin', () => {
            pin.tone(4999);
            expect(softToneWrite).toBeCalledWith(7, 4999);
        });
    });
});