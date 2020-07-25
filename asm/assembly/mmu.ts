// MEM_SIZE is 128 mb and we can afford that much since static array has little overhead
const MEM_SIZE: i32 = 134217728;

export default class MMU {
  private mem: StaticArray<u8> = new StaticArray<u8>(MEM_SIZE);

  @inline()
  read<T>(address: usize): T {
    return load<T>(this.getMemoryPtr() + address);
  }

  @inline()
  write<T>(address: usize, value: T): void {
    store<T>(this.getMemoryPtr() + address, value);
  }

  @inline()
  getMemoryPtr(): usize {
    return changetype<usize>(this.mem);
  }
}
