import './NoSystems.scss';

import {
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    EmptyStateVariant
} from '@patternfly/react-core/dist/esm/components/EmptyState';

import { Button } from '@patternfly/react-core/dist/esm/components/Button';
import ChartSpikeIcon from '@patternfly/react-icons/dist/esm/icons/chartSpike-icon';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';
import PropTypes from 'prop-types';
import React from 'react';
import { Stack } from '@patternfly/react-core/dist/esm/layouts/Stack/Stack';
import { StackItem } from '@patternfly/react-core/dist/esm/layouts/Stack/StackItem';
import { Title } from '@patternfly/react-core/dist/esm/components/Title/Title';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';

const NoSystems = ({ workloadIs }) => {
    const intl = useIntl();

    const workloadTypes = {
        SAP: {
            icon: PlusCircleIcon,
            title: intl.formatMessage(messages.insightsForSap),
            // eslint-disable-next-line react/display-name
            body: intl.formatMessage(messages.providesAdditionalSAPworkload, { break: () => <React.Fragment><br /> <br /></React.Fragment> })
        }
    };

    return <Main>
        <EmptyState variant={ EmptyStateVariant.small } className='insd-c-empty-state-no-systems'>
            <EmptyStateIcon icon={ workloadTypes[workloadIs]?.icon || ChartSpikeIcon } />
            <Title headingLevel='h5' size='lg'>
                {workloadTypes[workloadIs]?.title || intl.formatMessage(messages.noSystemsTitle)}
            </Title>
            <EmptyStateBody>
                <Stack hasGutter>
                    <StackItem>
                        {workloadTypes[workloadIs]?.body || intl.formatMessage(messages.noSystemsDescription)}
                    </StackItem>
                </Stack>
            </EmptyStateBody>
            <InsightsLink app='registration' to="/">
                <Button variant='primary'>
                    {intl.formatMessage(messages.registerYourSystems)}
                </Button>
            </InsightsLink>
        </EmptyState>
    </Main>;
};

NoSystems.propTypes = {
    workloadIs: PropTypes.string
};

export default NoSystems;
