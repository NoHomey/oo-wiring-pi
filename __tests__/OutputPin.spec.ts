jest.mock('wiring-pi');
import { pinMode, OUTPUT, HIGH, LOW, digitalWrite } from 'wiring-pi';
import OutputPin from '../src/OutputPin';

describe('OutputPin', () => {
    describe('constructor', () => {
        it('sets the given pin as OUTPUT', () => {
            let pin: OutputPin = new OutputPin(9);
            expect(pinMode).toBeCalledWith(9, OUTPUT);
        });

        it('shouldn\'t throw if the given pin is not in use', () => {
            let pin: OutputPin;
            expect(() => pin = new OutputPin(6)).not.toThrowError();
        });

        it('thorws Error when pin is in use', () => {
            expect(() => {
                let notInUse: OutputPin = new OutputPin(8);
                let inUse: OutputPin = new OutputPin(8);
            }).toThrowError(Error);
        });
    });

    describe('release', () => {
        it('releases the pin which prevents errors to be thrown when constructing new instance', () => {
            expect(() => {
                let notInUse: OutputPin = new OutputPin(3);
                notInUse.release();
                let inUse: OutputPin = new OutputPin(3);
            }).not.toThrowError();
        });
    });

    describe('writing', () => {
        let pin: OutputPin;

        beforeEach(() => pin = new OutputPin(12));

        afterEach(() => pin.release());

        describe('write', () => {
            it('digitalWrites to the pin which was used when constructed', () => {
                pin.write(true);
                expect(digitalWrite).lastCalledWith(12, HIGH);
                pin.write(false);
                expect(digitalWrite).lastCalledWith(12, LOW);
            });
        });

        describe('high', () => {
            it('digitalWrites HIGH to the pin which was used when constructed', () => {
                pin.high();
                expect(digitalWrite).lastCalledWith(12, HIGH);
            });
        });
    });
});