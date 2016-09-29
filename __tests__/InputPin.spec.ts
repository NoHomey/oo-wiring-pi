jest.mock('wiring-pi');
import { pinMode, INPUT, HIGH, LOW, PUD_OFF, PUD_UP, PUD_DOWN, digitalRead, pullUpDnControl, pulseIn } from 'wiring-pi';
import { InputPin, Pull } from '../src/InputPin';

type DigitalReadMock = jest.Mock<(pin: number) => number>;
type PulseInMock = jest.Mock<(pin: number, state: number) => number>;

describe('InputPin', () => {
    describe('constructor', () => {
        it('sets the given pin as INPUT', () => {
            let pin: InputPin = new InputPin(9);
            expect(pinMode).toBeCalledWith(9, INPUT);
        });

        it('sets pullUpDnControl to PUD_OFF if no pull up/down is passed', () => {
            let pin: InputPin = new InputPin(1);
            expect(pullUpDnControl).toBeCalledWith(1, PUD_OFF);
        });

        it('sets pullUpDnControl to PUD_UP if pull is Pull.Up', () => {
            let pin: InputPin = new InputPin(2, Pull.Up);
            expect(pullUpDnControl).toBeCalledWith(2, PUD_UP);
        });

        it('sets pullUpDnControl to PUD_DOWN if pull is Pull.Down', () => {
            let pin: InputPin = new InputPin(4, Pull.Down);
            expect(pullUpDnControl).toBeCalledWith(4, PUD_DOWN);
        });
    });

    describe('reading', () => {
        let pin: InputPin;

        beforeEach(() => pin = new InputPin(12));

        afterEach(() => pin.release());

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

        describe('pulseInHighToLow', () => {
            it('pulses in HIGH to LOW by calling pulseIn with the constructed pin and HIGH', () => {
                (pulseIn as PulseInMock).mockReturnValueOnce(23);
                expect(pin.pulseInHighToLow()).toBe(23);
                expect(pulseIn).toBeCalledWith(12, HIGH);
            });
        });

        describe('pulseInLowToHigh', () => {
            it('pulses in LOW to HIGH by calling pulseIn with the constructed pin and LOW', () => {
                (pulseIn as PulseInMock).mockReturnValueOnce(12);
                expect(pin.pulseInLowToHigh()).toBe(12);
                expect(pulseIn).toBeCalledWith(12, LOW);
            });
        });
    });
});