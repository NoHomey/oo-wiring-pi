export interface WritablePin<W> {
    write(state: W): void;
}

export default WritablePin;