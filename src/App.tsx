import React from 'react';
import './App.css';

const PROGRAM = '\x93\x00\x10\x00\xe7\x01\xc0\xff';

export default class App extends React.Component<any, any> {
  private readonly wasmExports: WasmExports;

  private readonly wasm: any;

  private readonly registers: Uint32Array;

  constructor(props: { wasm: any }) {
    super(props);
    const { wasm } = props;
    this.wasm = wasm;
    // @ts-ignore because ts wont know the exports at compile time
    this.wasmExports = wasm.exports;
    this.wasmExports.loadProgram(PROGRAM);
    // 33rd slot for pc
    this.registers = new Uint32Array(33);
  }

  render() {
    this.registers[32] = this.wasmExports.debug.readPc();
    return (
      <>
        <button
          type="button"
          onClick={() => {
            this.wasmExports.debug.step();
            this.forceUpdate();
          }}
        >
          step
        </button>
        <hr />
        <span>pc: 0x{this.registers[32].toString(16).padStart(8, '0')}</span>
        <hr />
        {[...Array(32)].map((_, i) => {
          // this is needed so we convert the register to an unsigned integer. otherwise,
          // this would have been significantly easier
          // btw, u cant map a uint32 arr to an element so use weird Array(32) hack
          this.registers[i] = this.wasmExports.debug.readRegister(i);
          return (
            <>
              <span>
                x{i}: 0x{this.registers[i].toString(16).padStart(8, '0')}
              </span>
              <br />
            </>
          );
        })}
      </>
    );
  }
}

interface WasmExports {
  Uint8ArrayId: { value: number },
  loadProgram: (program: any) => void,
  debug: {
    step: () => void,
    readRegister: (idx: number) => number,
    readPc: () => number,
  },
  __alloc: (size: number, id: number) => number,
  __retain: (ptr: number) => number,
  __release: (ptr: number) => void,
}
