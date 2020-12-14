import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/rootReducer';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

const store = createStore(rootReducer);

it('renders without crashing', function () {
	render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);
});

it('matches snapshot', function () {
	const { asFragment } = render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});