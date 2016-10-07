import I2CPins from './I2CPins';
import SPIPins from './SPIPins';
import SerialPins from './SerialPins';

export interface SpecialPins {
    pwm: number;
    clock: number;
    i2c0: I2CPins;
    i2c1: I2CPins;
    spi0: SPIPins;
    spi1: SPIPins;
    serial: SerialPins;
}

export default SpecialPins;