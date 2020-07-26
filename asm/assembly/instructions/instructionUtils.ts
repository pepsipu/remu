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

// @ts-ignore
@inline()
export function extractIType(instruction: u32): Array<u32> {
  const rd = extractBits(instruction, 7, 11);
  const rs1 = extractBits(instruction, 15, 19);
  const imm = extractBits(instruction, 20, 32);
  return [rd, rs1, imm];
}
