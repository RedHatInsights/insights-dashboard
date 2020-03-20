import './_Advisor.scss';

import * as AppActions from '../../AppActions';

import { INCIDENT_URL, NEW_REC_URL } from './Constants';
import React, { useEffect } from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import Loading from '../../PresentationalComponents/Loading/Loading';
import PropTypes from 'prop-types';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';
import { NumberDescription } from '../../PresentationalComponents/NumberDescription/NumberDescription';
import StackChartTemplate from '../../ChartTemplates/StackChart/StackChartTemplate';
import { SEVERITY_MAP } from './Constants';

/**
 * Advisor Card for showing count/severity of rec hits
 */
const Advisor = ({ recStats, recStatsStatus, advisorFetchStatsRecs, advisorFetchStatsSystems,
    advisorIncidents, advisorIncidentsStatus, advisorFetchIncidents, systemsStats, systemsStatsStatus, intl }) => {

    useEffect(() => {
        advisorFetchStatsRecs();
        advisorFetchStatsSystems();
        advisorFetchIncidents();
    }, [advisorFetchIncidents, advisorFetchStatsRecs, advisorFetchStatsSystems]);

    const stackChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };
    const legendClick = () => [{
        target: 'labels',
        mutation: (data) => {
            const risk = data.datum.name.split(' ')[1].toLowerCase();
            window.location.href =
                `${UI_BASE}/advisor/recommendations?total_risk=${SEVERITY_MAP[risk]}&reports_shown=true&impacting=true&offset=0&limit=10`;
        }
    }];

    return <TemplateCard appName='Advisor'>
        <TemplateCardHeader title='Advisor recommendations' />
        <TemplateCardBody>
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
                    ariaDesc="CVEs impacting your systems"
                    ariaTitle="Vulnerabilities chart"
                    padding={ stackChartPadding }
                    legendPosition="bottom-left"
                    height={ 40 }
                    width={ 600 }
                    maxWidth={ 600 }
                    legendHeight={ 36 }
                    legendWidth={ 600 }
                    data={ recStats.total_risk }
                    legendClick={ legendClick }
                />
            }
            {systemsStatsStatus !== 'fulfilled' ? <Loading /> :
                <React.Fragment>
                    <a href={ `${UI_BASE}${NEW_REC_URL}` }>
                        {intl.formatMessage(messages.recsImpactingSystems, { totalRecs: recStats.total, systems: systemsStats.total })}
                    </a>
                </React.Fragment>}
        </TemplateCardBody>
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
    intl: PropTypes.any
};

export default injectIntl(connect(
    ({ DashboardStore }) => ({
        recStats: DashboardStore.advisorStatsRecs,
        recStatsStatus: DashboardStore.advisorStatsRecsStatus,
        systemsStats: DashboardStore.advisorStatsSystems,
        systemsStatsStatus: DashboardStore.advisorStatsSystemsStatus,
        advisorIncidents: DashboardStore.advisorIncidents,
        advisorIncidentsStatus: DashboardStore.advisorIncidentsStatus
    }),
    dispatch => ({
        advisorFetchStatsRecs: (url) => dispatch(AppActions.advisorFetchStatsRecs(url)),
        advisorFetchStatsSystems: (url) => dispatch(AppActions.advisorFetchStatsSystems(url)),
        advisorFetchIncidents: (url) => dispatch(AppActions.advisorFetchIncidents(url))
    })
)(Advisor));
