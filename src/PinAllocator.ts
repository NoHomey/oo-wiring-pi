export enum PinEnumerator {
    wpi,
    bcm,
    phys
}

export class PinAllocator {
    public static setup(pinEnumerator: PinEnumerator = PinEnumerator.wpi): void {
        switch(pinEnumerator) {

        }
    }
}

export default PinAllocator;