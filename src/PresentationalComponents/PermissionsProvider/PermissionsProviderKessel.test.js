import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import PermissionsProviderKessel from './PermissionsProviderKessel';
import { useDashboardKesselPermissions } from '../../Utilities/hooks/useDashboardKesselPermissions';

jest.mock('../../Utilities/hooks/useDashboardKesselPermissions');

describe('PermissionsProviderKessel', () => {
    it('should render the children when the permissions are loaded', () => {
        useDashboardKesselPermissions.mockReturnValue({
            permissions: {
                compliance: true,
                advisor: true,
                remediations: true
            },
            isLoading: false
        });
        render(
            <PermissionsProviderKessel>
                <div>Test</div>
            </PermissionsProviderKessel>
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
    it('should render the loading state when the permissions are not loaded', () => {
        useDashboardKesselPermissions.mockReturnValue({
            permissions: null,
            isLoading: true
        });
        render(
            <PermissionsProviderKessel>
                <div>Test</div>
            </PermissionsProviderKessel>
        );
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});
