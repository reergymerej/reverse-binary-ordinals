# reverse-binary-ordinals

[![Build Status](https://travis-ci.org/reergymerej/reverse-binary-ordinals.svg?branch=master)](https://travis-ci.org/reergymerej/reverse-binary-ordinals)
http://git.reergymerej.com/reverse-binary-ordinals

When inserting between existing values in a list of ordinals, you want avoid
updating the subsequent numbers to minimze the changes.

    0
    1
    (new value here)
    2
    3

Instead of

    0
    1
    2 (new)
    3 (updated)
    4 (updated)


This could be

    0
    1
    1.5 (new)
    2
    3

This just means "I'm between these two numbers."  What if you did it
differently?

    0
    (new value here)
    1

Instead of ints and floats, store the values as reversed binary strings.

    00  (0) updated
    10  (1) new
    01  (2) updated

Avoid the need to update others by making the leading zeroes optional.

     0  (0)
    10  (1) new
     1  (2)

This is really just changing how we interpret the values so they can mean
different things without changing them all.

    0
    10
    1

In some context, this can be read as

    0 (00)
    1 (10)
    2 (01)

In another context, it can be read as

    0 (0000)
    4 (0010)
    8 (0001)

Are these still useful to show an order, though?

    0
    100000
    10000
    1000
    101000
    11000
    111000
    100
    10
    110
    1

    000000
    100000
    010000
    001000
    101000
    011000
    111000
    000100
    000010
    000110
    000001

    0
    1
    2
    4
    5
    6
    7
    8
    16
    24
    32


## Natural sort

    0
    1
    10
    100
    1000
    10000
    100000
    101000
    110
    11000
    111000

    000000
    000001
    000010
    000100
    001000
    010000
    100000
    101000
    000110
    011000
    111000

    0
    32
    16
    8
    4
    2
    1
    5
    24
    6
    7

## Natural sort on padded list

    000000
    000001
    000010
    000100
    000110
    001000
    010000
    011000
    100000
    101000
    111000

    0
    32
    16
    8
    24
    4
    2
    6
    1
    5
    7

## Reverse then natural sort


Natural sort works for left-padded binary (in proper order).

We can do this by padding, reversing, sorting, reversing, converting to decimal.
That's a lot, though.  Can we hide it and still sort based on values like these?

## sorted

    0
    100000
    10000
    1000
    101000
    11000
    111000
    100
    10
    110
    1

## rando

    1000
    100
    100000
    10
    1
    0
    10000
    110
    111000
    101000
    11000


