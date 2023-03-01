import { RHSM_API_RESPONSE_DATA_TYPES } from './Constants';

/**
 * Generate a range of dates, from the start of 'date' minus 'subtract' days, to the end of 'date'
 *
 * @param {Date} date
 * @param {number} subtract
 * @returns {{endDate: Date, startDate: Date}}
 */
export const setRangedDateTime = (date = new Date(), subtract = 1) => {
    if (typeof(date) === 'string') {
        date = new Date(date);
    }

    return {
        startDate: new Date(new Date(date.setUTCHours(0, 0, 0, 0)).setUTCDate(date.getUTCDate() - subtract)),
        endDate: new Date(date.setUTCHours(23, 59, 59, 999))
    };
};

/**
 * Apply a set of schemas using either an array of objects in the
 * form of [{ madeUpKey: 'some_api_key' }], or an array of arrays
 * in the form of [['some_api_key','another_api_key']]
 *
 * @param {Array} schemas
 * @param {*} initialValue
 * @returns {Array}
 */
export const setResponseSchemas = (schemas = [], initialValue) =>
    schemas.map(schema => {
        const generated = {};
        const arr = (Array.isArray(schema) && schema) || Object.values(schema);
        arr.forEach(value => {
            generated[value] = initialValue;
        });
        return generated;
    });

/**
 * Filter report and capacity data against expected API response. Apply percentage and date.
 *
 * @param {Array} report
 * @param {Array} capacity
 * @param {string} filter
 * @return {({}|{date: Date, report: (number|null|undefined), capacity: (number|null|undefined),
 *     percentage: (number|null|undefined)})}
 */
export const filterChartData = (report = [], capacity = [], filter) => {
    const reportData = report.reverse();
    const capacityData = capacity.reverse();
    let chartData = {};
    let recordIndex = null;

    const [responseSchema = {}] = setResponseSchemas([
        RHSM_API_RESPONSE_DATA_TYPES
    ]);

    const record = reportData.find((data, index) => {
        recordIndex = index;
        return data[RHSM_API_RESPONSE_DATA_TYPES.HAS_DATA] === true;
    });

    if (record) {
        const date = record[RHSM_API_RESPONSE_DATA_TYPES.DATE];
        chartData = {
            date,
            report: { ...responseSchema, ...record },
            capacity: { ...responseSchema, ...capacityData[recordIndex] },
            percentage: undefined
        };

        chartData.report = chartData.report[filter];
        chartData.capacity = chartData.capacity[RHSM_API_RESPONSE_DATA_TYPES.HAS_INFINITE] ? null : chartData.capacity[filter];
        let percentage = chartData.capacity === null ? null : ((chartData.report || 0) / (chartData.capacity || 0)) * 100;

        if (Number.isNaN(percentage)) {
            percentage = 0;
        }

        if (percentage === Infinity) {
            percentage = undefined;
        }

        if (typeof percentage === 'number') {
            percentage = Math.ceil(percentage);
        }

        chartData.percentage = percentage;
    }

    return chartData;
};
