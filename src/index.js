import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container/Container'
import './Assets/index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Container/>
    , document.getElementById('root'));
registerServiceWorker();
