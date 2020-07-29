import MMU from './mmu';
import { executeRV32I, getRV32IOpType } from './instructions/rv32i';

export class CPU {
  public pc: usize = 0;

  public regs: StaticArray<usize> = new StaticArray(32);

  public mmu: MMU = new MMU();

  constructor() {
    // setup x0
    this.regs[0] = 0;
  }

  public step(): void {
    const instruction = this.mmu.read<u32>(this.pc);
    // const size = this.getInstructionSize(instruction);
    const size = 4;
    // switch (size) {
    //   case 4: {
    //     const instructionType = getRV32IOpType(instruction, size);
    //     executeRV32I(instruction, instructionType, this);
    //     break;
    //   }
    //   default:
    //     abort('bad size!!');
    // }
    const instructionType = getRV32IOpType(instruction, size);
    executeRV32I(instruction, instructionType, this);
    this.pc += size;
  }

  // refer to page 6 of the riscv spec v2.2 to find the instruction size diagram
  // returns how many bytes the instruction is
  // for now, we are always using 4 byte instructions so this is unnecessary
  // public getInstructionSize: (instruction: u32) => u32 = (instruction) => {
  //   if ((instruction & 0x3) === 0x3) {
  //     if ((instruction & 0x1f) === 0x1f) {
  //       if ((instruction & 0x3f) !== 0x1f) {
  //         if (((instruction & 0x7f) !== 0x3f)) {
  //           const offsetSize = instruction & 0x7000;
  //           if (offsetSize === 0x7000) {
  //             abort('wtf type of instruction did u give me');
  //           }
  //           return 10 + offsetSize * 2;
  //         }
  //         return 8;
  //       }
  //       return 6;
  //     }
  //     return 4;
  //   }
  //   return 2;
  // };
}

const cpu: CPU = new CPU();

export function loadProgram(program: string): void {
  for (let i = 0; i < program.length; i += 1) {
    cpu.mmu.write<u8>(i, program.charCodeAt(i) as u8);
  }
}

/* eslint-disable no-inner-declarations */
export namespace debug {
  export function step(): void {
    cpu.step();
  }

  export function readRegister(idx: i32): u32 {
    return cpu.regs[idx] as u32;
  }

  export function readPc(): u32 {
    return cpu.pc as u32;
  }
}
/* eslint-enable no-inner-declarations */
