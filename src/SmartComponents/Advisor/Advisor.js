/* eslint-disable max-len */
/* eslint-disable react/display-name */
/* eslint-disable camelcase */
import './Advisor.scss';

import * as AppActions from '../../AppActions';

import { Button, Divider, Title, TitleSizes, Tooltip, TooltipPosition } from '@patternfly/react-core/dist/esm/components';
import { Flex, FlexItem, Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts';
import { INCIDENT_URL, SEVERITY_MAP } from './Constants';
import React, { useEffect, useState } from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import {
    global_palette_cyan_100,
    global_palette_cyan_200,
    global_palette_cyan_300,
    global_palette_cyan_400
} from '@patternfly/react-tokens/dist/esm/';

import FailState from '../../PresentationalComponents/FailState/FailState';
import InfoIcon from '../../Icons/InfoIcon';
import { InsightsLabel } from '@redhat-cloud-services/frontend-components/components/esm/InsightsLabel';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import PropTypes from 'prop-types';
import { UI_BASE } from '../../AppConstants';
import { capitalize } from '../../Utilities/Common';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const Advisor = ({ recStats, recStatsStatus, advisorFetchStatsRecs, advisorFetchStatsSystems,
    advisorIncidents, advisorIncidentsStatus, advisorFetchIncidents, selectedTags, workloads }) => {

    const intl = useIntl();
    const [trData, setTRData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const colorScale = [
        global_palette_cyan_100.value,
        global_palette_cyan_200.value,
        global_palette_cyan_300.value,
        global_palette_cyan_400.value
    ];
    const urlRest = `&reports_shown=true&impacting=true&offset=0&limit=10${selectedTags?.length && `&tags=${selectedTags.join()}`}${workloads?.SAP && `&sap_system=true`}`;
    const pieLegendClick = categoryData.map(({ value }) => `${UI_BASE}/advisor/recommendations?category=${value}${urlRest}`);
    const totalRiskUrl = (risk) => `${UI_BASE}/advisor/recommendations?total_risk=${risk}${urlRest}`;

    const iconTooltip = text => <Tooltip
        key={ text }
        position={ TooltipPosition.top }
        content={ <div>{text}</div> }>
        <Button variant='plain' aria-label='Action' className='ins-c-info-icon'>
            <InfoIcon />
        </Button>
    </Tooltip>;

    const pieLegendData = categoryData.map(item => ({ name: `${item.y} ${item.x}`, symbol: { fill: `${item.fill}`, type: 'square' } }));

    useEffect(() => {
        const options = { ...selectedTags.length && ({ tags: selectedTags.join() }), ...workloads?.SAP && ({ sap_system: true }) };
        advisorFetchStatsRecs(options);
        advisorFetchStatsSystems(options);
        advisorFetchIncidents(options);
    }, [advisorFetchIncidents, advisorFetchStatsRecs, advisorFetchStatsSystems, selectedTags, workloads]);

    useEffect(() => {
        if (recStatsStatus === 'fulfilled') {
            const { total_risk, category } = recStats;
            setTRData([
                { title: `${total_risk[SEVERITY_MAP.critical]} ${capitalize(intl.formatMessage(messages.critical))}`, risk: SEVERITY_MAP.critical },
                {
                    title: `${total_risk[SEVERITY_MAP.important]} ${capitalize(intl.formatMessage(messages.important))}`,
                    risk: SEVERITY_MAP.important
                },
                { title: `${total_risk[SEVERITY_MAP.moderate]} ${capitalize(intl.formatMessage(messages.moderate))}`, risk: SEVERITY_MAP.moderate },
                { title: `${total_risk[SEVERITY_MAP.low]} ${capitalize(intl.formatMessage(messages.low))}`, risk: SEVERITY_MAP.low }
            ]);
            setCategoryData([
                {
                    x: intl.formatMessage(messages.availability, { count: category.Availability }), y: category.Availability,
                    fill: colorScale[0], value: 1
                },
                {
                    x: intl.formatMessage(messages.stability, { count: category.Stability }), y: category.Stability,
                    fill: colorScale[1], value: 3
                },
                {
                    x: intl.formatMessage(messages.performance, { count: category.Performance }), y: category.Performance,
                    fill: colorScale[2], value: 4
                },
                {
                    x: intl.formatMessage(messages.security, { count: category.Security }), y: category.Security,
                    fill: colorScale[3], value: 2
                }
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intl, recStats, recStatsStatus]);

    return <TemplateCard appName='Advisor' data-ouia-safe>
        {advisorIncidentsStatus === 'pending' ? <Loading /> :
            <TemplateCardHeader titleClassName={ advisorIncidents?.meta?.count ? 'ins-m-red' : 'ins-m-green' }
                title={ `${intl.formatMessage(messages.incidents, { incidents: advisorIncidents?.meta?.count })}` }>
            &nbsp;
                {intl.formatMessage(messages.inAdvisor)}
            &nbsp;
                <Button component='a' href={ `${UI_BASE}${INCIDENT_URL}` } variant='link' isInline>
                    {intl.formatMessage(messages.recommendations)}
                </Button>
            </TemplateCardHeader>}
        {advisorIncidentsStatus === 'rejected' ?
            <TemplateCardBody><FailState appName='Advisor' /></TemplateCardBody>
            : <TemplateCardBody>
                <Flex>
                    <Flex grow={ { default: 'grow' } }>
                        <FlexItem>
                            <Title headingLevel='h2' size={ TitleSizes.lg }>
                                {`${intl.formatMessage(messages.totalRisk)}`}
                                {iconTooltip(intl.formatMessage(messages.totalRiskDef, { em: str => <em>{str}</em> }))}
                            </Title>
                            <Grid hasGutter>
                                {trData.map(({ title, risk }) =>
                                    <GridItem span={ 6 } key={ title } ><Button component='a' href={ totalRiskUrl(risk) } variant='link' isInline>
                                        <InsightsLabel value={ risk } text={ title } />
                                    </Button>
                                    </GridItem>)}
                            </Grid>
                        </FlexItem>
                    </Flex>
                    <Divider isVertical />
                    <Flex grow={ { default: 'grow' } }>
                        <FlexItem>
                            <Title headingLevel='h2' size={ TitleSizes.lg }>
                                {`${intl.formatMessage(messages.category)}`}
                            </Title>
                            <PieChart
                                ariaDesc='Advisor Category pie chart'
                                ariaTitle='Advisor Category pie chartt'
                                constrainToVisibleArea={ true }
                                data={ categoryData }
                                colorScale={ colorScale }
                                height={ 150 }
                                width={ 150 }
                                legend='true'
                                legendData={ pieLegendData }
                                legendClick={ pieLegendClick }
                                legendOrientation={ true }
                                legendHeight={ 80 }
                                legendWidth={ 130 }
                            />
                        </FlexItem>
                    </Flex>
                </Flex>
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
    selectedTags: PropTypes.array,
    workloads: PropTypes.object
};

export default connect(
    ({ DashboardStore }) => ({
        recStats: DashboardStore.advisorStatsRecs,
        recStatsStatus: DashboardStore.advisorStatsRecsStatus,
        systemsStats: DashboardStore.advisorStatsSystems,
        systemsStatsStatus: DashboardStore.advisorStatsSystemsStatus,
        advisorIncidents: DashboardStore.advisorIncidents,
        advisorIncidentsStatus: DashboardStore.advisorIncidentsStatus,
        selectedTags: DashboardStore.selectedTags,
        workloads: DashboardStore.workloads
    }),
    dispatch => ({
        advisorFetchStatsRecs: (data) => dispatch(AppActions.advisorFetchStatsRecs(data)),
        advisorFetchStatsSystems: (data) => dispatch(AppActions.advisorFetchStatsSystems(data)),
        advisorFetchIncidents: (data) => dispatch(AppActions.advisorFetchIncidents(data))
    })
)(Advisor);
