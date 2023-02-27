import { setRangedDateTime, setResponseSchemas, filterChartData } from './SubscriptionsUtilizedHelpers';
import * as RHSM_TYPES from './Constants';

describe('SmartComponents/SubscriptionsUtilized/SubscriptionsUtilizedHelpers', () => {
    it('should return a range of date and time that includes the prior date', () => {
        expect(setRangedDateTime('2020-04-01')).toMatchSnapshot('date and time');
    });

    it('should return a predictable schema object', () => {
        expect(setResponseSchemas([
            RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES
        ])).toMatchSnapshot('schema');
    });

    it('should return filtered chart data', () => {
        const reportResponse = {
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA]: [{
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]: 300,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.CORES]: 100,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_DATA]: true
            }, {
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.CORES]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_DATA]: false
            }]
        };
        const capacityResponse = {
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA]: [{
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]: 10,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.CORES]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_INFINITE]: false
            }, {
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.CORES]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_INFINITE]: false
            }]
        };

        expect(filterChartData(reportResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            capacityResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS])).toMatchSnapshot('filtered');
    });

    it('should return zeroed data when HAS_DATA is true', () => {
        const reportResponse = {
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA]: [{
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]: 300,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.CORES]: 100,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_DATA]: true
            }, {
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.CORES]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_DATA]: true
            }]
        };
        const capacityResponse = {
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA]: [{
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]: 10,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.CORES]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_INFINITE]: false
            }, {
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.CORES]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_INFINITE]: false
            }]
        };

        expect(filterChartData(reportResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            capacityResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS])).toMatchSnapshot('hasData TRUE');

        reportResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA][0][RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_DATA] = false;
        reportResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA][1][RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_DATA] = false;

        expect(filterChartData(reportResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            capacityResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS])).toMatchSnapshot('hasData FALSE');
    });

    it('should return null and undefined percentages based on specific capacity values', () => {
        const reportResponse = {
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA]: [{
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]: 300,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_DATA]: true
            }]
        };
        const capacityResponse = {
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA]: [{
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]: 0,
                [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_INFINITE]: false
            }]
        };

        expect(filterChartData(reportResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            capacityResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]).percentage).toBe(undefined);

        capacityResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA][0][RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS] = null;

        expect(filterChartData(reportResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            capacityResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]).percentage).toBe(null);

        capacityResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA][0][RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS] = 0;
        capacityResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA][0][RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.HAS_INFINITE] = true;

        expect(filterChartData(reportResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            capacityResponse[RHSM_TYPES.RHSM_API_RESPONSE_DATA],
            [RHSM_TYPES.RHSM_API_RESPONSE_DATA_TYPES.SOCKETS]).percentage).toBe(null);
    });
});
