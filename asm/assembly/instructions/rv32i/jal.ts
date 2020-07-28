import { CPU } from '../../cpu';
import { jTypeImm } from '../instructionUtils';

export function executeJal(instruction: u32, cpu: CPU): void {
  const imm = jTypeImm(instruction);
  abort(imm.toString(16));
}
