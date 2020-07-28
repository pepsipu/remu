import { CPU } from '../../cpu';
import { extractBits } from '../instructionUtils';

export function executeLui(instruction: u32, cpu: CPU): void {
  // extract U-type fields
  const rd = extractBits(instruction, 7, 11) as u32;
  const imm = extractBits(instruction, 12, 32) as u32;
  cpu.regs[rd] = imm << 12;
}
