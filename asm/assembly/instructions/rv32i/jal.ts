import { CPU } from '../../cpu';
import { extractBits, jTypeImm } from '../instructionUtils';

export function executeJal(instruction: u32, cpu: CPU): void {
  const imm: isize = jTypeImm(instruction);
  const rd = extractBits(instruction, 7, 5);
  if (rd) cpu.regs[rd] = cpu.pc + 4;
  cpu.pc += imm - 4;
}
