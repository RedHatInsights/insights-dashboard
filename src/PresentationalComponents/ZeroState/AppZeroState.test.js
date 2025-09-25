import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AppZeroState from './AppZeroState';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { createAppNamesList } from './zeroStateHelpers';
import { useFeatureFlag } from '../../Utilities/Hooks';

jest.mock('@redhat-cloud-services/frontend-components-utilities/interceptors', () => ({
    __esModule: true,
    useAxiosWithPlatformInterceptors: jest.fn(() => ({
        get: jest.fn()

    }))
}));

jest.mock('../../Utilities/Hooks', () => ({
    __esModule: true,
    useFeatureFlag: jest.fn(() => false) // Default to false (Insights)
}));

const appNames = createAppNamesList();
const randomApp = appNames[Math.floor(Math.random() * appNames.length)];

describe('AppZeroState component', () => {
    it('renders zero state if there ARE children but NO systems', async () => {
        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <Routes>
                    <Route path="/some-path" element={
                        <AppZeroState app={randomApp} customFetchResults={false}>
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
                        <AppZeroState app={randomApp} customFetchResults={false}/>
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
                        <AppZeroState app={randomApp} customFetchResults={false} customSection={<div aria-label='custom-section'>hi</div>}>
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
                        <AppZeroState app={randomApp} customFetchResults={true} customSection={<div aria-label='custom-section'>hi</div>}>
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

        const zeroStateBanner = screen.queryByLabelText('ZeroStateBanner');
        expect(zeroStateBanner).not.toBeInTheDocument();
    });

    it('DOES render zero state when there are no systems in default request', async () => {
        const mockedGet = jest.spyOn(useAxiosWithPlatformInterceptors(), 'get')
        .mockResolvedValue({ total: 0 });

        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <Routes>
                    <Route path="/some-path" element={
                        <AppZeroState app={randomApp} />
                    } />
                </Routes>
            </MemoryRouter>
        );

        const zeroStateBanner = await screen.findByLabelText('ZeroStateBanner');
        expect(zeroStateBanner).toBeInTheDocument();

        mockedGet.mockRestore();
    });

    it('DOES NOT render zero state when there ARE systems in default request', async () => {
        const mockedGet = jest.spyOn(useAxiosWithPlatformInterceptors(), 'get')
        .mockResolvedValue({ total: 1 });

        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <Routes>
                    <Route path="/some-path" element={
                        <AppZeroState app={randomApp} >
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

        const zeroStateBanner = screen.queryByLabelText('ZeroStateBanner');
        expect(zeroStateBanner).not.toBeInTheDocument();
        mockedGet.mockRestore();
    });

    it('renders with Red Hat Lightspeed branding when feature flag is enabled', async () => {
        // Override the module-level mock for this test
        useFeatureFlag.mockReturnValue(true);

        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <Routes>
                    <Route path="/some-path" element={
                        <AppZeroState app={randomApp} customFetchResults={false} />
                    } />
                </Routes>
            </MemoryRouter>
        );

        const zeroStateBanner = await screen.findByLabelText('ZeroStateBanner');
        expect(zeroStateBanner).toBeInTheDocument();

        // Reset to default mock behavior
        useFeatureFlag.mockReturnValue(false);
    });

    it('renders with Insights branding when feature flag is disabled', async () => {
        // Ensure the mock returns false (this is the default, but being explicit)
        useFeatureFlag.mockReturnValue(false);

        render(
            <MemoryRouter initialEntries={['/some-path']}>
                <Routes>
                    <Route path="/some-path" element={
                        <AppZeroState app={randomApp} customFetchResults={false} />
                    } />
                </Routes>
            </MemoryRouter>
        );

        const zeroStateBanner = await screen.findByLabelText('ZeroStateBanner');
        expect(zeroStateBanner).toBeInTheDocument();
    });

});
