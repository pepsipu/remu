import MMU from './mmu';

enum OpTypes {
  Op = 0b01100,
  OpImm = 0b00100,
}

class CPU {
  private pc: usize = 0;

  private regs: StaticArray<usize> = new StaticArray(32);

  public mmu: MMU = new MMU();

  public step(): usize {
    const instruction = this.mmu.read<u16>(this.pc);
    const size = this.getInstructionSize(instruction);
    const instructionType = this.getInstructionOpType(instruction, size);
    return size;
  }

  public getInstructionOpType: (instruction: u16, size: usize) => OpTypes = (instruction, size) => {
    switch (size as u32) {
      // ie. instruction[1:0] = 11
      case 2:
        return (instruction & 0b1111100) >> 2;
      default:
        abort('could not determine op type');
        return 0;
    }
  };

  // refer to page 6 of the riscv spec v2.2 to find the instruction size diagram
  // returns how many bytes the instruction is
  public getInstructionSize: (instruction: u16) => usize = (instruction) => {
    if ((instruction & 0x3) === 0x3) {
      if ((instruction & 0x1f) === 0x1f) {
        if ((instruction & 0x3f) !== 0x1f) {
          if (((instruction & 0x7f) !== 0x3f)) {
            const offsetSize = instruction & 0x7000;
            if (offsetSize === 0x7000) {
              abort('wtf type of instruction did u give me');
            }
            return 10 + offsetSize * 2;
          }
          return 8;
        }
        return 6;
      }
      return 4;
    }
    return 2;
  };
}

const cpu: CPU = new CPU();

export function loadProgram(program: string): void {
  for (let i = 0; i < program.length; i += 1) {
    cpu.mmu.write<u8>(i, program.charCodeAt(i) as u8);
  }
}

export function debug(): u32 {
  return cpu.mmu.read<u32>(30);
}
