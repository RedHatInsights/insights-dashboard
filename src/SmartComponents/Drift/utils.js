import messages from '../../Messages';
import * as ActionTypes from '../../AppConstants';

export const groupPayload = (data) => {
    return data.reduce((acc, curr) => {
        // We'll use just events and inventoryId from context
        const { events, context: { inventory_id: inventoryId } } = parsePayload(curr.payload);

        // Let's iterate over all events (and use just the event)
        events.forEach(({ payload: event }) => {
        // Is there already baselineId?
            const { systems } = acc.find(({ baselineId }) => baselineId === event.baseline_id) || {};
            // either assign to list of systems, or create new record
            if (systems) {
                !systems.includes(inventoryId) && systems.push(inventoryId);
            } else {
                acc.push({
                    baselineId: event.baseline_id,
                    baselineName: event.baseline_name,
                    systems: [inventoryId]
                });
            }
        });

        return acc;
    }, []);
};

export const parseDriftData = (data) => ({
    numEvents: data.meta.count,
    baselineDetail: groupPayload(data.data)
    .sort(({ systems: aSystems }, { systems: bSystems }) => aSystems.length < bSystems.length ?
        1 :
        (aSystems.length > bSystems.length ? -1 : 0)
    )
});

function parsePayload(item) {
    return JSON.parse(item.replaceAll('\\', '').replaceAll('"{', '{').replaceAll('}"', '}'));
}

export function formatDate(date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0];
}

export function getDate(ago) {
    let d = new Date();
    d.setDate(d.getDate() - ago);
    return formatDate(d);
}

export const translateDriftDropdownItems = (intl) => ([
    {
        id: 'days-30',
        description: intl.formatMessage(messages.driftDropDown30days),
        startDate: getDate(30),
        endDate: getDate(0)
    },
    {
        id: 'days-7',
        description: intl.formatMessage(messages.driftDropDown7days),
        startDate: getDate(7),
        endDate: getDate(0)
    },
    {
        id: 'hours-24',
        description: intl.formatMessage(messages.driftDropDown24hours),
        startDate: getDate(1),
        endDate: getDate(0)
    }
]);

export const buildCompareUrl = (baseline_id, system_ids) => {

    let finalUrl = `/?baseline_ids=${baseline_id}`;

    system_ids.slice(0, ActionTypes.SYSTEMS_LIMIT).forEach(system_id => {
        finalUrl = finalUrl.concat(`&system_ids=${system_id}`);
    });

    finalUrl = finalUrl.concat('&filter[show]=baseline');
    return finalUrl;
};
