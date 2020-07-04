import * as mod from '.'
const {
  between,
  binary,
  longest,
  pad,
  padList,
  toDecimalList,
} = mod

describe('binary', () => {
  it('should return base-10 from binary string', () => {
    expect(binary.toDecimal('111')).toBe(7)
    expect(binary.toDecimal('110')).toBe(6)
    expect(binary.toDecimal('100')).toBe(4)
  })

  it('should return base-10 from reversed binary string', () => {
    expect(binary.fromReversed('111')).toBe(7)
    expect(binary.fromReversed('110')).toBe(3)
    expect(binary.fromReversed('100')).toBe(1)
  })
})

describe('pad', () => {
  it('should left-pad 0 to create a specified length', () => {
    expect(pad(4, '')).toBe('0000')
    expect(pad(4, '1')).toBe('0001')
    expect(pad(4, '1000')).toBe('1000')
    expect(pad(8, '1000')).toBe('00001000')
  })
})

describe('getBetween', () => {
  it('should return the reversed binary string between two others', () => {
    expect(between(
      '0',
      '1',
    )).toBe('10')
    expect(between(
      '00', // 0
      '10', // 1
    )).toBe(
      // 000 - 0
      '100' // 1
      // 010 - 2
    )
  })

  it('should work without leading 0s', () => {
    expect(between(
      '0', // 0
      '10', // 1
    )).toBe(
      // 000 - 0
      '100' // 1
      // 010 - 2
    )
  })

  it('should select the value in the middle of a big gap', () => {
    expect(between(
      '10', // 0010
      '1', // 0001
    )).toBe(
      // 0010 - 4
      '110' // 6
      // 0001 - 8
    )
  })

  it('should work regardless of scale', () => {
    expect(between(
      '10',  // 0010
      '110', // 0110
    )).toBe(
      // 0010 - 4
      '1010' // 5
      // 0110 - 6
    )
    expect(between(
      '10',  // 000010 - 16
      //     // 001010 - 20
      '110', // 000110 - 24
    )).toBe(
      // 000010 - 16
      '1010' // 20
      // 000110 - 24
    )
  })
})

describe('toDecimalList', () => {
  it('should throw if the entries are incosistent lengths', () => {
    expect(() => {
      const list = ['0', '1000', '100', '10', '1']
      toDecimalList(list)
    }).toThrow(/pad/)
  })

  it('should return the values as decimals', () => {
    const list = ['0', '1000', '100', '10', '1']
    const length = longest(list)
    const paddedList = list.map(x => pad(length, x))
    expect(toDecimalList(paddedList)).toEqual([
      0, 1, 2, 4, 8
    ])
  })
})

describe('padList', () => {
  it('should pad all values based on the longest', () => {
    expect(padList(['0', '1000', '100', '10', '1']))
      .toEqual([
        '0000',
        '1000',
        '0100',
        '0010',
        '0001',
      ])
  })
})

const list = ['0', '1']
for (let i = 0; i < 3; i++) {
  const next = between(list[0], list[1])
  list.splice(1, 0, next)
}

// console.log(list)
// console.log(padList(list))
// console.log(toDecimalList(padList(list)))
