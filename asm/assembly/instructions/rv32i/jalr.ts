import { CPU } from '../../cpu';
import { iType } from '../instructionUtils';

export function executeJalr(instruction: u32, cpu: CPU): void {
  const rd = iType.rd(instruction);
  if (rd) cpu.regs[rd] = cpu.pc + 4;
  cpu.pc += iType.simm(instruction) + (cpu.regs[iType.rs1(instruction)] as isize) - 4;
}
