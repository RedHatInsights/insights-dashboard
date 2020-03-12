/* eslint-disable max-len */
import { defineMessages } from 'react-intl';

export default defineMessages({
    dashboardTitle: {
        id: 'dashboardTitle',
        description: 'Title of the dashboard',
        defaultMessage: 'Overview'
    },
    recsImpactingSystems: {
        id: 'recsImpactingSystems',
        description: 'Advisor - recs impacting systems',
        defaultMessage: '{totalRecs, plural, one {# recommendation} other {# recommendations}}  impacting {systems, plural, one {# system} other {# systems}}'
    },
    incidentsDetected: {
        id: 'incidentsDetected',
        description: 'Advisor - incidents detected',
        defaultMessage: '{incidents, plural, one {incident} other {incidents}} detected'
    },
    critical: {
        id: 'critical',
        description: 'Critical',
        defaultMessage: 'Critical'
    },
    important: {
        id: 'important',
        description: 'important',
        defaultMessage: 'important'
    },
    moderate: {
        id: 'moderate',
        description: 'moderate',
        defaultMessage: 'moderate'
    },
    low: {
        id: 'low',
        description: 'low',
        defaultMessage: 'low'
    }
});
