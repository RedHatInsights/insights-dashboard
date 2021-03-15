import './Advisor.scss';

import * as AppActions from '../../AppActions';

// components
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Divider,
    Title
} from '@patternfly/react-core/dist/esm/components';
// layouts
import {
    Flex,
    FlexItem,
    Grid
} from '@patternfly/react-core/dist/esm/layouts';
import { INCIDENT_URL, SEVERITY_MAP } from './Constants';
import React, { useEffect, useState } from 'react';
import { capitalize, sapFilter, workloadsPropType } from '../../Utilities/Common';

import { ChartLegend } from '@patternfly/react-charts';
// icons
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
// expandable card
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import FailState from '../../PresentationalComponents/FailState/FailState';
import Loading from '../../PresentationalComponents/Loading/Loading';
// charts
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import PropTypes from 'prop-types';
// template card
import { TemplateCardBody } from '../../PresentationalComponents/Template/TemplateCard';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import  global_palette_black_300 from '@patternfly/react-tokens/dist/js/global_palette_black_300';
import  global_palette_blue_100 from '@patternfly/react-tokens/dist/js/global_palette_blue_100';
import  global_palette_blue_200 from '@patternfly/react-tokens/dist/js/global_palette_blue_200';
import  global_palette_blue_300 from '@patternfly/react-tokens/dist/js/global_palette_blue_300';
import  global_palette_blue_400 from '@patternfly/react-tokens/dist/js/global_palette_blue_400';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const Advisor = ({ recStats, recStatsStatus, advisorFetchStatsRecs, advisorFetchStatsSystems,
    advisorIncidents, advisorIncidentsStatus, advisorFetchIncidents, selectedTags, workloads, SID }) => {
    const colors = [
        global_palette_blue_100.value,
        global_palette_blue_200.value,
        global_palette_blue_300.value,
        global_palette_blue_400.value
    ];
    const intl = useIntl();
    const [trData, setTRData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [colorScale, setColorScale] = useState();
    const urlRest = `&reports_shown=true&impacting=true&offset=0&limit=10${selectedTags?.length ?
        `&tags=${selectedTags?.join()}` : ''}${workloads?.SAP ? '&sap_system=true' : ''}${SID?.length ? `&sap_sids=${SID?.join()}` : ''}`;
    const pieLegendClick = categoryData.map(({ value }) => `${UI_BASE}/advisor/recommendations?category=${value}${urlRest}`);
    const totalRiskUrl = (risk) => `${UI_BASE}/advisor/recommendations?total_risk=${risk}${urlRest}`;
    const pieLegendData = categoryData.map(item => ({ name: `${item.y} ${item.x} `, symbol: { fill: `${item.fill} `, type: 'circle' } }));

    useEffect(() => {
        const options = { ...sapFilter(workloads, SID), ...selectedTags?.length > 0 && { tags: selectedTags } };
        advisorFetchStatsRecs(options);
        advisorFetchStatsSystems(options);
        advisorFetchIncidents(options);
    }, [advisorFetchIncidents, advisorFetchStatsRecs, advisorFetchStatsSystems, selectedTags, workloads, SID]);

    useEffect(() => {
        if (recStatsStatus === 'fulfilled') {
            const { total_risk, category } = recStats;
            const categoryCount = category.Stability + category.Availability + category.Performance + category.Security;
            setTRData([
                {
                    title: `${capitalize(intl.formatMessage(messages.critical))} `,
                    risk: `${total_risk[SEVERITY_MAP.critical]}`
                },
                {
                    title: `${capitalize(intl.formatMessage(messages.important))} `,
                    risk: `${total_risk[SEVERITY_MAP.important]}`
                },
                {
                    title: `${capitalize(intl.formatMessage(messages.moderate))} `,
                    risk: `${total_risk[SEVERITY_MAP.moderate]}`
                },
                {
                    title: `${capitalize(intl.formatMessage(messages.low))} `,
                    risk: `${total_risk[SEVERITY_MAP.low]}`
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
                }, (categoryCount === 0 && { x: intl.formatMessage(messages.category), y: '0' })
            ]);
            setColorScale(categoryCount === 0 ? [global_palette_black_300.value] : colors);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intl, recStats, recStatsStatus]);

    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };

    return <Card>
        {advisorIncidentsStatus === 'pending' && <Loading />}
        {advisorIncidentsStatus === 'rejected' ?
            <TemplateCardBody><FailState appName='Advisor' /></TemplateCardBody>
            : <React.Fragment>
                <ExpandableCardTemplate
                    appName='Advisor'
                    className='ins-m-toggle-right-on-md'
                    title={intl.formatMessage(messages.advisorCardHeader1)}
                    body={
                        <TemplateCardBody className="ins-c-advisor-recs__card-body">
                            <Grid hasGutter>
                                <Flex
                                    direction={ { default: 'column' } }
                                    alignItems={ { default: 'alignItemsCenter' } }
                                    spaceItems={ { default: 'spaceItemsLg' } }
                                >
                                    <Flex>
                                        <ExclamationTriangleIcon className='pf-u-font-size-xl pf-u-warning-color-100' />
                                        <span className="pf-u-font-size-2xl pf-u-text-align-center pf-u-font-weight-normal">
                                            {intl.formatMessage(messages.incidents, { incidents: advisorIncidents?.meta?.count })}
                                        </span>
                                    </Flex>
                                    <FlexItem>
                                        <p className='pf-u-text-align-center'>{intl.formatMessage(messages.advisorCardMessage)}</p>
                                    </FlexItem>
                                    <FlexItem>
                                        <Button variant='secondary' isSmall component='a' href={ `${UI_BASE}${INCIDENT_URL}` }>
                                            {intl.formatMessage(messages.advisorCardCTA)}
                                        </Button>
                                    </FlexItem>
                                </Flex>
                            </Grid>
                        </TemplateCardBody>
                    }
                />
                <Divider inset={ { md: 'insetLg' } } />
                <ExpandableCardTemplate
                    appName='advisor-recommendation-by-total-risk'
                    className='ins-m-toggle-right-on-md'
                    title={intl.formatMessage(messages.advisorCardHeader2)}
                    body={
                        <TemplateCardBody className="ins-c-advisor-recs__card-body pf-u-pb-0">
                            <Flex justifyContent={ { default: 'justifyContentSpaceEvenly' } }>
                                {trData.map(({ title, risk }) =>
                                    <a key={ title } href={ totalRiskUrl(risk) }>
                                        <Flex
                                            direction={ { default: 'column' } }
                                            spaceItems={ { default: 'spaceItemsNone' } }
                                            alignItems={ { default: 'alignItemsCenter' } }
                                        >
                                            <span className="pf-u-font-size-2xl pf-u-color-100 pf-u-font-weight-normal">
                                                { risk }
                                            </span>
                                            <span className="pf-u-font-size-sm">
                                                { title }
                                            </span>
                                        </Flex>
                                    </a>)}
                            </Flex>
                        </TemplateCardBody>
                    }
                />
                <Card component="div">
                    <CardTitle>
                        <Title headingLevel="h4" size="lg">
                            {intl.formatMessage(messages.advisorCardHeader3)}
                        </Title>
                    </CardTitle>

                    <CardBody className="pf-u-pt-sm">
                        <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsLg' }}>
                            <Flex alignItems={ { default: 'alignItemsCenter' } }>
                                <FlexItem>
                                    <PieChart
                                        ariaDesc='Advisor Category pie chart'
                                        ariaTitle='Advisor Category pie chartt'
                                        constrainToVisibleArea={ true }
                                        data={ categoryData }
                                        colorScale={ colorScale }
                                        padding={ pieChartPadding }
                                        height={ 100 }
                                        width={ 100 }
                                    />
                                </FlexItem>
                                <FlexItem flex={ { default: 'flex_1s' } }>
                                    <ChartLegend
                                        x={ 0 }
                                        y={ 0 }
                                        width="auto"
                                        height={ 70 }
                                        data={ pieLegendData }
                                        orientation="horizontal"
                                        itemsPerRow={ 2 }
                                        click={ pieLegendClick }
                                    />
                                </FlexItem>
                            </Flex>
                        </Flex>
                    </CardBody>
                </Card>
            </React.Fragment>
        }
    </Card>;
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
    workloads: workloadsPropType,
    SID: PropTypes.arrayOf(PropTypes.string)
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
        workloads: DashboardStore.workloads,
        SID: DashboardStore.SID
    }),
    dispatch => ({
        advisorFetchStatsRecs: (data) => dispatch(AppActions.advisorFetchStatsRecs(data)),
        advisorFetchStatsSystems: (data) => dispatch(AppActions.advisorFetchStatsSystems(data)),
        advisorFetchIncidents: (data) => dispatch(AppActions.advisorFetchIncidents(data))
    })
)(Advisor);
