import MMU from './mmu';

class CPU {
  private pc: usize = 0;

  private regs: StaticArray<usize> = new StaticArray(32);

  public mmu: MMU = new MMU();
}

export function loadProgram(): void {

}
