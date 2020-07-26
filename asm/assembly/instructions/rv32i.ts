import { CPU, OpTypes } from '../cpu';
import { extractBits } from './instructionUtils';

enum OpImmInstruction {
  Addi = 0b000,
  Slti = 0b010,
  Sltiu = 0b011,
  Xori = 0b100,
  Ori = 0b110,
}

function executeOpImm(instruction: u32, cpu: CPU): void {
  // get fn bits
  switch (extractBits(instruction, 12, 14) as u32) {
    case OpImmInstruction.Addi: {
      const rd = extractBits(instruction, 7, 11) as u32;
      const rs1 = extractBits(instruction, 15, 19) as u32;
      const imm = extractBits(instruction, 20, 31) as u32;
      if (rd) cpu.regs[rd] += cpu.regs[rs1] + imm;
      break;
    }
    case OpImmInstruction.Slti: {
      const rd = extractBits(instruction, 7, 11);
      const rs1 = extractBits(instruction, 15, 19);
      const imm = extractBits(instruction, 20, 31);
      break;
    }
    default:
      abort('unhandled op-imm instruction');
  }
}

export function executeInstruction(instruction: u32, instructionType: OpTypes, cpu: CPU): void {
  switch (instructionType) {
    case OpTypes.OpImm:
      executeOpImm(instruction, cpu);
      break;
    default:
      abort('unhandled optype');
  }
}
