import React from 'react';
import ReactDOM from 'react-dom';
import { instantiateStreaming } from '@assemblyscript/loader';
import './index.css';
import App from './App';

instantiateStreaming(fetch('./remu.wasm')).then((wasm) => {
  ReactDOM.render(
    <App wasm={wasm} />,
    document.getElementById('root'),
  );
});
