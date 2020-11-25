import './DataListItemTemplate.scss';

import React, { useState } from 'react';
import propTypes from 'prop-types';

import messages from '../../Messages';
import { capitalize } from '../../Utilities/Common';
import { InsightsLabel } from '@redhat-cloud-services/frontend-components/components/esm/InsightsLabel';
import { SEVERITY_MAP } from './DataListItemTemplateConstants';
import { useIntl } from 'react-intl';

// components
import {
    Button,
    ButtonVariant,
    DataListItem,
    DataListItemRow,
    DataListCell,
    DataListContent,
    DataListItemCells,
    Title
} from '@patternfly/react-core/dist/esm/components';

// layouts
import { Flex } from '@patternfly/react-core/dist/esm/layouts';

// icons
import AngleRightIcon from '@patternfly/react-icons/dist/js/icons/angle-right-icon';

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

    return (
        <DataListItem
            aria-labelledby={ `ins-c-dashboard__list-item--${dataListItemTemplateName}` }
            isExpanded={ isExpanded }
            className={ `ins-c-dashboard__list-item` }
            key={ dataListItemTemplateKey }
            { ...props }
        >
            <DataListItemRow>
                <div className="pf-c-data-list__item-control">
                    <Button variant={ ButtonVariant.link } className="pf-c-data-list__item-control-button">
                        Dismiss
                    </Button>
                    <div
                        className="pf-c-data-list__toggle"
                        onClick={ () => setIsExpanded(!isExpanded) }
                        isExpanded={ isExpanded }
                        id={ `data-list-toggle-${dataListItemTemplateName}` }
                        aria-controls={ `data-list-item-${dataListItemTemplateName}` }
                    >
                        <Button id={ `data-list-item-${dataListItemTemplateName}-toggle` }
                            variant={ ButtonVariant.plain }
                            aria-expanded={ isExpanded }
                            type="button"
                            className="pf-m-link"
                        >
                            <span className="pf-c-data-list__toggle-text">
                                { isExpanded && 'Collapse' }
                                { !isExpanded && 'Expand' }
                            </span>
                            <div className="pf-c-data-list__toggle-icon">
                                <AngleRightIcon />
                            </div>
                        </Button>
                    </div>
                </div>
                <DataListItemCells
                    dataListCells={[
                        <DataListCell key={ `key-${dataListItemTemplateKey}-datalist-cell` }>
                            <Flex>
                                <Flex direction={ { default: 'column' } } spaceItems={ { default: 'spaceItemsNone' } } flex={ { default: 'flex_1' } }>
                                    <span className='date pf-u-color-200'>Newly released security rule {dataListItemTemplateDate }</span>
                                    <Title headingLevel="h4" size="md"
                                        className='pf-u-font-weight-light ins-c-title-toggle' id={ `itemDescription-${ dataListItemTemplateKey }` }>
                                        <span>
                                            {capitalize(intl.formatMessage({
                                                id: 'itemTitle',
                                                description: 'itemTitle',
                                                defaultMessage: dataListItemTemplateName
                                            }))}
                                        </span>
                                    </Title>
                                </Flex>
                                <div className="ins-c-new-rules-severities">
                                    <Flex alignItems={ { default: 'alignItemsCenter' } } alignSelf={ { default: 'alignSelfStretch' } }>
                                        { dataListItemTemplateSeverity === 1 &&
                                            <InsightsLabel
                                                value={ SEVERITY_MAP.low }
                                                text={ `${capitalize(intl.formatMessage(messages.low))}` }
                                            />
                                        }
                                        { dataListItemTemplateSeverity === 2 &&
                                            <InsightsLabel
                                                value={ SEVERITY_MAP.moderate }
                                                text={ `${capitalize(intl.formatMessage(messages.moderate))}` }
                                            />
                                        }
                                        { dataListItemTemplateSeverity === 3 &&
                                            <InsightsLabel
                                                value={ SEVERITY_MAP.important }
                                                text={ `${capitalize(intl.formatMessage(messages.important))}` }
                                            />
                                        }
                                        { dataListItemTemplateSeverity === 4 &&
                                            <InsightsLabel
                                                value={ SEVERITY_MAP.critical }
                                                text={ `${capitalize(intl.formatMessage(messages.critical))}` }
                                            />
                                        }
                                    </Flex>
                                </div>
                            </Flex>
                        </DataListCell>
                    ]}
                />
            </DataListItemRow>
            <DataListContent aria-label="Primary Content Details" id="ex-expand1" isHidden={ !isExpanded }>
                { dataListItemTemplateContent }
            </DataListContent>
        </DataListItem>
    );
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
