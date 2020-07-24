import MMU from './mmu';

class CPU {
  private pc: usize = 0;

  private regs: StaticArray<usize> = new StaticArray(32);

  public mmu: MMU = new MMU();
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
