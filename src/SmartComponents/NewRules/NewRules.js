import './NewRules.scss';

import {
    Button,
    ButtonVariant,
    DataList,
    DataListCell,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
    DescriptionList,
    DescriptionListDescription,
    DescriptionListGroup,
    DescriptionListTerm,
    TextContent,
    Title
} from '@patternfly/react-core/dist/esm/components';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts';
import React, { useState } from 'react';

import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
import { DataListItemTemplate } from '../../PresentationalComponents/Template/DataListItemTemplate';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import { UI_BASE } from '../../AppConstants';
import { capitalize } from '../../Utilities/Common';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

const NewRules = () => {
    const intl = useIntl();
    const [isExpanded, setIsExpanded] = useState(JSON.parse(localStorage.getItem('dashboard_expanded_cta') || 'true'));
    const vulnerabilities = useSelector(({ DashboardStore }) => DashboardStore.vulnerabilities);
    let { recent_rules: newRules } = vulnerabilities;
    const severityColor = {
        1: ['#2b9af3', '#06c'],
        2: ['#f4c145', '#c58c00'],
        3: ['#ec7a08', '#8f4700'],
        4: ['#c9190b', '#470000']
    };
    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };

    return <DataList className='ins-c-dashboard-data-list ins-m-toggle-right-on-md ins-m-no-border pf-m-compact'
        gridBreakpoint='none'>
        <DataListItem aria-labelledby='collapse-all-text' isExpanded={isExpanded}>
            <DataListItemRow className='ins-c-dashboard-data-list__title-row'>
                <DataListItemCells
                    dataListCells={[
                        <DataListCell key='primary content'>
                            <Flex spaceItems={{ default: 'spaceItemsMd' }} alignItems={{ default: 'alignItemsCenter' }}
                                flexWrap={{ default: 'nowrap' }}>
                                <ExclamationTriangleIcon className='pf-u-font-size-xl pf-u-warning-color-100' />
                                <span id='collapse-all-text' className='pf-u-font-weight-bold'>{intl.formatMessage(messages.latestCritical)}</span>
                            </Flex>
                        </DataListCell>
                    ]}
                />
                <div className='pf-c-data-list__item-control'>
                    <div className='pf-c-data-list__toggle'
                        onClick={() => { localStorage.setItem('dashboard_expanded_cta', `${!isExpanded}`); setIsExpanded(!isExpanded); }}
                        isExpanded={isExpanded}
                        id={`data-list-toggle`}
                        aria-controls={`data-list-item`}>
                        <Button id={`data-list-item-toggle`} variant={ButtonVariant.plain} aria-expanded={isExpanded}
                            type='button'
                            className='pf-m-link'>
                            <span className='pf-c-data-list__toggle-text pf-c-button pf-m-inline pf-m-link'>
                                {isExpanded && intl.formatMessage(messages.collapseAll)}
                                {!isExpanded && intl.formatMessage(messages.expand)}
                            </span>
                            <div className='pf-c-data-list__toggle-icon'>
                                <AngleRightIcon />
                            </div>
                        </Button>
                    </div>
                </div>
            </DataListItemRow>
        </DataListItem>
        {isExpanded && newRules?.map((item, index) =>
            <DataListItemTemplate
                key={item.key}
                dataListItemTemplateKey={item.key}
                dataListItemTemplateName={item.name}
                dataListItemTemplateSeverity={item.severity}
                dataListItemTemplateDate={item.public_date}
                dataListItemTemplateContent={
                    <Flex direction={{ default: 'column', md: 'row' }}
                        alignItems={{ md: 'alignItemsFlexStart' }}
                        spaceItems={{ md: 'spaceItems2xl' }}
                        flexWrap={{ default: 'nowrap' }}>
                        <Flex direction={{ default: 'column' }} flex={{ md: 'flex_3' }}>
                            <FlexItem spacer={{ default: 'spacerXs' }}>
                                <Title headingLevel='h4' size='xl' className='pf-u-font-weight-lights'>
                                    <span>
                                        {capitalize(intl.formatMessage({
                                            id: 'itemTitle',
                                            description: 'itemTitle',
                                            defaultMessage: item.name
                                        }))}</span>
                                </Title>
                            </FlexItem>
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
                            <Flex flex={{ md: 'flex_1', xl: 'flexDefault' }}>
                                <Button type='a' href={`${UI_BASE}/vulnerability/cves/${item.associated_cves[0]}`}
                                    component='a' variant='secondary' isSmall>{intl.formatMessage(messages.viewDetails)}</Button>
                                {item.node_id && <a href={`https://access.redhat.com/node/${item.node_id}`} rel='noreferrer' target='_blank'>
                                    {intl.formatMessage(messages.moreAbout)}
                                </a>}
                            </Flex>
                        </Flex>
                        <Flex flex={{ default: 'flex_2' }} alignItems={{ default: 'alignItemsCenter' }}>
                            <Flex alignItems={{ default: 'alignItemsCenter' }} flexWrap={{ default: 'nowrap' }}>
                                <FlexItem>
                                    <PieChart
                                        ariaDesc='--'
                                        ariaTitle='--'
                                        data={[{ x: 'Total systems', y: vulnerabilities.system_count },
                                            { x: 'Systems affected', y: item.systems_affected }
                                        ]}
                                        labels={({ datum }) => `${datum.x}: ${datum.y}`}
                                        padding={pieChartPadding}
                                        height={80}
                                        width={80}
                                        colorScale={severityColor[item.severity]} />
                                </FlexItem>
                                <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsNone' }}>
                                    <div className='pf-u-font-size-2xl'>{item.systems_affected}</div>
                                    <div>{intl.formatMessage(messages.systemsExposed)}</div>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                } />
        )}
    </DataList>;
};

export default NewRules;
