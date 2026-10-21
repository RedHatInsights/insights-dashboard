import React from 'react';
import { usePermissions } from '@redhat-cloud-services/frontend-components-utilities/RBACHook/RBACHook';
import { useFeatureFlag } from '../../Utilities/Hooks';
import { useInventoryHostsReadKesselProbe } from '../../Utilities/hooks/useInventoryHostsReadKesselProbe';
import SystemInventoryHeaderContent from './SystemInventoryHeaderContent';

const INVENTORY_HOST_READ_PERMISSIONS = ['inventory:hosts:read'];

const SystemInventoryHeaderWithRbac = () => {
  const { hasAccess, isLoading } = usePermissions(
    'inventory',
    INVENTORY_HOST_READ_PERMISSIONS,
  );

  return (
    <SystemInventoryHeaderContent
      hasInventoryHostRead={hasAccess}
      isInventoryHostReadLoading={isLoading}
    />
  );
};

const SystemInventoryHeaderWithKessel = () => {
  const { hasAccess, isLoading } = useInventoryHostsReadKesselProbe();

  return (
    <SystemInventoryHeaderContent
      hasInventoryHostRead={hasAccess}
      isInventoryHostReadLoading={isLoading}
    />
  );
};

const SystemInventoryHeader = () => {
  const isKesselEnabled = useFeatureFlag('insights-dashboard.kessel_enabled');

  return isKesselEnabled ? (
    <SystemInventoryHeaderWithKessel />
  ) : (
    <SystemInventoryHeaderWithRbac />
  );
};

export default SystemInventoryHeader;
