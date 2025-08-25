import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { useEffect, useRef, useState } from 'react';
import { INVENTORY_FETCH_URL, INVENTORY_STALE_FETCH_URL, INVENTORY_WARNING_FETCH_URL } from '../AppConstants';
import { globalFilters } from './Common';

export const useBatchInventoryFetch = (workloads, SID, selectedTags, hasAccess) => {
    const axios = useAxiosWithPlatformInterceptors();
    const mounted = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [inventorySummary, setInventorySummary] = useState();
    const [inventoryWarningSummary, setInventoryWarningSummary] = useState();
    const [inventoryStaleSum, setInventoryStaleSum] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        const params = { ...globalFilters(workloads, SID) };
        const tags = `${selectedTags?.length > 0 ? `&tags=${selectedTags?.join('&tags=')}` : ''}`;
        mounted.current = true;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const inventorySum = await axios.get(`${INVENTORY_FETCH_URL}${tags}`, { params });
                const inventoryWarningSum = await axios.get(`${INVENTORY_WARNING_FETCH_URL}${tags}`,
                    { params });
                const inventoryStaleSum = await axios.get(`${INVENTORY_STALE_FETCH_URL}${tags}`,
                    { params });

                mounted.current &&
                    (
                        setInventorySummary(inventorySum),
                        setInventoryWarningSummary(inventoryWarningSum),
                        setInventoryStaleSum(inventoryStaleSum),
                        setIsLoading(false)

                    );
            } catch (err) {
                /*eslint-disable no-console*/
                console.error(err);
                /*eslint-enable no-console*/
                setError(true);
            }
        };

        hasAccess === true && fetchData();
        return () => {
            mounted.current = false;
        };
    }, [workloads, SID, selectedTags, hasAccess, axios]);

    return [
        isLoading,
        inventorySummary,
        inventoryWarningSummary,
        inventoryStaleSum,
        error];
};
