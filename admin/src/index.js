import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

ReactDOM.render(
	<MuiThemeProvider>
		<App />
	</MuiThemeProvider>, 
	document.getElementById('root')
);
registerServiceWorker();
