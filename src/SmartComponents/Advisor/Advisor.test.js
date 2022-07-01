import toJson from 'enzyme-to-json';
import Advisor from './Advisor';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mountWithIntl } from '../../../MiscHelper';
import { initialState } from '../../AppReducer'

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));

jest.mock('../../AppActions', () => ({
    ...jest.requireActual('../../AppActions'),
    advisorFetchStatsRecs: jest.fn(() => ({ type: null, payload: () => Promise.resolve({}) })),
    advisorFetchStatsSystems: jest.fn(() => ({ type: null, payload: () => Promise.resolve({}) })),
    advisorFetchIncidents: jest.fn(() => ({ type: null, payload: () => Promise.resolve({}) }))
}));

const mockState = {
    ...initialState
};

const initStore = (state) => {
    const customMiddleWare = () => next => action => {
        useSelector.mockImplementation(callback => {
            return callback({ DashboardStore: state });
        });
        next(action);
    };

    const mockStore = configureStore([customMiddleWare]);
    return mockStore({ DashboardStore: state });
};

let wrapper;
let store = initStore(mockState);

beforeEach(() => {
    console.error = () => {};

    store.clearActions();
    useSelector.mockImplementation(callback => {
        return callback({ DashboardStore: mockState });
    });
    wrapper = mountWithIntl(<Provider store={store}>
        <Router><Advisor /></Router>
    </Provider>);
});

afterEach(() => {
    useSelector.mockClear();
});

describe('Advisor', () => {
    it('Should match the snapshots', () => {
        expect(toJson(wrapper.update())).toMatchSnapshot();
    });
});

