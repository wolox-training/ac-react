import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container/Container'
import {BrowserRouter} from 'react-router-dom'
import './Assets/index.css';
import './Assets/fonts/anim.css';
import './Assets/fontawesome.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Container/>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
