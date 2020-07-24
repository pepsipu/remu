import React from 'react';
import { ResultObject } from '@assemblyscript/loader';
import './App.css';

export default class App extends React.Component<any, any> {
  private wasmFns: WasmExports;

  constructor(props: { wasm: ResultObject }) {
    super(props);
    // @ts-ignore because ts wont know the exports at compile time
    const wasmFns: WasmExports = props.wasm.instance.exports;
    this.wasmFns = wasmFns;
  }

  render() {
    return (
      <p>
        epic
      </p>
    );
  }
}

interface WasmExports {
  loadProgram: () => void
}
