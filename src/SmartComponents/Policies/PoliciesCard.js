// components
import {
    Button,
    DataList,
    DataListCell,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
    Title
} from '@patternfly/react-core/dist/esm/components';
// layouts
import {
    Flex,
    Grid
} from '@patternfly/react-core/dist/esm/layouts';

import BellIcon from '@patternfly/react-icons/dist/esm/icons/bell-icon';
import CogsIcon from '@patternfly/react-icons/dist/esm/icons/cogs-icon';
import EnvelopeIcon from '@patternfly/react-icons/dist/esm/icons/envelope-icon';
// expandable card
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
// icons
import FinishedIcon from '../../Icons/FinishedIcon';
import React from 'react';
import SlackHashIcon from '@patternfly/react-icons/dist/esm/icons/slack-hash-icon';
// template card
import { TemplateCardBody } from '../../PresentationalComponents/Template/TemplateCard';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';

/**
 * Custom policies card with a table
 */
const CustomPoliciesCard = () => {
    const datalist = [{
        key: 0,
        title: <a href="#">custom_policy_A1</a>,
        actions:
            <React.Fragment>
                <Button isInline variant="link" icon={<SlackHashIcon />} aria-label="Action 1" />
                <Button isInline variant="link" icon={<EnvelopeIcon />} aria-label="Action 2" />
                <Button isInline variant="link" icon={<BellIcon />} aria-label="Action 3" />
                <Button isInline variant="link" icon={<CogsIcon />} aria-label="Action 4" />
            </React.Fragment>
    }, {
        key: 1,
        title: <a href="#">custom_policy_A2</a>,
        actions:
            <React.Fragment>
                <Button isInline variant="link" icon={<SlackHashIcon />} aria-label="Action 1" />
                <Button isInline variant="link" icon={<EnvelopeIcon />} aria-label="Action 2" />
            </React.Fragment>
    }];

    const intl = useIntl();

    return <ExpandableCardTemplate
        appName='policies'
        className='insd-m-toggle-right-on-md'
        title={ intl.formatMessage(messages.policiesCardHeader) }
        body={
            <TemplateCardBody className="insd-c-custom-policies__card-body">
                <Grid hasGutter>
                    <DataList className='insd-m-no-padding insd-m-no-top-border' isCompact>
                        {datalist.map((item) =>
                            <DataListItem
                                key={ item.key }
                                aria-labelledby={ 'aria-labelledby="data-list-cell-' + item.key + '"' }
                                id={ 'data-list-item-' + item.key }
                            >
                                <DataListItemRow>
                                    <DataListItemCells
                                        dataListCells={ [
                                            <DataListCell key='primary content' width={ 1 }>
                                                <Flex
                                                    direction={ { default: 'column' } }
                                                    spaceItems={ { default: 'spaceItemsNone' } }
                                                >
                                                    <Title headingLevel="h4" size="md"
                                                        className='pf-u-font-weight-light' id={ 'data-list-cell-' + item.key }>
                                                        { item.title }
                                                    </Title>
                                                    <Flex alignItems={ { default: 'alignItemsCenter' } }>
                                                        <span>Last triggered</span>
                                                        <FinishedIcon/>
                                                        <span>5 mins ago</span>
                                                    </Flex>
                                                </Flex>
                                            </DataListCell>
                                        ] }
                                    />
                                </DataListItemRow>
                            </DataListItem>
                        )}
                    </DataList>
                    <InsightsLink app='policies' to='/' className="pf-c-button pf-m-inline pf-m-link">
                        {intl.formatMessage(messages.policiesCardCTA)}
                    </InsightsLink>
                </Grid>

            </TemplateCardBody>
        }
    />;
};

export default CustomPoliciesCard;
