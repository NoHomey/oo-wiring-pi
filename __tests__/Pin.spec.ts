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

       it('thorws Error describing that pin is in use and to call .release() if pin change is wanted when pin is in use', () => {
            expect(() => {
                let notInUse: Pin = new Pin(6);
                let inUse: Pin = new Pin(6);
            }).toThrowError('pin: 6 is in use, call .release() on the first instance constructed with pin: 6 to change pin mode or settings');
        });
    });

    describe('release', () => {
        it('releases the pin which prevents errors to be throw when constructing new instance', () => {
            expect(() => {
                let notInUse: Pin = new Pin(3);
                notInUse.release();
                let inUse: Pin = new Pin(3);
            }).not.toThrowError();
        });
    });
});