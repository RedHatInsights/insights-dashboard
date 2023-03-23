import { createContext } from 'react';
import { DashboardStore } from '../AppReducer';
import { compose } from 'redux';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import promiseMiddleware from 'redux-promise-middleware';
import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';

let registry;

const selectRows = (rows, selected) =>
    rows.map((row) => ({
        ...row,
        selected: selected.includes(row.id)
    }));

export const entitiesReducer = () =>
    applyReducerHash({
        ['INVENTORY_INIT']: () => ({
            rows: [],
            total: 0
        }),
        ['RESET_PAGE']: (state) => ({
            ...state,
            page: 1,
            perPage: 10,
            activeFilters: []
        }),
        ['SELECT_ENTITIES']: (state, { payload: { selected } }) => {
            return {
                ...state,
                rows: selectRows(state.rows || [], selected)
            };
        }
    });

export const RegistryContext = createContext({
    getRegistry: () => {}
});

export const init = (...middleware) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    registry = getRegistry(
        {},
        [...middleware, promiseMiddleware],
        composeEnhancers
    );
    registry.register({ DashboardStore, notifications: notificationsReducer });

    return registry;
};

export const getStore = () => registry.getStore();

export const register = (...args) => registry.register(...args);
