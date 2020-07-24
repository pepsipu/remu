import React from 'react';
import { ResultObject } from '@assemblyscript/loader';
import './App.css';

function App(props: { wasm: ResultObject }) {
  const { wasm } = props;
  // @ts-ignore because ts wont know the exports at compile time
  const wasmFns: WasmExports = wasm.instance.exports;
  return (
    <p>
      {wasmFns.add(1, 2)}
    </p>
  );
}

interface WasmExports {
  add: (a: number, b: number) => number
}

export default App;
