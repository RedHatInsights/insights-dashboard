import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AppZeroState from './AppZeroState';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock(
    '@redhat-cloud-services/frontend-components-utilities/interceptors',
    () => ({
        __esModule: true,
        useAxiosWithPlatformInterceptors: jest.fn()
    })
);

describe('AppZeroState component', () => {

    it('renders zero state if there ARE children but NO systems', async () => {
        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <Routes>
                    <Route path="/some-path" element={
                        <AppZeroState app="Advisor" customFetchResults={false}>
                            <div>
                                <div>testing here</div>
                            </div>
                        </AppZeroState>
                    } />
                </Routes>
            </MemoryRouter>
        );

        const zeroStateBanner = await screen.findByLabelText('ZeroStateBanner');
        expect(zeroStateBanner).toBeInTheDocument();
    });

    it('renders zero state if there NO children and NO systems', async () => {
        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <Routes>
                    <Route path="/some-path" element={
                        <AppZeroState app="Advisor" customFetchResults={false}/>
                    } />
                </Routes>
            </MemoryRouter>
        );
        const zeroStateBanner = await screen.findByLabelText('ZeroStateBanner');
        expect(zeroStateBanner).toBeInTheDocument();
    });

    it('renders zero state with custom component', async () => {
        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <Routes>
                    <Route path="/some-path" element={
                        <AppZeroState app="Advisor" customFetchResults={false} customSection={<div aria-label='custom-section'>hi</div>}>
                            <div>
                                <div>testing here</div>
                            </div>
                        </AppZeroState>
                    } />
                </Routes>
            </MemoryRouter>
        );

        const zeroStateBanner = await screen.findByLabelText('ZeroStateBanner');
        const customSection = await screen.findByLabelText('custom-section');

        expect(zeroStateBanner).toBeInTheDocument();
        expect(customSection).toBeInTheDocument();

    });

    it('DOES NOT RENDER zero state if there ARE children and SOME systems', async () => {
        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <Routes>
                    <Route path="/some-path" element={
                        <AppZeroState app="Advisor" customFetchResults={true} customSection={<div aria-label='custom-section'>hi</div>}>
                            <div>
                                <div>testing here</div>
                            </div>
                        </AppZeroState>
                    } />
                </Routes>
            </MemoryRouter>
        );
        const children = await screen.findByText('testing here');
        expect(children).toBeInTheDocument();
    });
});
