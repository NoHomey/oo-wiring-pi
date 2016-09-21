export class Pin {
    private static inUse: Array<number> = [];
	
    public constructor(private pin: number) {
		if(Pin.inUse.indexOf(pin) !== -1) {
			throw new Error();	
		} else {
			Pin.inUse.push(pin);
		}
		this.pin = pin;
	}
}

export default Pin;