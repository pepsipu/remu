import { CPU } from '../../cpu';
import { uType } from '../instructionUtils';

export function executeAuipc(instruction: u32, cpu: CPU): void {
  const rd = uType.rd(instruction);
  if (rd) cpu.regs[rd] = uType.imm(instruction) + cpu.pc;
}
