import { CPU } from '../../cpu';
import { extractBits } from '../instructionUtils';

export function executeAuipc(instruction: u32, cpu: CPU): void {
  const rd = extractBits(instruction, 7, 5);
  const imm = extractBits(instruction, 12, 20);
  cpu.regs[rd] = (imm << 12) as usize + cpu.pc;
}
