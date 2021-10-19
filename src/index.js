import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'styles/main.scss';
import { Provider } from 'react-redux'
import { store } from 'redux/store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'components/layout/AlertTemplate';

const options = {
	// you can also just use 'bottom center'
	position: positions.TOP_RIGHT,
	timeout: 5000,
	offset: '5px',
	// you can also just use 'scale'
	transition: transitions.FADE
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AlertProvider template={AlertTemplate} {...options}>
				<App />
			</AlertProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
