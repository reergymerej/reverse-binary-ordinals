export const binary = {
  toDecimal(binaryString) {
    return parseInt(binaryString, 2)
  },
  fromReversed(str) {
    const reversed = str.split('').reverse().join('')
    return this.toDecimal(reversed)
  },
}

export const pad = (length, str) => {
  while (str.length < length) {
    str = '0' + str
  }
  return str
}

export const between = (left, right) => {
  const length = Math.max(left.length, right.length)
  return '1' + pad(length, left)
}

export const longest = (list) => list.reduce((acc, value) =>
  Math.max(acc, value.length), 0)

export const toDecimalList = (list) => {
  let length = list[0].length
  return list
    .map(x => {
      if (length !== x.length) {
        throw new Error('pad values to have equal lengths')
      }
      return binary.fromReversed(x)
    })
}

export const padList = list => {
  const length = longest(list)
  return list.map(x => pad(length, x))
}
