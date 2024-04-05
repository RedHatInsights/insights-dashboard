import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { useEffect, useRef, useState } from 'react';
// import { globalFilters } from './Common';

export const useGrabFleetData = () => {
    const axios = useAxiosWithPlatformInterceptors();
    const mounted = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [fleetData, setFleetData] = useState();

    const [error, setError] = useState(false);

    useEffect(() => {
        mounted.current = true;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const fleetInfo =
                    await axios.get('https://insights-ai-oamg-infra-20393caca1b670a408b58c85ecc83e94f076ab75.pages.redhat.com/result.json');
                mounted.current &&
                    (
                        setIsLoading(false),
                        setFleetData(fleetInfo)
                    );
            } catch (err) {
                console.error(err);
                setError(true);
            }
        };

        fetchData();
        return () => {
            mounted.current = false;
        };
    }, []);

    return [
        isLoading,
        fleetData,
        error
    ];
};
