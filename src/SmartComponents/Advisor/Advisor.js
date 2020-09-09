import * as AppActions from '../../AppActions';

import { INCIDENT_URL, NEW_REC_URL } from './Constants';
import React, { useEffect, useState } from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import FailState from '../../PresentationalComponents/FailState/FailState';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { NumberDescription } from '../../PresentationalComponents/NumberDescription/NumberDescription';
import PropTypes from 'prop-types';
import { SEVERITY_MAP } from './Constants';
import StackChartTemplate from '../../ChartTemplates/StackChart/StackChartTemplate';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

/**
 * Advisor Card for showing count/severity of rec hits
 */
const Advisor = ({ recStats, recStatsStatus, advisorFetchStatsRecs, advisorFetchStatsSystems,
    advisorIncidents, advisorIncidentsStatus, advisorFetchIncidents, systemsStats, systemsStatsStatus, selectedTags }) => {

    const intl = useIntl();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        advisorFetchStatsRecs(selectedTags.length && ({ tags: selectedTags.join() }));
        advisorFetchStatsSystems(selectedTags.length && ({ tags: selectedTags.join() }));
        advisorFetchIncidents(selectedTags.length && ({ tags: selectedTags.join() }));
    }, [advisorFetchIncidents, advisorFetchStatsRecs, advisorFetchStatsSystems, selectedTags]);

    useEffect(() => {
        recStatsStatus === 'fulfilled' && setChartData([
            { name: intl.formatMessage(messages.critical), y: recStats.total_risk[SEVERITY_MAP.critical] },
            { name: intl.formatMessage(messages.important), y: recStats.total_risk[SEVERITY_MAP.important] },
            { name: intl.formatMessage(messages.moderate), y: recStats.total_risk[SEVERITY_MAP.moderate] },
            { name: intl.formatMessage(messages.low), y: recStats.total_risk[SEVERITY_MAP.low] }
        ]);
    }, [intl, recStats, recStatsStatus]);

    const legendClick = chartData.map((data) => {
        const risk = data.name.toLowerCase();
        // eslint-disable-next-line max-len
        return `${UI_BASE}/advisor/recommendations?total_risk=${SEVERITY_MAP[risk]}&reports_shown=true&impacting=true&offset=0&limit=10${selectedTags.length && '&tags=' + selectedTags.join()}`;
    });

    return <TemplateCard appName='Advisor' data-ouia-safe>
        <TemplateCardHeader title='Advisor recommendations' />
        {advisorIncidentsStatus === 'rejected' ?
            <TemplateCardBody><FailState appName='Advisor' /></TemplateCardBody>
            : <TemplateCardBody>
                {advisorIncidentsStatus !== 'fulfilled' ? <Loading /> :
                    <NumberDescription
                        data={ advisorIncidents.meta.count }
                        dataSize="md"
                        layout="horizontal"
                        linkDescription={ intl.formatMessage(messages.incidentsDetected, { incidents: advisorIncidents.meta.count }) }
                        critical={ advisorIncidents.meta.count > 50 ? 'true' : 'false' }
                        link={ `${UI_BASE}${INCIDENT_URL}` }
                    />
                }
                {recStatsStatus !== 'fulfilled' ? <Loading /> :
                    <StackChartTemplate
                        ariaDesc={ intl.formatMessage(messages.advisorChartDescription) }
                        ariaTitle="Advisor recommendations chart"
                        height={ 40 }
                        maxWidth={ 500 }
                        legendHeight={ 36 }
                        legendWidth={ 500 }
                        data={ chartData }
                        constrainToVisibleArea={ false }
                        legendClick={ legendClick }
                    />
                }
                {systemsStatsStatus !== 'fulfilled' ? <Loading /> :
                    <Button component="a" href={ `${UI_BASE}${NEW_REC_URL}` } variant="link" isInline>
                        {intl.formatMessage(messages.recsImpactingSystems, { totalRecs: recStats.total, systems: systemsStats.total })}
                    </Button>}
            </TemplateCardBody>
        }

    </TemplateCard>;
};

Advisor.propTypes = {
    advisorFetchStatsRecs: PropTypes.func,
    recStats: PropTypes.object,
    recStatsStatus: PropTypes.string,
    advisorFetchStatsSystems: PropTypes.func,
    systemsStats: PropTypes.object,
    systemsStatsStatus: PropTypes.string,
    advisorIncidents: PropTypes.object,
    advisorIncidentsStatus: PropTypes.string,
    advisorFetchIncidents: PropTypes.func,
    selectedTags: PropTypes.array
};

export default connect(
    ({ DashboardStore }) => ({
        recStats: DashboardStore.advisorStatsRecs,
        recStatsStatus: DashboardStore.advisorStatsRecsStatus,
        systemsStats: DashboardStore.advisorStatsSystems,
        systemsStatsStatus: DashboardStore.advisorStatsSystemsStatus,
        advisorIncidents: DashboardStore.advisorIncidents,
        advisorIncidentsStatus: DashboardStore.advisorIncidentsStatus,
        selectedTags: DashboardStore.selectedTags
    }),
    dispatch => ({
        advisorFetchStatsRecs: (data) => dispatch(AppActions.advisorFetchStatsRecs(data)),
        advisorFetchStatsSystems: (data) => dispatch(AppActions.advisorFetchStatsSystems(data)),
        advisorFetchIncidents: (data) => dispatch(AppActions.advisorFetchIncidents(data))
    })
)(Advisor);
