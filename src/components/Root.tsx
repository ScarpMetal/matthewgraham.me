import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

export default class Root extends Component {
	render() {
		const { store, history } = this.props;
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ConnectedRouter>
			</Provider>
		);
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};
