import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usePermissions } from '@redhat-cloud-services/frontend-components-utilities/RBACHook/RBACHook';
import { workloadsPropType } from '../../Utilities/Common';
import { useFeatureFlag } from '../../Utilities/Hooks';
import { useInventoryHostsReadKesselProbe } from '../../Utilities/hooks/useInventoryHostsReadKesselProbe';
import SystemInventoryHeaderContent from './SystemInventoryHeaderContent';

const INVENTORY_HOST_READ_PERMISSIONS = ['inventory:hosts:read'];

const SystemInventoryHeaderWithRbac = ({ selectedTags, workloads }) => {
  const { hasAccess, isLoading } = usePermissions(
    'inventory',
    INVENTORY_HOST_READ_PERMISSIONS,
  );

  return (
    <SystemInventoryHeaderContent
      selectedTags={selectedTags}
      workloads={workloads}
      hasInventoryHostRead={hasAccess}
      isInventoryHostReadLoading={isLoading}
    />
  );
};

const SystemInventoryHeaderWithKessel = ({ selectedTags, workloads }) => {
  const { hasAccess, isLoading } = useInventoryHostsReadKesselProbe();

  return (
    <SystemInventoryHeaderContent
      selectedTags={selectedTags}
      workloads={workloads}
      hasInventoryHostRead={hasAccess}
      isInventoryHostReadLoading={isLoading}
    />
  );
};

const SystemInventoryHeader = ({ selectedTags, workloads }) => {
  const isKesselEnabled = useFeatureFlag('insights-dashboard.kessel_enabled');

  return isKesselEnabled ? (
    <SystemInventoryHeaderWithKessel
      selectedTags={selectedTags}
      workloads={workloads}
    />
  ) : (
    <SystemInventoryHeaderWithRbac
      selectedTags={selectedTags}
      workloads={workloads}
    />
  );
};

SystemInventoryHeader.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  workloads: workloadsPropType,
};

SystemInventoryHeaderWithRbac.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  workloads: workloadsPropType,
};

SystemInventoryHeaderWithKessel.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  workloads: workloadsPropType,
};

export default connect(({ DashboardStore }) => ({
  selectedTags: DashboardStore.selectedTags,
  workloads: DashboardStore.workloads,
}))(SystemInventoryHeader);
