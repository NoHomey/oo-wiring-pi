import Pin from './../src/Pin';

describe('Pin', () => {
    describe('constructor', () => {
        it('dose not throw Error if pin is not in use', () => {
            expect(() => { let pin: Pin = new Pin(9); }).not.toThrowError();
        });
    });
});