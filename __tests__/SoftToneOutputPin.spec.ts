jest.mock('wiring-pi');
import { softToneCreate } from 'wiring-pi';
import SoftToneOutputPin from '../src/SoftToneOutputPin';

describe('SoftToneOutputPin', () => {
    it('creates soft tone on the given pin', () => {
        let pin: SoftToneOutputPin = new SoftToneOutputPin(1);
        expect(softToneCreate).toBeCalledWith(pin);
    });
});