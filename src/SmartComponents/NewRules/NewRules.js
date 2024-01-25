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
    Text,
    TextContent,
    Title
} from '@patternfly/react-core/dist/esm/components';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts';
import React, { useState } from 'react';

import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
import { DataListItemTemplate } from '../../PresentationalComponents/Template/DataListItemTemplate';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import { capitalize } from '../../Utilities/Common';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';

const NewRules = () => {
    const intl = useIntl();
    const [isExpanded, setIsExpanded] = useState(JSON.parse(localStorage.getItem('dashboard_expanded_cta') || 'true'));
    const vulnerabilities = useSelector(({ DashboardStore }) => DashboardStore.vulnerabilities);
    let { recent_rules: newRules } = vulnerabilities;

    return <DataList className='insd-c-dashboard-data-list insd-m-toggle-right-on-md insd-m-no-border pf-m-compact'
        gridBreakpoint='none'>
        <DataListItem aria-labelledby='collapse-all-text' isExpanded={isExpanded}>
            <DataListItemRow className='insd-c-dashboard-data-list__title-row'>
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
                            <TextContent className='insd-c-width-limiter'
                                style={{
                                    '--insd-c-width-limiter--MaxWidth-on-lg': '50ch',
                                    '--insd-c-width-limiter--MinWidth-on-lg': '50ch',
                                    '--insd-c-width-limiter--MaxWidth-on-2xl': '70ch',
                                    '--insd-c-width-limiter--MinWidth-on-2xl': '70ch'
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
                                            <InsightsLink app='vulnerability' to={`/cves/${cve}`}>{cve}</InsightsLink>
                                        </DescriptionListDescription>
                                    )}</DescriptionListGroup>
                            </DescriptionList>
                            <Flex flex={{ md: 'flex_1', xl: 'flexDefault' }}>
                                {item.node_id && <a href={`https://access.redhat.com/node/${item.node_id}`} rel='noreferrer' target='_blank'>
                                    {intl.formatMessage(messages.moreAbout)}
                                </a>}
                            </Flex>
                        </Flex>
                        <Flex flex={{ default: 'flex_2' }} alignItems={{ default: 'alignItemsCenter' }}>
                            <TextContent>
                                <Text component="h4" className="pf-u-mb-xs">
                                    <ExclamationCircleIcon
                                        color="var(--pf-global--danger-color--100)"
                                        className="pf-u-mr-sm"
                                        style={{ verticalAlign: -1 }}
                                    />
                                    {intl.formatMessage(messages.systemsExposed, { count: item.systems_affected })}
                                </Text>
                                {intl.formatMessage(messages.systemsExposedDescription)}
                            </TextContent>
                        </Flex>
                    </Flex>
                } />
        )}
    </DataList>;
};

export default NewRules;
