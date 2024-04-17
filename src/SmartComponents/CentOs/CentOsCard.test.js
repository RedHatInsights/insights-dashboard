import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import useInsightsNavigate from '@redhat-cloud-services/frontend-components-utilities/useInsightsNavigate';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import CentOsCard from './CentOsCard';

jest.mock('@redhat-cloud-services/frontend-components-utilities/interceptors', () => ({
    useAxiosWithPlatformInterceptors: jest.fn(() => ({
        get: () => new Promise(() => {})
    }))
}));
jest.mock('@redhat-cloud-services/frontend-components-utilities/useInsightsNavigate');

describe('CentOsCard', () => {
    it('renders loading state first',  () => {
        render(<CentOsCard />);

        screen.getByRole('progressbar', {
            name: /loading centos hosts/i
        });

    });

    it('renders alert after eol', () => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('July 15, 2024'));
        render(<CentOsCard />);

        screen.getByRole('heading', {
            name: /centos 7 has reached end of life/i
        });

        jest.useRealTimers(); // reset the mocked date
    });

    it('renders before eol', () => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('May 15, 2024'));
        render(<CentOsCard />);

        screen.getByRole('heading', {
            name: /centos 7 reaches end of life \(eol\) in \d+ days/i
        });

        jest.useRealTimers(); // reset the mocked date
    });

    it('renders default text when no centos systems', async () => {
        useAxiosWithPlatformInterceptors.mockReturnValue({
            get: () => ({ total: 0 })
        });
        render(<CentOsCard />);

        await waitFor(()=>{
            screen.getByText(
                /on june 30, 2024, centos linux 7 will reach end of life/i
            );
        });
        expect(screen.getByRole('link', {
            name: /learn more/i
        })).toHaveAttribute('href', 'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/centos-migration');
    });

    it('renders hosts count when centos systems present', async () => {
        useAxiosWithPlatformInterceptors.mockReturnValue({
            get: () => ({ total: 5 })
        });
        render(<CentOsCard />);

        await waitFor(()=>{
            screen.getByRole('heading', {
                name: /5 centos systems/i
            });
        });
        screen.getByText(
            /detected on your system and ready for pre-conversion analysis and conversion to rhel\./i
        );
    });

    it('shows pre-conversion task button', async () => {
        const navigateFn = jest.fn();
        useInsightsNavigate.mockReturnValue(navigateFn);
        render(<CentOsCard />);

        await waitFor(()=>{
            screen.getByRole('button', {
                name: /start converting centos systems/i
            });
        });
        await userEvent.click(screen.getByRole('button', {
            name: /start converting centos systems/i
        }));
        expect(navigateFn).toBeCalledWith('/available/convert-to-rhel-preanalysis');
    });
});
