import { CPU } from '../cpu';
import { executeOpImm } from './rv32i/opimm';
import { executeLui } from './rv32i/lui';
import { executeAuipc } from './rv32i/auipc';
import { executeJal } from './rv32i/jal';

export enum OpTypes {
  Lui = 0b01101,
  Auipc = 0b00101,
  Jal = 0b11011,
  Jalr = 0b11001,
  OpImm = 0b00100,
}

export function getRV32IOpType(instruction: u32, size: u32): OpTypes {
  switch (size) {
    // ie. instruction[1:0] = 11
    case 4:
      return (instruction & 0b1111100) >> 2;
    default:
      abort('could not determine op type');
      return 0;
  }
}

export function executeRV32I(instruction: u32, instructionType: OpTypes, cpu: CPU): void {
  switch (instructionType) {
    case OpTypes.OpImm:
      executeOpImm(instruction, cpu);
      break;
    case OpTypes.Lui:
      executeLui(instruction, cpu);
      break;
    case OpTypes.Auipc:
      executeAuipc(instruction, cpu);
      break;
    case OpTypes.Jal:
      executeJal(instruction, cpu);
      break;
    default:
      abort('unhandled optype');
  }
}
