import './App.scss';

import React, { useEffect, useState } from 'react';

import API from './Utilities/Api';
import { INVENTORY_TOTAL_FETCH_URL } from './AppConstants';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import PageLoading from './PresentationalComponents/PageLoading/PageLoading';
import { DashboardRoutes } from './DashboardRoutes';
import PermissionsProvider from './PresentationalComponents/PermissionsProvider/PermissionsProvider';
import ZeroState from './PresentationalComponents/ZeroState/ZeroState';
import { useFeatureFlag } from './Utilities/Hooks';
import { AccessCheck } from '@project-kessel/react-kessel-access-check';
import { KESSEL_API_BASE_URL } from './AppConstants';
import PermissionsProviderKessel from './PresentationalComponents/PermissionsProvider/PermissionsProviderKessel';
import { useFlagsStatus } from '@unleash/proxy-client-react';

const App = (props) => {
  const isKesselEnabled = useFeatureFlag('insights-dashboard.kessel_enabled');
  const { flagsReady } = useFlagsStatus();
  const chrome = useChrome();
  const [hasSystems, setHasSystems] = useState(false);
  const [systemsLoading, setSystemsLoading] = useState(true);

  useEffect(() => {
    API.get(`${INVENTORY_TOTAL_FETCH_URL}`)
      .then(({ data }) => {
        setHasSystems(data?.total > 0);
        data?.total === 0 && chrome.hideGlobalFilter();
        setSystemsLoading(false);
      })
      .catch(() => {
        chrome.hideGlobalFilter();
        setSystemsLoading(false);
      });
  }, [chrome]);

  const content = hasSystems ? (
    <DashboardRoutes childProps={props} />
  ) : (
    <ZeroState />
  );

  return systemsLoading || !flagsReady ? (
    <PageLoading />
  ) : isKesselEnabled ? (
    <AccessCheck.Provider
      baseUrl={window.location.origin}
      apiPath={KESSEL_API_BASE_URL}
    >
      <PermissionsProviderKessel>{content}</PermissionsProviderKessel>
    </AccessCheck.Provider>
  ) : (
    <PermissionsProvider>{content}</PermissionsProvider>
  );
};

export default App;
