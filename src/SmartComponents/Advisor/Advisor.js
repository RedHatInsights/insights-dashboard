/* eslint-disable react/display-name */
import './Advisor.scss';

import * as AppActions from '../../AppActions';

import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Divider,
    TextContent,
    Title,
    Tooltip,
    TooltipPosition
} from '@patternfly/react-core/dist/esm/components';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts';
import React, { useEffect, useState } from 'react';
import { SEVERITY_MAP, UI_BASE } from '../../AppConstants';
import { capitalize, globalFilters } from '../../Utilities/Common';
import {
    global_disabled_color_100,
    global_palette_blue_100,
    global_palette_blue_200,
    global_palette_blue_300,
    global_palette_blue_400
} from '@patternfly/react-tokens/dist/esm/';
import { useDispatch, useSelector } from 'react-redux';

import { CompoundCard } from '../../PresentationalComponents/Template/CompoundCard';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import FailState from '../../PresentationalComponents/FailState/FailState';
import { INCIDENT_URL } from './Constants';
import InfoIcon from '../../Icons/InfoIcon';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import { TemplateCardBody } from '../../PresentationalComponents/Template/TemplateCard';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const Advisor = () => {
    const colors = [global_palette_blue_100.value, global_palette_blue_200.value, global_palette_blue_300.value, global_palette_blue_400.value];
    const intl = useIntl();
    const [trData, setTRData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [colorScale, setColorScale] = useState();
    const dispatch = useDispatch();
    const recStats = useSelector(({ DashboardStore }) => DashboardStore.advisorStatsRecs);
    const recStatsStatus = useSelector(({ DashboardStore }) => DashboardStore.advisorStatsRecsStatus);
    const advisorIncidents = useSelector(({ DashboardStore }) => DashboardStore.advisorIncidents);
    const advisorIncidentsStatus = useSelector(({ DashboardStore }) => DashboardStore.advisorIncidentsStatus);
    const selectedTags = useSelector(({ DashboardStore }) => DashboardStore.selectedTags);
    const workloads = useSelector(({ DashboardStore }) => DashboardStore.workloads);
    const SID = useSelector(({ DashboardStore }) => DashboardStore.SID);

    const urlRest = `&reports_shown=true&impacting=true&offset=0&limit=10${selectedTags?.length ?
        `&tags=${selectedTags?.join()}` : ''}${workloads?.SAP ? '&sap_system=true' : ''}${SID?.length ? `&sap_sids=${SID?.join()}` : ''}`;
    const totalRiskUrl = risk => `${UI_BASE}/advisor/recommendations?sort=-total_risk&total_risk=${risk}${urlRest}`;
    const pieLegendData = categoryData.map(item => ({
        name: `${item.y} ${item.x} `, fill: `${item.fill}`,
        url: `${UI_BASE}/advisor/recommendations?sort=-category&category=${item.value}${urlRest}`
    }));
    const iconTooltip = text => <Tooltip
        key={text}
        position={TooltipPosition.top}
        content={<div>{text}</div>}>
        <span aria-label='Action' className='insd-c-info-icon'>
            <InfoIcon />
        </span>
    </Tooltip>;
    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };

    useEffect(() => {
        const advisorFetchStatsRecs = options => dispatch(AppActions.advisorFetchStatsRecs(options));
        const advisorFetchStatsSystems = options => dispatch(AppActions.advisorFetchStatsSystems(options));
        const advisorFetchIncidents = options => dispatch(AppActions.advisorFetchIncidents(options));
        const options = { ...globalFilters(workloads, SID), ...selectedTags?.length > 0 && { tags: selectedTags } };
        advisorFetchStatsRecs(options);
        advisorFetchStatsSystems(options);
        advisorFetchIncidents(options);
    }, [selectedTags, workloads, SID, dispatch]);

    useEffect(() => {
        if (recStatsStatus === 'fulfilled') {
            const { total_risk, category } = recStats;
            const categoryCount = category.Stability + category.Availability + category.Performance + category.Security;
            setTRData([
                {
                    title: `${capitalize(intl.formatMessage(messages.critical))} `,
                    risk: `${total_risk[SEVERITY_MAP.critical]}`,
                    value: SEVERITY_MAP.critical
                },
                {
                    title: `${capitalize(intl.formatMessage(messages.important))} `,
                    risk: `${total_risk[SEVERITY_MAP.important]}`,
                    value: SEVERITY_MAP.important
                },
                {
                    title: `${capitalize(intl.formatMessage(messages.moderate))} `,
                    risk: `${total_risk[SEVERITY_MAP.moderate]}`,
                    value: SEVERITY_MAP.moderate
                },
                {
                    title: `${capitalize(intl.formatMessage(messages.low))} `,
                    risk: `${total_risk[SEVERITY_MAP.low]}`,
                    value: SEVERITY_MAP.low
                }
            ]);

            setCategoryData([
                {
                    x: intl.formatMessage(messages.availability, { count: category.Availability }), y: category.Availability,
                    fill: colors[0], value: 1
                },
                {
                    x: intl.formatMessage(messages.stability, { count: category.Stability }), y: category.Stability,
                    fill: colors[1], value: 3
                },
                {
                    x: intl.formatMessage(messages.performance, { count: category.Performance }), y: category.Performance,
                    fill: colors[2], value: 4
                },
                {
                    x: intl.formatMessage(messages.security, { count: category.Security }), y: category.Security,
                    fill: colors[3], value: 2
                }
            ]);

            setColorScale(categoryCount === 0 ? [global_disabled_color_100.value] : colors);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recStats, recStatsStatus]);

    return <CompoundCard className='insd-c-dashboard-card-parent insd-c-dashboard__card--compound--Advisor'>
        {advisorIncidentsStatus === 'pending' || recStatsStatus === 'pending' && <Loading />}
        {advisorIncidentsStatus === 'rejected' ?
            <TemplateCardBody><FailState appName='Advisor' /></TemplateCardBody>
            : <React.Fragment>
                <ExpandableCardTemplate
                    appName='Advisor'
                    className='insd-m-toggle-right-on-md'
                    title={intl.formatMessage(messages.advisorCardHeader1)}
                    isExpanded={JSON.parse(localStorage.getItem('dashboard_expanded_advisor1') || 'true')}
                    isExpandedCallback={isExpanded => localStorage.setItem('dashboard_expanded_advisor1', isExpanded)}
                    body={<TemplateCardBody className='ins-c-advisor-recs__card-body pf-u-pb-2xl'>
                        <Flex
                            direction={{ default: 'column' }}
                            alignItems={{ default: 'alignItemsCenter' }}>
                            <FlexItem>
                                <Flex
                                    alignItems={{ default: 'alignItemsFlexCenter' }}
                                    justifyContent={{ default: 'justifyContentCenter' }}>
                                    {advisorIncidents?.meta?.count > 0 &&
                                        <ExclamationCircleIcon className='pf-u-font-size-xl pf-u-danger-color-100' />}
                                    <span className='pf-u-font-size-2xl pf-u-text-align-center pf-u-font-weight-normal'>
                                        {intl.formatMessage(messages.incidents, { incidents: advisorIncidents?.meta?.count })}
                                    </span>
                                </Flex>
                                <TextContent
                                    className='insd-c-width-limiter pf-u-text-align-center'
                                    style={{ '--insd-c-width-limiter--MaxWidth': '34ch' }}>
                                    <p className='pf-u-font-size-md pf-u-text-center'>
                                        {intl.formatMessage(messages.advisorCardMessage)}
                                    </p>
                                </TextContent>
                            </FlexItem>
                            <Button
                                variant='secondary'
                                isSmall component='a'
                                href={`${UI_BASE}${INCIDENT_URL}`}
                            >
                                {intl.formatMessage(messages.advisorCardCTA)}
                            </Button>
                        </Flex>
                    </TemplateCardBody>
                    } />
                <Divider inset={{ md: 'insetLg' }} />
                <ExpandableCardTemplate
                    appName='advisor-recommendation-by-total-risk'
                    className='insd-m-toggle-right-on-md'
                    title={<Flex flexWrap={{ default: 'nowrap' }}>
                        <h3>{intl.formatMessage(messages.advisorCardHeader2)}</h3>
                        {iconTooltip(intl.formatMessage(messages.totalRiskDef, { strong: (str) => <strong>{str}</strong> }))}
                    </Flex>}
                    isExpanded={JSON.parse(localStorage.getItem('dashboard_expanded_advisor2') || 'true')}
                    isExpandedCallback={isExpanded => localStorage.setItem('dashboard_expanded_advisor2', isExpanded)}
                    body={<TemplateCardBody className='ins-c-advisor-recs__card-body pf-u-pb-0'>
                        <Flex
                            justifyContent={{ default: 'justifyContentCenter' }}
                            spaceItems={{ default: 'spaceItemsLg', sm: 'spaceItems2xl' }}
                        >
                            {trData.map(({ title, risk, value }) =>
                                <a key={title} href={totalRiskUrl(value)}>
                                    <Flex
                                        direction={{ default: 'column' }}
                                        spaceItems={{ default: 'spaceItemsNone' }}
                                        alignItems={{ default: 'alignItemsCenter' }}>
                                        <span className='pf-u-font-size-2xl pf-u-color-100 pf-u-font-weight-normal'>
                                            {risk}
                                        </span>
                                        <span className='pf-u-font-size-sm'>
                                            {title}
                                        </span>
                                    </Flex>
                                </a>)}
                        </Flex>
                        <Card component='div'>
                            <CardTitle>
                                <Title headingLevel='h4' size='lg'>
                                    {intl.formatMessage(messages.advisorCardHeader3)}
                                </Title>
                            </CardTitle>
                            <CardBody className='pf-u-pt-sm'>
                                <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsLg' }}>
                                    <div className="insd-c-dashboard__card-chart-container">
                                        <div className="insd-c-dashboard__card-pie-chart">
                                            <PieChart
                                                ariaDesc='Advisor Category pie chart'
                                                ariaTitle='Advisor Category pie chart'
                                                constrainToVisibleArea={true}
                                                data={categoryData}
                                                colorScale={colorScale}
                                                padding={pieChartPadding}
                                            />
                                        </div>
                                        <div className="insd-c-dashboard__card-pie-chart-legend">
                                            <div className='insd-c-legend insd-m-2-col'>
                                                {pieLegendData.map((item) =>
                                                    <a
                                                        key={item.url}
                                                        href={item.url}
                                                        className='insd-c-legend__item'
                                                    >
                                                        <span className='insd-c-legend__dot'
                                                            style={{ '--insd-c-legend__dot--BackgroundColor': `${item.fill}` }} />
                                                        <span className='insd-c-legend__text'>{item.name}</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Flex>
                            </CardBody>
                        </Card>
                    </TemplateCardBody>
                    } />
            </React.Fragment>}
    </CompoundCard>;
};

export default Advisor;
