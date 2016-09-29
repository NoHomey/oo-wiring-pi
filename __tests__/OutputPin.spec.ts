jest.mock('wiring-pi');
import { pinMode, OUTPUT } from 'wiring-pi';
import OutputPin from '../src/OutputPin';

describe('OutputPin', () => {
    describe('constructor', () => {
        it('sets the given pin as OUTPUT', () => {
            let pin: OutputPin = new OutputPin(9);
            expect(pinMode).toBeCalledWith(9, OUTPUT);
        });
    });
});