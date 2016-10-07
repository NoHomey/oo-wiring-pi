import SpecialPins from './SpecialPins';

export const wpiSpecialPins: SpecialPins = {
    pwm: 1,
    clock: 7,
    i2c0: {
        sda: 30,
        scl: 31
    },
    i2c1: {
        sda: 8,
        scl: 9
    },
    spi0: {
        mosi: 12,
        miso: 31,
        sclk: 14,
        ce0: 10,
        ce1: 11
    },
    spi1: {
        mosi: 28,
        miso: 24,
        sclk: 29,
        ce0: 1,
        ce1: 0,
        ce2: 27
    },
    serial: {
        txd: 15,
        rxd: 16
    }
};

export default wpiSpecialPins;