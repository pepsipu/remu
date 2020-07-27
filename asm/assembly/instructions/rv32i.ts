import { CPU } from '../cpu';
import { extractBits, signExtend } from './instructionUtils';

enum OpImmInstruction {
  Addi = 0b000,
  Slti = 0b010,
  Sltiu = 0b011,
  Xori = 0b100,
  Ori = 0b110,
}

export enum OpTypes {
  Op = 0b01100,
  OpImm = 0b00100,
}

export function getRV32IOpType(instruction: u32, size: u32): OpTypes {
  switch (size) {
    // ie. instruction[1:0] = 11
    case 4:
      return (instruction & 0b1111100) >> 2;
    default:
      abort('could not determine op type');
      return 0;
  }
}

function executeOpImm(instruction: u32, cpu: CPU): void {
  const rd = extractBits(instruction, 7, 11) as u32;
  const rs1 = extractBits(instruction, 15, 19) as u32;
  const imm = extractBits(instruction, 20, 32) as u32;
  // get fn bits
  if (!rd) return;
  switch (extractBits(instruction, 12, 14) as u32) {
    case OpImmInstruction.Addi:
      cpu.regs[rd] += cpu.regs[rs1] + signExtend(imm, 11);
      break;
    case OpImmInstruction.Slti:
      cpu.regs[rd] = +((cpu.regs[rs1] as isize) < signExtend(imm, 11));
      break;
    default:
      abort('unhandled op-imm instruction');
  }
}

export function executeRV32I(instruction: u32, instructionType: OpTypes, cpu: CPU): void {
  switch (instructionType) {
    case OpTypes.OpImm:
      executeOpImm(instruction, cpu);
      break;
    default:
      abort('unhandled optype');
  }
}
