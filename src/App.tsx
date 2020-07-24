import React from 'react';
import './App.css';

const PROGRAM = '\x41';

export default class App extends React.Component<any, any> {
  private readonly wasmExports: WasmExports;

  private readonly wasm: any;

  constructor(props: { wasm: any }) {
    super(props);
    const { wasm } = props;
    this.wasm = wasm;
    // @ts-ignore because ts wont know the exports at compile time
    this.wasmExports = wasm.exports;
    this.wasmExports.loadProgram(PROGRAM);
  }

  render() {
    return (
      <p>
        {this.wasmExports.read(0)}
      </p>
    );
  }
}

interface WasmExports {
  Uint8ArrayId: { value: number },
  loadProgram: (program: any) => void,
  read: (address: number) => number,
  __alloc: (size: number, id: number) => number,
  __retain: (ptr: number) => number,
  __release: (ptr: number) => void,
}
