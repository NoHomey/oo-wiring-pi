import SpecialPins from './SpecialPins';

export const bcmSpeciaPins: SpecialPins = {
    pwm: 18,
    clock: 4,
    i2c0: {
        sda: 0,
        scl: 1
    },
    i2c1: {
        sda: 2,
        scl: 3
    },
    spi0: {
        mosi: 10,
        miso: 9,
        sclk: 11,
        ce0: 8,
        ce1: 7
    },
    spi1: {
        mosi: 20,
        miso: 14,
        sclk: 21,
        ce0: 18,
        ce1: 17,
        ce2: 16
    },
    serial: {
        txd: 14,
        rxd: 15
    }
};

export default bcmSpeciaPins;