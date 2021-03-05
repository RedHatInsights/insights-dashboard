import './NewRules.scss';

import * as AppActions from '../../AppActions';

// components
import {
    Button,
    DataList,
    DescriptionList,
    DescriptionListDescription,
    DescriptionListGroup,
    DescriptionListTerm,
    TextContent,
    Title
} from '@patternfly/react-core/dist/esm/components';
// layouts
import {
    Flex,
    FlexItem
} from '@patternfly/react-core/dist/esm/layouts';
import React, { useEffect } from 'react';

import { DataListItemTemplate } from '../../PresentationalComponents/Template/DataListItemTemplate';
// charts
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import PropTypes from 'prop-types';
import { UI_BASE } from '../../AppConstants';
import { capitalize } from '../../Utilities/Common';
import { connect } from 'react-redux';
import messages from '../../Messages';
// import { INCIDENT_URL, SEVERITY_MAP } from './Constants';
// import { SEVERITY_MAP } from './Constants';
// import { InsightsLabel } from '@redhat-cloud-services/frontend-components/components/esm/InsightsLabel';
import { useIntl } from 'react-intl';
// import { SEVERITY_MAP } from './Constants';
import { workloadsPropType } from '../../Utilities/Common';

// import messages from '../../Messages';
// import Loading from '../../PresentationalComponents/Loading/Loading';

// // charts
// import {
//     ChartPie
//     // severitColor
// } from '@patternfly/react-charts';

