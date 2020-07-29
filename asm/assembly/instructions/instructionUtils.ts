// @ts-ignore because decorators are valid here
@inline()
export function extractBits(num: usize, start: usize, amount: u32): u32 {
  return (((1 << amount) - 1) & (num >> start) as u32);
}

// @ts-ignore because decorators are valid here
@inline()
export function extractBit(num: usize, bitPos: usize): u32 {
  return ((num & (1 << bitPos)) >> bitPos) as u32;
}

export function signExtend(num: usize, len: usize): isize {
  if (extractBit(num, len)) {
    // negative
    return (~0 << len) | num;
  }
  // positive
  return num;
}

export namespace jType {
  export const imm = (instruction: usize): isize => {
    const b12to19 = extractBits(instruction, 12, 8);
    const b11 = extractBit(instruction, 20);
    const b1to10 = extractBits(instruction, 21, 10);
    const b20 = extractBit(instruction, 31);
    return (b1to10 << 1) | (b11 << 11) | (b12to19 << 12) | (b20 << 20);
  };
  export const simm = (instruction: usize): isize => signExtend(instruction, 20);
  export const rd = (instruction: usize): u32 => extractBits(instruction, 7, 5);
}

export namespace uType {
  export const imm = (instruction: usize): usize => extractBits(instruction, 12, 20) << 12;
  export const rd = (instruction: usize): u32 => extractBits(instruction, 7, 5);
}

export namespace iType {
  export const imm = (instruction: usize): usize => extractBits(instruction, 20, 12);
  export const simm = (instruction: usize): isize => signExtend(iType.imm(instruction), 11);
  export const rd = (instruction: usize): u32 => extractBits(instruction, 7, 5);
  export const rs1 = (instruction: usize): u32 => extractBits(instruction, 15, 5);
  export const fn = (instruction: usize): u32 => extractBits(instruction, 12, 3);
}
