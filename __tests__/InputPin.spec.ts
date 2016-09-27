jest.mock('wiring-pi');
import { pinMode, INPUT, HIGH, LOW, digitalRead } from 'wiring-pi';
import InputPin from '../src/InputPin';

type DigitalReadMock = jest.Mock<(pin: number) => number>;

describe('InputPin', () => {
    describe('constructor', () => {
        it('sets the given pin as INPUT', () => {
            let pin: InputPin = new InputPin(9);
            expect(pinMode).toBeCalledWith(9, INPUT);
        });

        it('shouldn\'t throw if the given pin is not in use', () => {
            let pin: InputPin;
            expect(() => pin = new InputPin(6)).not.toThrowError();
        });

        it('thorws Error when pin is in use', () => {
            expect(() => {
                let notInUse: InputPin = new InputPin(8);
                let inUse: InputPin = new InputPin(8);
            }).toThrowError(Error);
        });
    });

    describe('release', () => {
        it('releases the pin which prevents errors to be thrown when constructing new instance', () => {
            expect(() => {
                let notInUse: InputPin = new InputPin(3);
                notInUse.release();
                let inUse: InputPin = new InputPin(3);
            }).not.toThrowError();
        });
    });

    describe('reading', () => {
        let pin: InputPin;

        beforeEach(() => {
            (digitalRead as DigitalReadMock).mockReturnValueOnce(HIGH);
            pin = new InputPin(12);
        });

        describe('read', () => {
            it('digitalReads from the pin which was used when constructed', () => {
                expect(pin.read()).toBe(true);
            });
        });
    });
});