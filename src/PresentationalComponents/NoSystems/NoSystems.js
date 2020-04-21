import React from 'react';

import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import {
    EmptyState,
    EmptyStateVariant,
    EmptyStateBody,
    EmptyStateIcon
} from '@patternfly/react-core/dist/js/components/EmptyState';

import { ClipboardCopy } from '@patternfly/react-core/dist/js/components/ClipboardCopy';
import { Button } from '@patternfly/react-core/dist/js/components/Button';
import { Stack } from '@patternfly/react-core/dist/js/layouts/Stack/Stack';
import { StackItem } from '@patternfly/react-core/dist/js/layouts/Stack/StackItem';
import ChartSpikeIcon from '@patternfly/react-icons/dist/js/icons/chartSpike-icon';
import { Main } from '@redhat-cloud-services/frontend-components/components/Main';
import { useIntl } from 'react-intl';
import messages from '../../Messages';

import './NoSystems.scss';

const NoSystems = () => {

    const intl = useIntl();

    return (
        <Main>
            <EmptyState variant={ EmptyStateVariant.small } className='ins-c-no-systems'>
                <EmptyStateIcon icon={ ChartSpikeIcon } />
                <Title headingLevel="h5" size="lg">
                    {intl.formatMessage(messages.noSystemsTitle)}
                </Title>
                <EmptyStateBody>
                    <Stack gutter='md'>
                        <StackItem>
                            {intl.formatMessage(messages.noSystemsDescription)}
                        </StackItem>
                        <StackItem>
                            <span className='ins-c-no-systems__helper'>
                                1. {intl.formatMessage(messages.noSystemsInstall)}
                            </span>
                            <ClipboardCopy>yum install insights-client</ClipboardCopy>
                        </StackItem>
                        <StackItem>
                            <span className='ins-c-no-systems__helper'>
                                2. {intl.formatMessage(messages.noSystemsRegister)}
                            </span>
                            <ClipboardCopy>insights-client --register</ClipboardCopy>
                        </StackItem>
                    </Stack>
                </EmptyStateBody>
                <Button
                    component="a"
                    href="https://access.redhat.com/products/red-hat-insights#getstarted"
                    target="_blank" variant="primary">
                    {intl.formatMessage(messages.noSystemsLink)}
                </Button>
            </EmptyState>
        </Main>
    );
};

export default NoSystems;
