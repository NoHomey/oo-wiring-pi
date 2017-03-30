import Releasable from './Releasable';
import PinAllocator from './PinAllocator';

export class Pin implements Releasable {
	public constructor(protected pin: number) {
		PinAllocator.allocate(pin);
	}

	public release(): void {
		PinAllocator.release(this.pin);
	}
}

export default Pin;