import { CPU } from '../../cpu';
import { extractBits, signExtend } from '../instructionUtils';

enum OpImmInstruction {
  Addi = 0b000,
  Slti = 0b010,
  Sltiu = 0b011,
  Xori = 0b100,
  Ori = 0b110,
}

export function executeOpImm(instruction: u32, cpu: CPU): void {
  // extract I-type fields
  const rd = extractBits(instruction, 7, 5);
  const rs1 = extractBits(instruction, 15, 5);
  const imm = extractBits(instruction, 20, 12);
  // no writes to x0
  if (!rd) return;
  // get fn bits
  switch (extractBits(instruction, 12, 3)) {
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
