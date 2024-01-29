import './NoSystems.scss';
import PropTypes from 'prop-types';
import React from 'react';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';
import {
    Button,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    EmptyStateVariant,
    Stack, StackItem,
    EmptyStateHeader,
    EmptyStateFooter  } from '@patternfly/react-core';
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
        <EmptyState variant={ EmptyStateVariant.sm } className='insd-c-empty-state-no-systems'>
            <EmptyStateHeader
                titleText={<>{workloadTypes[workloadIs]?.title || intl.formatMessage(messages.noSystemsTitle)}</>}
                icon={<EmptyStateIcon icon={ workloadTypes[workloadIs]?.icon || ChartSpikeIcon } />}
                headingLevel='h5' />
            <EmptyStateBody>
                <Stack hasGutter>
                    <StackItem>
                        {workloadTypes[workloadIs]?.body || intl.formatMessage(messages.noSystemsDescription)}
                    </StackItem>
                </Stack>
            </EmptyStateBody><EmptyStateFooter>
                <InsightsLink app='registration' to="/">
                    <Button variant='primary'>
                        {intl.formatMessage(messages.registerYourSystems)}
                    </Button>
                </InsightsLink>
            </EmptyStateFooter></EmptyState>
    </Section>;
};

NoSystems.propTypes = {
    workloadIs: PropTypes.string
};

export default NoSystems;
