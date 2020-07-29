import { CPU } from '../../cpu';
import { extractBits } from '../instructionUtils';

export function executeLui(instruction: u32, cpu: CPU): void {
  // extract U-type fields
  const rd = extractBits(instruction, 7, 5);
  const imm = extractBits(instruction, 12, 20);
  cpu.regs[rd] = imm << 12;
}
