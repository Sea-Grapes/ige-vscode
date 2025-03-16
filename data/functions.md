# `00`: 0x00 Null
Not an instruction (does nothing). Should be used whenever this pixel is meant to be part of the parameter from the previous pixel (this prevents this pixel from being accidentally ran as an instruction)

# `50`: 0x50 Offset
Ignores the next `G_1` pixels. Jumping 0 pixels makes the pointer land on where it currently is, then re-executes the offset instruction, soft-locking the proram in an infinite loop. This is to say that, whatever the pointer lands on will be executed before the pointer continues to move.

# `40`: 0x40 Goto
Goes to the specified address.
- `G_1`, `B_1`: The address to jump to.

```ige
# Goes to (0, 0)
40 00 00
```

# `A0`: 0xA0 Value mode
This pixel will be treated as a value, and won't be executed as any code. This comes in handy for certain instructions.

If this pixel is `0xA0`, the pixel will be treated as a VALUE, and will be read like this:
- `G_1`: The length, in bytes, of the value.
Every pixel after that will be read as a value. So if `G_1=0x04` (hex value of 4), then the value read will be the concatenation of `R_2,G_2,B_2,R_3`. This means `B_1` is ignored.

# `A1`: 0xA1 Variable mode
This pixel will be treated as a value, and won't be executed as any code. This comes in handy for certain instructions.

If this pixel is `0xA1`, the pixel will be treated as a VARIABLE, and will be read like this:
- `G_1`, `B_1`: The address of the variable.
- `G_2`: The length of the variable, in bytes.
- `B_2`: The amount of pixel offset to start reading the value from.
    - For example, if you read from AA AA with an offset of hex 0A, you'll instead read from AA B4 (0xAA + 0x0A = 0xB4)