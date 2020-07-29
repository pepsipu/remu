import { CPU } from '../../cpu';
import { jType } from '../instructionUtils';

export function executeJal(instruction: u32, cpu: CPU): void {
  const rd = jType.rd(instruction);
  if (rd) cpu.regs[rd] = cpu.pc + 4;
  // 4 will be added at the end so offset it by 4
  cpu.pc += jType.simm(instruction) - 4;
}
