import { CPU } from '../../cpu';
import { iType } from '../instructionUtils';

enum OpImmInstruction {
  Addi = 0b000,
  Slti = 0b010,
  Sltiu = 0b011,
  Xori = 0b100,
  Ori = 0b110,
}

export function executeOpImm(instruction: u32, cpu: CPU): void {
  const rd = iType.rd(instruction);
  const rs1 = iType.rs1(instruction);
  // no writes to x0
  if (!rd) return;
  switch (iType.fn(instruction)) {
    case OpImmInstruction.Addi:
      cpu.regs[rd] += cpu.regs[rs1] + iType.simm(instruction);
      break;
    case OpImmInstruction.Slti:
      cpu.regs[rd] = +((cpu.regs[rs1] as isize) < iType.simm(instruction));
      break;
    default:
      abort('unhandled op-imm instruction');
  }
}
