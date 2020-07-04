import * as mod from '.'
const {
  between,
  binary,
  longest,
  newAtIndex,
  pad,
  padList,
  sort,
  toDecimalList,
  toOrdinals,
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

describe('newAtIndex', () => {
  it('should add to the list, at index, with between value', () => {
    expect(newAtIndex([
      '0',
      '1',
    ], 1)).toEqual([
      '0',
      '10',
      '1',
    ])
  })
})

describe('sorting', () => {
  it('should sort a list correctly', () => {
    const unsorted = [
      '1000',
      '100',
      '100000',
      '10',
      '1',
      '0',
      '10000',
      '110',
      '111000',
      '101000',
      '11000',
    ]
    expect(sort(unsorted)).toEqual([
      '0',
      '100000',
      '10000',
      '1000',
      '101000',
      '11000',
      '111000',
      '100',
      '10',
      '110',
      '1',
    ])
  })
})

describe('to standard ordinal', () => {
  it('should return the list as regular decimals', () => {
    expect(toOrdinals([
      '0',
      '100000',
      '10000',
      '1000',
      '101000',
      '11000',
      '111000',
      '100',
      '10',
      '110',
      '1',
    ])).toEqual([
      0,
      1,
      2,
      4,
      5,
      6,
      7,
      8,
      16,
      24,
      32,
    ])
  })
})

const out = (() => {
  let result = ''
  const log = x => {
    result += '\n' + x + '\n'
  }
  log.read = () => result
  return log
})()

const debug = (x) => {
  const padRight = (length, value) => {
    while (value.length < length) {
      value += ' '
    }
    return value
  }
  const getLine = (revBinaries, ordinals, index) => {
    const length = longest(revBinaries)
    const revBinary = revBinaries[index]
    const ordinal = ordinals[index]
    const left = padRight(length, revBinary) + '  ' + ordinal
    return left
  }

  const ordinals = toOrdinals(x)

  out(x
    .map((_, i) => getLine(x, ordinals, i))
    .join('\n')
  )
}

let list = ['0', '1']
out('---')
debug(list)

for (let i = 0; i < 5; i++) {
  list = newAtIndex(list, 1)
  out('---')
  out('insert at index 1')
  debug(list)
}

list = newAtIndex(list, 4)
out('---')
out('insert at index 4')
debug(list)
list = newAtIndex(list, 4)
out('---')
out('insert at index 4')
debug(list)
list = newAtIndex(list, 6)
out('---')
out('insert at index 6')
debug(list)
list = newAtIndex(list, list.length -1)
out('---')
out(`insert at index ${list.length -1}`)
debug(list)


// out('list')
// debug(list)

console.log(out.read())
//
// // const naturalSort = [...list.sort()]
// // console.log('natural sort')
// // debug(naturalSort)
//
// const padded = [...padList(list)]
// const paddedAndReversed = padded.map(x => x.split('').reverse().join(''))
// console.log('paddedAndReversed')
// console.log(paddedAndReversed.join('\n'))
//
// const paddedReversedNaturalSort = [...paddedAndReversed.sort()]
// console.log('padded reversed natural sort')
// // console.log(paddedReversedNaturalSort.join('\n'))
// debug(paddedReversedNaturalSort)
//
// // const paddedNaturalSort = padded.sort()
// // console.log('padded natural sort')
// // debug(paddedNaturalSort)
