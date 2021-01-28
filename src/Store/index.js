import { DashboardStore } from '../AppReducer';
import { compose } from 'redux';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import promiseMiddleware from 'redux-promise-middleware';

let registry;

export const init = (...middleware) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    registry = getRegistry(
        {},
        [...middleware, promiseMiddleware],
        composeEnhancers
    );
    registry.register({ DashboardStore });

    return registry;
};

export const getStore = () => registry.getStore();

export const register = (...args) => registry.register(...args);

