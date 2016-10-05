jest.mock('wiring-pi');
import { softToneCreate } from 'wiring-pi';
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
});