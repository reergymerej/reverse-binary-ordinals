const reverse = x => x.split('').reverse().join('')

export const binary = {
  toDecimal(binaryString) {
    return parseInt(binaryString, 2)
  },
  fromReversed(str) {
    const reversed = reverse(str)
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

export const newAtIndex = (list, index) => {
  const newList = [...list]
  newList.splice(index,
    0,
    between(
      list[index-1],
      list[index]
    )
  )
  return newList
}

const dropLeadingZero = (x) => pad(1, x.replace(/^0*/, ''))

export const sort = (list) => {
  const padded = padList(list)
  const reversed = [...padded].map(reverse)
  const sorted = reversed.sort()
  const originalOrder = sorted.map(reverse)
  const trimmed = originalOrder.map(dropLeadingZero)
  return trimmed
}
