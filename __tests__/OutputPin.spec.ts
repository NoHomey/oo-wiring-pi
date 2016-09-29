jest.mock('wiring-pi');
import { pinMode, OUTPUT, HIGH, LOW, digitalWrite } from 'wiring-pi';
import OutputPin from '../src/OutputPin';

describe('OutputPin', () => {
    describe('constructor', () => {
        it('sets the given pin as OUTPUT', () => {
            let pin: OutputPin = new OutputPin(9);
            expect(pinMode).toBeCalledWith(9, OUTPUT);
        });
    });

    describe('writing', () => {
        let pin: OutputPin;

        beforeEach(() => pin = new OutputPin(12));

        afterEach(() => pin.release());

        describe('high', () => {
            it('digitalWrites HIGH to the pin which was used when constructed', () => {
                pin.high();
                expect(digitalWrite).lastCalledWith(12, HIGH);
            });
        });

        describe('low', () => {
            it('digitalWrites LOW to the pin which was used when constructed', () => {
                pin.low();
                expect(digitalWrite).lastCalledWith(12, LOW);
            });
        });
    });
});