// testing the calculator

const calculator = require('../calculator');

// test if 1+2 equals 3
test('adds 1 to 2 equal 3', () => {
    expect(calculator.sum(1,2)).toBe(3)
})

// test if 3-2 equals 1 
test('subtrakts 3 minus 2 equal 1', () => {
    expect(calculator.sub(3,2)).toBe(1)
})
