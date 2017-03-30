import SpecialPins from './SpecialPins';

export const physSpeciaPins: SpecialPins = {
    pwm: 12,
    clock: 7,
    i2c0: {
        sda: 27,
        scl: 28
    },
    i2c1: {
        sda: 3,
        scl: 5
    },
    spi0: {
        mosi: 19,
        miso: 21,
        sclk: 23,
        ce0: 29,
        ce1: 26
    },
    spi1: {
        mosi: 38,
        miso: 35,
        sclk: 40,
        ce0: 12,
        ce1: 11,
        ce2: 36
    },
    serial: {
        txd: 8,
        rxd: 10
    }
};

export default physSpeciaPins;