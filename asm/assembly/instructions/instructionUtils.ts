// @ts-ignore because decorators are valid here
@inline()
export function extractBits(num: usize, start: usize, end: usize): usize {
  return ((1 << (end - start)) - 1) & (num >> start);
}

// @ts-ignore because decorators are valid here
@inline()
export function extractBit(num: usize, bitPos: usize): usize {
  return num & (1 << bitPos);
}

export function signExtend(num: usize, len: usize): isize {
  if (extractBit(num, len)) {
    // negative
    return (~0 << len) | num;
  }
  // positive
  return num;
}