// const DistilledDataList = ({ fetchVulnerabilities, vulnerabilities, vulnerabilitiesFetchStatus, workloads, SID, selectedTags }) => {
const DistilledDataList = ({ fetchVulnerabilities, workloads, SID, selectedTags }) => {
    const intl = useIntl();

    useEffect(() => {
        const options = {
            ...workloads?.SAP?.isSelected && { sap_system: true },
            ...SID?.length > 0 && { sap_sids: SID },
            ...selectedTags?.length > 0 && { tags: selectedTags }
        };

        fetchVulnerabilities(options);
    }, [fetchVulnerabilities, workloads, SID, selectedTags]);

    let vulnerabilitiesTemp = {
        cves_by_severity: {
            '0to3.9': {
                count: 161,
                percentage: 14.0
            },
            '4to7.9': {
                count: 815,
                percentage: 73.0
            },
            '8to10': {
                count: 150,
                percentage: 13.0
            },
            na: {
                count: 0,
                percentage: 0.0
            }
        },
        cves_total: 1126,
        recent_cves: {
            last30days: 13,
            last7days: 1,
            last90days: 24
        },
        recent_rules: [
            {
                associated_cves: [
                    'CVE-2021-3156'
                ],
                description: `A heap-based buffer overflow was found in the way sudo parses command
                line arguments. This flaw is exploitable by any local user (normal users and system users,
                sudoers and non-sudoers), without authentication (i.e., the attacker does not need to know
                the user's password). Successful exploitation of this flaw could lead to privilege escalation.`,
                id: 'CVE_2021_3156_sudo|CVE_2021_3156_SUDO',
                name: 'sudo privilege escalation',
                node_id: 5737621,
                public_date: '2021-01-26T18:00:00Z',
                severity: 3,
                systems_affected: 144
            }, {
                associated_cves: [
                    'CVE-2021-1234'
                ],
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis erat
                elementum, venenatis orci eu, lobortis purus. Suspendisse sit amet nisi tempor,
                ullamcorper leo vitae, imperdiet tortor. Sed ligula mi, malesuada ac suscipit vel,
                sodales non justo. Aliquam et luctus felis. Integer nibh arcu, aliquet et malesuada
                a, tristique pulvinar nulla.`,
                id: 'CVE-2021-1234',
                name: 'your system failed',
                node_id: 5737622,
                public_date: '2021-01-26T18:00:00Z',
                severity: 2,
                systems_affected: 34
            }, {
                associated_cves: [
                    'CVE-2021-1234'
                ],
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis erat
                elementum, venenatis orci eu, lobortis purus. Suspendisse sit amet nisi tempor,
                ullamcorper leo vitae, imperdiet tortor. Sed ligula mi, malesuada ac suscipit vel,
                sodales non justo. Aliquam et luctus felis. Integer nibh arcu, aliquet et malesuada
                a, tristique pulvinar nulla.`,
                id: 'CVE-2021-1234',
                name: 'your system failed',
                node_id: 5737622,
                public_date: '2021-01-26T18:00:00Z',
                severity: 1,
                systems_affected: 222
            }, {
                associated_cves: [
                    'CVE-2021-1234'
                ],
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis erat
                elementum, venenatis orci eu, lobortis purus. Suspendisse sit amet nisi tempor,
                ullamcorper leo vitae, imperdiet tortor. Sed ligula mi, malesuada ac suscipit vel,
                sodales non justo. Aliquam et luctus felis. Integer nibh arcu, aliquet et malesuada
                a, tristique pulvinar nulla.`,
                id: 'CVE-2021-1234ss',
                name: 'your system failed',
                node_id: 5737622,
                public_date: '2021-01-26T18:00:00Z',
                severity: 4,
                systems_affected: 49
            }
        ],
        rules_total: 13,
        system_count: 765
    };

    let { recent_rules: newRules } = vulnerabilitiesTemp;

    let severitColor = {
        1: ['#2b9af3', '#06c'],
        2: ['#f4c145', '#c58c00'],
        3: ['#ec7a08', '#8f4700'],
        4: ['#c9190b', '#470000']
    };

    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };

    // if (vulnerabilitiesFetchStatus === 'fulfilled') {
    //     let { recentRules } = vulnerabilities;
    //     // newRules = [recentRules];
    // }

    return (
        <DataList className='ins-c-dashboard-data-list ins-m-toggle-right-on-md ins-m-no-border'
            gridBreakpoint='none'
        >
            {newRules.map((item, index) =>
                <DataListItemTemplate
                    key={ item.key }
                    dataListItemTemplateKey={ item.key }
                    dataListItemTemplateName={ item.name }
                    dataListItemTemplateSeverity={ item.severity }
                    dataListItemTemplateDate={ item.public_date }
                    dataListItemTemplateContent={
                        <Flex direction={ { default: 'column', md: 'row' } }
                            alignItems={ { md: 'alignItemsFlexStart' } }
                            spaceItems={ { md: 'spaceItems2xl' } }
                        >
                            <Flex direction={ { default: 'column' } } flex={ { md: 'flex_3', xl: 'flexDefault' } }>
                                <Title headingLevel="h4" size="xl" className='pf-u-font-weight-lights'>
                                    <span>
                                        {capitalize(intl.formatMessage({
                                            id: 'itemTitle',
                                            description: 'itemTitle',
                                            defaultMessage: item.name
                                        }))}
                                    </span>
                                </Title>
                                <TextContent className='ins-c-width-limiter'
                                    style={ {
                                        '--ins-c-width-limiter--MaxWidth-on-lg': '50ch',
                                        '--ins-c-width-limiter--MinWidth-on-lg': '50ch',
                                        '--ins-c-width-limiter--MaxWidth-on-2xl': '70ch',
                                        '--ins-c-width-limiter--MinWidth-on-2xl': '70ch'
                                    } }>
                                    <div>
                                        {capitalize(intl.formatMessage({
                                            id: `itemDescription-${index}`,
                                            description: `itemDescription-${index}`,
                                            defaultMessage: item.description
                                        }))}
                                    </div>
                                </TextContent>
                                <DescriptionList>
                                    <DescriptionListGroup>
                                        <DescriptionListTerm>Associated CVEs</DescriptionListTerm>
                                        { item.associated_cves.map((cve) =>
                                            <DescriptionListDescription key={ cve.key }>
                                                <a href={ `${UI_BASE}/vulnerability/cves/${cve}` }>{ cve }</a>
                                            </DescriptionListDescription>
                                        )}
                                    </DescriptionListGroup>
                                </DescriptionList>
                                <Flex flexDefault={ { md: 'flex_1', xl: 'flexDefault' } }>
                                    <Button type="a" href="#"
                                        rel='noreferrer' target='_blank' variant="secondary">{intl.formatMessage(messages.viewDetails)}</Button>
                                    <a href={ `https://access.redhat.com/node/${item.node_id}` } rel='noreferrer' target='_blank'>
                                        {intl.formatMessage(messages.moreAbout)}
                                    </a>
                                </Flex>
                            </Flex>
                            <Flex flex={ { default: 'flex_2', xl: 'flexDefault' } } alignItems={ { default: 'alignItemsCenter' } }>
                                <Flex alignItems={ { default: 'alignItemsCenter' } } flexWrap={ { default: 'nowrap' } }>
                                    <FlexItem>
                                        <PieChart
                                            ariaDesc="--"
                                            ariaTitle="--"
                                            data={ [
                                                { x: 'Total systems', y: item.systems_affected },
                                                { x: 'Systems affected', y: vulnerabilitiesTemp.system_count }
                                            ] }
                                            labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                                            padding={ pieChartPadding }
                                            height={ 80 }
                                            width={ 80 }
                                            colorScale={ severitColor[item.severity] }
                                        />
                                    </FlexItem>
                                    <Flex direction={ { default: 'column' } } spaceItems={ { default: 'spaceItemsNone' } }>
                                        <div className="pf-u-font-size-2xl">{ item.systems_affected }</div>
                                        <div>{intl.formatMessage(messages.systemsExposed)}</div>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                </DataListItemTemplate>
            )}
        </DataList>);
};

DistilledDataList.propTypes = {
    fetchVulnerabilities: PropTypes.func,
    vulnerabilities: PropTypes.object,
    vulnerabilitiesFetchStatus: PropTypes.string,
    selectedTags: PropTypes.array,
    workloads: workloadsPropType,
    SID: PropTypes.arrayOf(PropTypes.string)
};

export default connect(
    ({ DashboardStore }) => ({
        vulnerabilities: DashboardStore.vulnerabilities,
        vulnerabilitiesFetchStatus: DashboardStore.vulnerabilitiesFetchStatus,
        selectedTags: DashboardStore.selectedTags,
        workloads: DashboardStore.workloads,
        SID: DashboardStore.SID
    }),
    dispatch => ({
        fetchVulnerabilities: (options) => dispatch(AppActions.fetchVulnerabilities(options))
    })
)(DistilledDataList);
