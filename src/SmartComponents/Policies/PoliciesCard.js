import React from 'react';

import { UI_BASE } from '../../AppConstants';
import { useIntl } from 'react-intl';
import messages from '../../Messages';

// components
import {
    Button,
    DataList,
    DataListItem,
    DataListItemRow,
    DataListCell,
    DataListItemCells,
    Title
} from '@patternfly/react-core/dist/esm/components';

// layouts
import {
    Flex,
    Grid
} from '@patternfly/react-core/dist/esm/layouts';

// icons
import FinishedIcon from '../../Icons/FinishedIcon';
import SlackHashIcon from '@patternfly/react-icons/dist/js/icons/slack-hash-icon';
import EnvelopeIcon from '@patternfly/react-icons/dist/js/icons/envelope-icon';
import BellIcon from '@patternfly/react-icons/dist/js/icons/bell-icon';
import CogsIcon from '@patternfly/react-icons/dist/js/icons/cogs-icon';

// template card
import {
    TemplateCardActions,
    TemplateCardBody
} from '../../PresentationalComponents/Template/TemplateCard';

// expandable card
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';

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
        className='ins-m-toggle-right-on-md'
        title={ intl.formatMessage(messages.policiesCardHeader) }
        header={
            <TemplateCardActions downloadReport="true" onDownload={ () => console.log('here') } />
        }
        body={
            <TemplateCardBody className="ins-c-custom-policies__card-body">
                <Grid hasGutter>
                    <DataList className='ins-m-no-padding ins-m-no-top-border' isCompact>
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
                                            </DataListCell>,
                                            <DataListCell key='secondary content' width={ 1 }>
                                                <Flex>
                                                    <span>Actions</span>
                                                    <Flex spaceItems={ { default: 'spaceItemsSm' } }>
                                                        { item.actions }
                                                    </Flex>
                                                </Flex>
                                            </DataListCell>
                                        ] }
                                    />
                                </DataListItemRow>
                            </DataListItem>
                        )}
                    </DataList>
                    <Button component='a' href={ `${UI_BASE}/policies` } variant='link' isInline>
                        {intl.formatMessage(messages.policiesCardCTA)}
                    </Button>
                </Grid>

            </TemplateCardBody>
        }
    />;
};

export default CustomPoliciesCard;
