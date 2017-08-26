import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as storage from './local-storage';

import './index.css';

import App from './app';
import reducer, { INITIAL_STATE } from './reducer';
import { run } from './actions';

const plugins = [
    thunk,
    process.env.NODE_ENV !== 'production' && createLogger({ collapsed: true }),
].filter(Boolean);

const savedState = storage.loadState();

const store = createStore(
    reducer,
    savedState
        ? {
            ...INITIAL_STATE,
            ...savedState,
        }
        : INITIAL_STATE,
    compose(
        applyMiddleware(...plugins),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
            ? window.devToolsExtension()
            : f => f,
    )
);

store.subscribe(() => {
    storage.saveState(store.getState());
});

const appRoot = document.getElementById('app-root');

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>,
    appRoot,
);

if (module.hot) {
    module.hot.accept('./app', () => {
        const UpdatedApp = require('./app').default; // eslint-disable-line global-require

        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <UpdatedApp />
                </Provider>
            </AppContainer>,
            appRoot,
        );
    });
}
