jest.mock('wiring-pi');
import { pinMode, INPUT, PUD_OFF, PUD_UP, INT_EDGE_SETUP, pullUpDnControl, wiringPiISR } from 'wiring-pi';
import { InterruptHandlerPin, Pull, Edge } from '../src/InterruptHandlerPin';

describe('InterruptHandlerPin', () => {
    describe('constructor', () => {
        function handler(delta: number): void {
            console.log(`interrupt after ${delta}`);
        }

        describe('when only pin and handler are provided', () => {
            it('sets pin to input and confugures pull off and edge as setup and registers interrupt handler for the given pin', () => {
                let pin: InterruptHandlerPin = new InterruptHandlerPin(1, handler);
                expect(pinMode).toBeCalledWith(1, INPUT);
                expect(pullUpDnControl).toBeCalledWith(1, PUD_OFF);
                expect(wiringPiISR).toBeCalledWith(1, INT_EDGE_SETUP, handler);
            });
        });

        describe('when only edge is not provided', () => {
            it('sets pin to input and confugures pull up/down control and edge as setup and registers interrupt handler for the given pin', () => {
                let pin: InterruptHandlerPin = new InterruptHandlerPin(2, handler, Pull.Up);
                expect(pinMode).toBeCalledWith(2, INPUT);
                expect(pullUpDnControl).toBeCalledWith(2, PUD_UP);
                expect(wiringPiISR).toBeCalledWith(2, INT_EDGE_SETUP, handler);
            });
        });
    });
});