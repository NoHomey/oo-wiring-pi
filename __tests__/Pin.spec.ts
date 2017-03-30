import Pin from './../src/Pin';

describe('Pin', () => {
    describe('constructor', () => {
        it('dose not throw Error if pin is not in use', () => {
            expect(() => { new Pin(9); }).not.toThrowError();
        });

        it('thorws Error when pin is in use', () => {
            expect(() => {
                new Pin(8);
                new Pin(8);
            }).toThrowError(Error);
        });

       it('thorws Error describing that pin is in use and to call .release() if pin change is wanted when pin is in use', () => {
            expect(() => {
                new Pin(6);
                new Pin(6);
            }).toThrowError('pin: 6 is allocated, call PinAllocator.release with the given pin or with the instace constructed with the given pin');
        });
    });

    describe('release', () => {
        it('releases the pin which prevents errors to be thrown when constructing new instance', () => {
            expect(() => {
                let notInUse: Pin = new Pin(3);
                notInUse.release();
                new Pin(3);
            }).not.toThrowError();
        });
    });
});