import AppEntry from './AppEntry';
import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root');

ReactDOM.render(<AppEntry />, root, () => root.setAttribute('data-ouia-safe', true));
