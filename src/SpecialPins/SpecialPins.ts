import I2CPins from './I2CPins';
import SPIPins from './SPIPins';
import SerialPins from './SerialPins';

export interface SpecialPins {
    readonly pwm: number;
    readonly clock: number;
    readonly i2c0: I2CPins;
    readonly i2c1: I2CPins;
    readonly spi0: SPIPins;
    readonly spi1: SPIPins;
    readonly serial: SerialPins;
}

export default SpecialPins;