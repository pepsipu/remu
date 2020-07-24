import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const { AsBind } = require('as-bind');

AsBind.instantiate(fetch('./remu.wasm')).then((wasm: any) => {
  ReactDOM.render(
    <App wasm={wasm} />,
    document.getElementById('root'),
  );
});
