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
        //add options to url
        const options = { ...globalFilters(workloads, SID), ...selectedTags?.length > 0 && { tags: selectedTags } };
        mounted.current = true;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const inventorySum = options !== 'undefined' && await axios.get(`${INVENTORY_FETCH_URL}`, { params: { ...options } });
                const inventoryWarningSum = options !== 'undefined' && await axios.get(`${INVENTORY_WARNING_FETCH_URL}`, { params: { ...options } });
                const inventoryStaleSum = options !== 'undefined' && await axios.get(`${INVENTORY_STALE_FETCH_URL}`, { params: { ...options } });

                mounted.current &&
                    (
                        setInventorySummary(inventorySum),
                        setInventoryWarningSummary(inventoryWarningSum),
                        setInventoryStaleSum(inventoryStaleSum),
                        setIsLoading(false)

                    );
            } catch (err) {
                console.error(err);
                setError(true);
            }
        };

        hasAccess === true && fetchData();
        return () => {
            mounted.current = false;
        };
    }, [workloads, SID, selectedTags, hasAccess]);

    return [
        isLoading,
        inventorySummary,
        inventoryWarningSummary,
        inventoryStaleSum,
        error];
};
