jest.mock('wiring-pi');
import { pinMode, INPUT, HIGH, LOW, PUD_OFF, digitalRead, pullUpDnControl } from 'wiring-pi';
import InputPin from '../src/InputPin';

type DigitalReadMock = jest.Mock<(pin: number) => number>;

describe('InputPin', () => {
    describe('constructor', () => {
        it('sets the given pin as INPUT and pullUpDnControl to PUD_OFF', () => {
            let pin: InputPin = new InputPin(9);
            expect(pinMode).toBeCalledWith(9, INPUT);
            expect(pullUpDnControl).toBeCalledWith(9, PUD_OFF);
        });

        it('sets pullUpDnControl to PUD_OFF if no pull up/down is passed', () => {
            let pin: InputPin = new InputPin(1);
            expect(pullUpDnControl).toBeCalledWith(1, PUD_OFF);
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

        beforeEach(() => pin = new InputPin(12));

        afterEach(() => pin.release());

        describe('read', () => {
            beforeEach(() => {
                (digitalRead as DigitalReadMock).mockReturnValueOnce(HIGH);
                (digitalRead as DigitalReadMock).mockReturnValueOnce(LOW);
            });

            it('digitalReads from the pin which was used when constructed', () => {
                expect(pin.read()).toBe(true);
                expect(digitalRead).lastCalledWith(12);
                expect(pin.read()).toBe(false);
                expect(digitalRead).lastCalledWith(12);
            });
        });

        describe('isHigh', () => {
            it('returns true when digitalRead value is HIGH', () => {
                (digitalRead as DigitalReadMock).mockReturnValueOnce(HIGH);
                expect(pin.isHigh()).toBe(true);
                expect(digitalRead).toBeCalledWith(12);
            });

            it('returns false when digitalRead value is LOW', () => {
                (digitalRead as DigitalReadMock).mockReturnValueOnce(LOW);
                expect(pin.isHigh()).toBe(false);
                expect(digitalRead).toBeCalledWith(12);
            });
        });

        describe('isLow', () => {
            it('returns true when digitalRead value is LOW', () => {
                (digitalRead as DigitalReadMock).mockReturnValueOnce(LOW);
                expect(pin.isLow()).toBe(true);
                expect(digitalRead).toBeCalledWith(12);
            });

            it('returns false when digitalRead value is HIGH', () => {
                (digitalRead as DigitalReadMock).mockReturnValueOnce(HIGH);
                expect(pin.isLow()).toBe(false);
                expect(digitalRead).toBeCalledWith(12);
            });
        });
    });
});