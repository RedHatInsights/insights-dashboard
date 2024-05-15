import React from 'react';
import App from './App';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { init } from './Store';
import Api from './Utilities/Api';
import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';
import '@testing-library/jest-dom';

jest.mock('./Utilities/Api', () => ({
    ...jest.requireActual('./Utilities/Api'),
    get: jest.fn(() => ({
        data: { total: 0 }
    }))
})
);

jest.mock('./DashboardRoutes', () => ({
    ...jest.requireActual('./DashboardRoutes'),
    DashboardRoutes: jest.fn(() => (<div aria-label="Dashboard page"></div>))
})
);
jest.mock('./PresentationalComponents/ZeroState/ZeroState', () => ({
    __esModule: true,
    default: jest.fn(() => (<div aria-label="Zero state banner"></div>))
})
);

const renderDashboard = () => {
    render(<BrowserRouter>
        <IntlProvider>
            <Provider store={init().getStore()}><App /></Provider>
        </IntlProvider>
    </BrowserRouter>);
};

jest.useFakeTimers();
describe('App', () => {
    it('Should render zero state when there is no registered systems', async () =>  {
        renderDashboard();
        await waitFor(() =>
            expect(screen.getByLabelText('Zero state banner')).toBeVisible()
        );
    });
    it('Should render Dashboard page when there is one or more registered systems', async () =>  {
        Api.get.mockReturnValue(Promise.resolve({ data: { total: 10 } }));
        renderDashboard();
        await waitFor(() =>
            expect(screen.getByLabelText('Dashboard page')).toBeVisible()
        );
    });

    it('Should show loading page unless API request to check registered systems finish', async () =>  {
        Api.get.mockImplementation(() => new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: { total: 10 } });
            }, 1000);
        }));
        renderDashboard();
        expect(screen.getByText('Loading')).toBeVisible();

        jest.advanceTimersByTime(1000);
        await waitFor(() =>
            expect(screen.getByLabelText('Dashboard page')).toBeVisible()
        );
    });
});
