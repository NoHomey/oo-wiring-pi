export class Pin {
	private static inUse: Array<number> = [];
	
	public constructor(private pin: number) {
		if(Pin.inUse.indexOf(pin) !== -1) {
			throw new Error(`pin: ${pin} is in use, call .release() on the first instance constructed with pin: ${pin} to change pin mode or settings`);	
		} else {
			Pin.inUse.push(pin);
		}
		this.pin = pin;
	}

	public release(): void {
		Pin.inUse.splice(Pin.inUse.indexOf(this.pin), 1);
	}
}

export default Pin;