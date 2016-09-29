jest.mock('wiring-pi');
import { pinMode, INPUT, PUD_OFF, INT_EDGE_SETUP, pullUpDnControl, wiringPiISR } from 'wiring-pi';
import { InterruptHandlerPin, Pull, Edge } from '../src/InterruptHandlerPin';

describe('InterruptHandlerPin', () => {
    describe('constructor', () => {
        describe('when only pin and handler are provided', () => {
            it('sets pin to input and confugures pull off and edge as setup and registers interrupt handler', () => {
                function handler(delta: number): void {
                    console.log(`interrupt after ${delta}`);
                }

                let pin: InterruptHandlerPin = new InterruptHandlerPin(1, handler);
                expect(pinMode).toBeCalledWith(1, INPUT);
                expect(pullUpDnControl).toBeCalledWith(1, PUD_OFF);
                expect(wiringPiISR).toBeCalledWith(1, INT_EDGE_SETUP, handler);
            });
        });
    });
});