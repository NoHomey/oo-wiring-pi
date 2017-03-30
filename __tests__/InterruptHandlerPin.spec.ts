jest.mock('wiring-pi');
import { pinMode, INPUT, PUD_OFF, PUD_UP, PUD_DOWN, INT_EDGE_SETUP, INT_EDGE_RISING, INT_EDGE_BOTH, INT_EDGE_FALLING, pullUpDnControl, wiringPiISR, wiringPiISRCancel } from 'wiring-pi';
import { InterruptHandlerPin, Pull, Edge } from '../src/InterruptHandlerPin';

describe('InterruptHandlerPin', () => {
    function handler(delta: number): void {
        console.log(`interrupt after ${delta}`);
    }

    describe('constructor', () => {
        describe('when only pin and handler are provided', () => {
            it('sets pin to input and confugures pull off and and registers interrupt handler for the given pin with INT_EDGE_SETUP', () => {
                new InterruptHandlerPin(1, handler);
                expect(pinMode).toBeCalledWith(1, INPUT);
                expect(pullUpDnControl).toBeCalledWith(1, PUD_OFF);
                expect(wiringPiISR).toBeCalledWith(1, INT_EDGE_SETUP, handler);
            });
        });

        describe('when only edge is not provided', () => {
            it('sets pin to input and confugures pull up/down control and registers interrupt handler for the given pin with INT_EDGE_SETUP', () => {
                new InterruptHandlerPin(2, handler, Pull.Up);
                expect(pinMode).toBeCalledWith(2, INPUT);
                expect(pullUpDnControl).toBeCalledWith(2, PUD_UP);
                expect(wiringPiISR).toBeCalledWith(2, INT_EDGE_SETUP, handler);
            });
        });

        describe('when pin, handler, pull adn edge are provided', () => {
            it('sets pin to input and confugures pull up/down control registers interrupt handler for the given pin with INT_EDGE_RISING when edge is Edge.Rising', () => {
                new InterruptHandlerPin(3, handler, Pull.Down, Edge.Rising);
                expect(pinMode).toBeCalledWith(3, INPUT);
                expect(pullUpDnControl).toBeCalledWith(3, PUD_DOWN);
                expect(wiringPiISR).toBeCalledWith(3, INT_EDGE_RISING, handler);
            });

            it('sets pin to input and confugures pull up/down control registers interrupt handler for the given pin with INT_EDGE_BOTH when edge is Edge.Both', () => {
                new InterruptHandlerPin(4, handler, Pull.Up, Edge.Both);
                expect(pinMode).toBeCalledWith(4, INPUT);
                expect(pullUpDnControl).toBeCalledWith(4, PUD_UP);
                expect(wiringPiISR).toBeCalledWith(4, INT_EDGE_BOTH, handler);
            });

            it('sets pin to input and confugures pull up/down control registers interrupt handler for the given pin with INT_EDGE_FALLING when edge is Edge.Falling', () => {
                new InterruptHandlerPin(5, handler, Pull.Down, Edge.Falling);
                expect(pinMode).toBeCalledWith(5, INPUT);
                expect(pullUpDnControl).toBeCalledWith(5, PUD_DOWN);
                expect(wiringPiISR).toBeCalledWith(5, INT_EDGE_FALLING, handler);
            });

            it('sets pin to input and confugures pull up/down control registers interrupt handler for the given pin with INT_EDGE_SETUP when edge is Edge.Setup', () => {
                new InterruptHandlerPin(6, handler, Pull.Up, Edge.Setup);
                expect(pinMode).toBeCalledWith(6, INPUT);
                expect(pullUpDnControl).toBeCalledWith(6, PUD_UP);
                expect(wiringPiISR).toBeCalledWith(6, INT_EDGE_SETUP, handler);
            });
        });
    });

    describe('release', () => {
        it('releases the pin which prevents errors to be thrown when constructing new instance', () => {
            expect(() => {
                let notInUse: InterruptHandlerPin = new InterruptHandlerPin(7, handler);
                notInUse.release();
                new InterruptHandlerPin(7, handler);
            }).not.toThrowError();
        });

        it('removes the inpterupt handler on the constructed pin throughout a call to wiringPiISRCancel', () => {
            let pin: InterruptHandlerPin = new InterruptHandlerPin(8, handler);
            pin.release();
            expect(wiringPiISRCancel).toBeCalledWith(8);
        });
    });
});