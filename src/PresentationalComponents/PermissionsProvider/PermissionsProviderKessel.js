import React from 'react';
import propTypes from 'prop-types';
import PageLoading from '../PageLoading/PageLoading';
import { useDashboardKesselPermissions } from '../../Utilities/hooks/useDashboardKesselPermissions';
import { PermissionContext } from '../../PermissionContext';

const PermissionsProviderKessel = ({ children }) => {
    const { permissions, isLoading } = useDashboardKesselPermissions();

    if (isLoading) {
        return <PageLoading />;
    }

    return (
        <PermissionContext.Provider value={permissions}>
            {children}
        </PermissionContext.Provider>
    );
};

PermissionsProviderKessel.propTypes = {
    children: propTypes.element
};

export default PermissionsProviderKessel;
