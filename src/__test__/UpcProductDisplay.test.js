import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/rootReducer';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import UpcProductDisplay from '../components/UpcProductDisplay';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

it('renders without crashing', function () {
	render(
		<Provider store={store}>
			<BrowserRouter>
            <UpcProductDisplay />
			</BrowserRouter>
		</Provider>
	);
});

it('matches snapshot', function () {
	const { asFragment } = render(
		<Provider store={store}>
			<BrowserRouter>
				<UpcProductDisplay />
			</BrowserRouter>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});