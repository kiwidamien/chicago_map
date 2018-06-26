import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SimpleExample from './map';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<SimpleExample />, document.getElementById('root'));
registerServiceWorker();
