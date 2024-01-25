import './DataListItemTemplate.scss';

import {
    Button,
    ButtonVariant,
    DataListCell,
    DataListContent,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
    Label,
    Title
} from '@patternfly/react-core/dist/esm/components';
import React, { useState } from 'react';

import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
import DashboardIcon from '../DashboardIcon/DashboardIcon';
import { DateFormat } from '@redhat-cloud-services/frontend-components';
import { Flex } from '@patternfly/react-core/dist/esm/layouts';
import { capitalize } from '../../Utilities/Common';
import messages from '../../Messages';
import propTypes from 'prop-types';
import { useIntl } from 'react-intl';

export const DataListItemTemplate = ({
    dataListItemTemplateContent,
    dataListItemTemplateDate,
    dataListItemTemplateSeverity,
    dataListItemTemplateKey,
    dataListItemTemplateName,
    dataListItemTemplateIsExpanded,
    ...props
}) => {
    const [isExpanded, setIsExpanded] = useState(dataListItemTemplateIsExpanded);
    const intl = useIntl();

    return <DataListItem
        aria-labelledby={`itemDescription-${dataListItemTemplateKey}`}
        isExpanded={isExpanded}
        className={`insd-c-dashboard__list-item`}
        key={dataListItemTemplateKey}
        {...props}
    >
        <DataListItemRow className="insd-c-dashboard-data-list__controller-row">
            <div className='pf-c-data-list__item-control'>
                <div className='pf-c-data-list__toggle'
                    onClick={() => setIsExpanded(!isExpanded)}
                    isExpanded={isExpanded}
                    id={`data-list-toggle-${dataListItemTemplateName}`}
                    aria-controls={`data-list-item-${dataListItemTemplateName}`}>
                    <Button id={`data-list-item-${dataListItemTemplateName}-toggle`} variant={ButtonVariant.plain} aria-expanded={isExpanded}
                        type='button'
                        className='pf-m-link'                    >
                        <span className='pf-c-data-list__toggle-text pf-c-button pf-m-inline pf-m-link'>
                            {isExpanded && intl.formatMessage(messages.collapse)}
                            {!isExpanded && intl.formatMessage(messages.expand)}
                        </span>
                        <div className='pf-c-data-list__toggle-icon'>
                            <AngleRightIcon />
                        </div>
                    </Button>
                </div>
            </div>
            <DataListItemCells
                dataListCells={[
                    <DataListCell key={`key-${dataListItemTemplateKey}-datalist-cell`} className="insd-c-dashboard-data-list__controller-row-cell">
                        <div className='insd-c-new-rules-severities'>
                            <Flex alignItems={{ default: 'alignItemsCenter' }} alignSelf={{ default: 'alignSelfStretch' }}>
                                {dataListItemTemplateSeverity === 1 &&
                                    <Label icon={<DashboardIcon type='lowSeverity' />}>{capitalize(intl.formatMessage(messages.low))}</Label>
                                }
                                {dataListItemTemplateSeverity === 2 &&
                                    <Label color="blue" icon={<DashboardIcon type='moderateSeverity' />}>
                                        {capitalize(intl.formatMessage(messages.moderate))}
                                    </Label>
                                }
                                {dataListItemTemplateSeverity === 3 &&
                                    <Label color="orange" icon={<DashboardIcon type='importantSeverity' />}>
                                        {capitalize(intl.formatMessage(messages.important))}
                                    </Label>
                                }
                                {dataListItemTemplateSeverity === 4 &&
                                    <Label color="red" icon={<DashboardIcon type='criticalSeverity' />}>
                                        {capitalize(intl.formatMessage(messages.critical))}
                                    </Label>
                                }
                            </Flex>
                        </div>
                        <span className='insd-c-dashboard-data-list__date pf-u-color-200 pf-u-font-size-sm'>
                            {capitalize(intl.formatMessage(messages.newRulesDateTitle))}
                            &nbsp;<DateFormat type='onlyDate' date={dataListItemTemplateDate} />
                        </span>
                        <Title headingLevel='h4' size='md'
                            className='pf-u-font-weight-light insd-c-title-toggle' id={`itemDescription-${dataListItemTemplateKey}`}>
                            <span>
                                {capitalize(intl.formatMessage({
                                    id: 'itemTitle',
                                    description: 'itemTitle',
                                    defaultMessage: dataListItemTemplateName
                                }))}
                            </span>
                        </Title>
                    </DataListCell>
                ]}
            />
        </DataListItemRow>
        <DataListContent aria-label='Primary Content Details' id='ex-expand1' isHidden={!isExpanded}>
            {dataListItemTemplateContent}
        </DataListContent>
    </DataListItem>;
};

DataListItemTemplate.propTypes = {
    dataListItemTemplateContent: propTypes.any,
    dataListItemTemplateDate: propTypes.string,
    dataListItemTemplateSeverity: propTypes.number,
    dataListItemTemplateKey: propTypes.any,
    dataListItemTemplateName: propTypes.string,
    dataListItemTemplateIsExpanded: propTypes.bool,
    children: propTypes.any
};
