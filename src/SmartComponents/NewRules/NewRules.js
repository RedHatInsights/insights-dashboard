import './NewRules.scss';

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
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts';

import { DataListItemTemplate } from '../../PresentationalComponents/Template/DataListItemTemplate';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import React from 'react';
import { UI_BASE } from '../../AppConstants';
import { capitalize } from '../../Utilities/Common';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

const NewRules = () => {
    const intl = useIntl();
    const vulnerabilities = useSelector(({ DashboardStore }) => DashboardStore.vulnerabilities);
    let { recent_rules: newRules } = vulnerabilities;
    const severitColor = {
        1: ['#2b9af3', '#06c'],
        2: ['#f4c145', '#c58c00'],
        3: ['#ec7a08', '#8f4700'],
        4: ['#c9190b', '#470000']
    };
    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };

    return newRules?.length > 0 ? <DataList className='ins-c-dashboard-data-list ins-m-toggle-right-on-md ins-m-no-border pf-m-compact'
        gridBreakpoint='none'>
        {newRules.map((item, index) =>
            <DataListItemTemplate
                key={item.key}
                dataListItemTemplateKey={item.key}
                dataListItemTemplateName={item.name}
                dataListItemTemplateSeverity={item.severity}
                dataListItemTemplateDate={item.public_date}
                dataListItemTemplateContent={
                    <Flex direction={{ default: 'column', md: 'row' }}
                        alignItems={{ md: 'alignItemsFlexStart' }}
                        spaceItems={{ md: 'spaceItems2xl' }}>
                        <Flex direction={{ default: 'column' }} flex={{ md: 'flex_3', xl: 'flexDefault' }}>
                            <Title headingLevel="h4" size="xl" className='pf-u-font-weight-lights'>
                                <span>
                                    {capitalize(intl.formatMessage({
                                        id: 'itemTitle',
                                        description: 'itemTitle',
                                        defaultMessage: item.name
                                    }))}</span>
                            </Title>
                            <TextContent className='ins-c-width-limiter'
                                style={{
                                    '--ins-c-width-limiter--MaxWidth-on-lg': '50ch',
                                    '--ins-c-width-limiter--MinWidth-on-lg': '50ch',
                                    '--ins-c-width-limiter--MaxWidth-on-2xl': '70ch',
                                    '--ins-c-width-limiter--MinWidth-on-2xl': '70ch'
                                }}>
                                <div>
                                    {capitalize(intl.formatMessage({
                                        id: `itemDescription-${index}`,
                                        description: `itemDescription-${index}`,
                                        defaultMessage: item.description
                                    }))}</div>
                            </TextContent>
                            <DescriptionList>
                                <DescriptionListGroup>
                                    <DescriptionListTerm>Associated CVEs</DescriptionListTerm>
                                    {item.associated_cves.map((cve) =>
                                        <DescriptionListDescription key={cve.key}>
                                            <a href={`${UI_BASE}/vulnerability/cves/${cve}`}>{cve}</a>
                                        </DescriptionListDescription>
                                    )}</DescriptionListGroup>
                            </DescriptionList>
                            <Flex flexDefault={{ md: 'flex_1', xl: 'flexDefault' }}>
                                <Button type="a" href={`${UI_BASE}/vulnerability/cves/${item.associated_cves[0]}`}
                                    component='a' variant="secondary">{intl.formatMessage(messages.viewDetails)}</Button>
                                <a href={`https://access.redhat.com/node/${item.node_id}`} rel='noreferrer' target='_blank'>
                                    {intl.formatMessage(messages.moreAbout)}
                                </a>
                            </Flex>
                        </Flex>
                        <Flex flex={{ default: 'flex_2', xl: 'flexDefault' }} alignItems={{ default: 'alignItemsCenter' }}>
                            <Flex alignItems={{ default: 'alignItemsCenter' }} flexWrap={{ default: 'nowrap' }}>
                                <FlexItem>
                                    <PieChart
                                        ariaDesc="--"
                                        ariaTitle="--"
                                        data={[{ x: 'Total systems', y: vulnerabilities.system_count },
                                            { x: 'Systems affected', y: item.systems_affected }
                                        ]}
                                        labels={({ datum }) => `${datum.x}: ${datum.y}`}
                                        padding={pieChartPadding}
                                        height={80}
                                        width={80}
                                        colorScale={severitColor[item.severity]} />
                                </FlexItem>
                                <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsNone' }}>
                                    <div className="pf-u-font-size-2xl">{item.systems_affected}</div>
                                    <div>{intl.formatMessage(messages.systemsExposed)}</div>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                } />
        )}</DataList>
        : <React.Fragment />;
};

export default NewRules;
