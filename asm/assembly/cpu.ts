import MMU from './mmu';

class CPU {
  private pc: usize = 0;

  private regs: StaticArray<usize> = new StaticArray(32);

  public mmu: MMU = new MMU();

  public step = () => {
    const instruction = this.mmu.read<u16>(this.pc);
  };

  // refer to page 6 of the riscv spec v2.2 to find the instruction size diagram
  // returns how many bytes the instruction is
  public getInstructionSize = (instruction: u16): usize => {
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
    cpu.mmu.write<u8>(i, program.charCodeAt(i));
  }
}

export function read(address: usize): u8 {
  return cpu.mmu.read<u8>(address);
}
