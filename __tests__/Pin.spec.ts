import Pin from './../src/Pin';

describe('Pin', () => {
    describe('constructor', () => {
        it('dose not throw Error if pin is not in use', () => {
            expect(() => { let pin: Pin = new Pin(9); }).not.toThrowError();
        });

        it('thorws Error when pin is in use', () => {
            expect(() => {
                let notInUse: Pin = new Pin(9);
                let innUse: Pin = new Pin(9);
            }).toThrowError(Error);
        });
    });
});