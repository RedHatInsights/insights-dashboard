import './NoSystems.scss';
import PropTypes from 'prop-types';
import React from 'react';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';
import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant, Stack, StackItem, Title } from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components';
import { ChartSpikeIcon, PlusCircleIcon } from '@patternfly/react-icons';

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

    return <Section>
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
    </Section>;
};

NoSystems.propTypes = {
    workloadIs: PropTypes.string
};

export default NoSystems;
