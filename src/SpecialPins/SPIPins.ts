export interface SPIPins {
    readonly mosi: number;
    readonly miso: number;
    readonly sclk: number;
    readonly ce0: number;
    readonly ce1: number;
    readonly ce2?: number;
}

export default SPIPins;