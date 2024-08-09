import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AppZeroState from './AppZeroState';
import { IntlProvider } from 'react-intl';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock(
    '@redhat-cloud-services/frontend-components-utilities/interceptors',
    () => ({
        __esModule: true,
        useAxiosWithPlatformInterceptors: jest.fn()
    })
);

const intlProviderConfig = {
    locale: 'en',
    messages: {}
};

describe('NewAppZeroState component', () => {

    it('renders zero state', async () => {
        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <IntlProvider {...intlProviderConfig}>
                    <Routes>
                        <Route path="/some-path" element={
                            <AppZeroState app="Advisor" customFetchResults={false}>
                                <div>
                                    <div>testing here</div>
                                </div>
                            </AppZeroState>
                        } />
                    </Routes>
                </IntlProvider>
            </MemoryRouter>
        );
        const zeroStateBanner = await screen.findByLabelText('ZeroStateBanner');
        expect(zeroStateBanner).toBeInTheDocument();
    });

    it('renders zero state with custom component', async () => {
        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <IntlProvider {...intlProviderConfig}>
                    <Routes>
                        <Route path="/some-path" element={
                            <AppZeroState app="Advisor" customFetchResults={false} customSection={<div aria-label='custom-section'>hi</div>}>
                                <div>
                                    <div>testing here</div>
                                </div>
                            </AppZeroState>
                        } />
                    </Routes>
                </IntlProvider>
            </MemoryRouter>
        );

        const zeroStateBanner = await screen.findByLabelText('ZeroStateBanner');
        const customSection = await screen.findByLabelText('custom-section');

        expect(zeroStateBanner).toBeInTheDocument();
        expect(customSection).toBeInTheDocument();

    });
});
