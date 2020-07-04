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
