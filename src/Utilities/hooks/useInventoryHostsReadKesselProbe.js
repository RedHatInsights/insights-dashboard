import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { useEffect, useState } from 'react';
import { INVENTORY_TOTAL_FETCH_URL } from '../../AppConstants';

export const useInventoryHostsReadKesselProbe = () => {
  const axios = useAxiosWithPlatformInterceptors();
  const [state, setState] = useState({
    isLoading: true,
    hasAccess: false,
  });

  useEffect(() => {
    const probe = async () => {
      try {
        await axios.get(INVENTORY_TOTAL_FETCH_URL);
        setState({ hasAccess: true, isLoading: false });
      } catch (err) {
        const status = err?.response?.status ?? err?.status;
        setState({
          hasAccess: status === 403 ? false : true,
          isLoading: false,
        });
      }
    };

    probe();
  }, [axios]);

  return state;
};
