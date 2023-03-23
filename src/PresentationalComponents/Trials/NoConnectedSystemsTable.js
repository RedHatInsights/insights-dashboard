import React from 'react';
import {
    EmptyStateBody,
    EmptyState,
    EmptyStateVariant,
    Text,
    TextContent,
    TextVariants,
    Title,
    Bullseye
} from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import trialsMessages from './TrialsMessages';

const NoConnectedSystemsTable = () => {
    const intl = useIntl();
    return (
        <Bullseye>
            <EmptyState variant={EmptyStateVariant.full}>
                <Title headingLevel="h2" size="lg">
                    {intl.formatMessage(trialsMessages.noConnectedSystemsTitle)}
                </Title>
                <EmptyStateBody>
                    <TextContent>
                        <Text component={TextVariants.p}>
                            {intl.formatMessage(trialsMessages.noConnectedSystemsParagraphOne)}
                        </Text>
                        <Text component={TextVariants.p}>
                            {intl.formatMessage(trialsMessages.noConnectedSystemsParagraphTwo, {
                                a: (chunks) => <a href={`https://access.redhat.com/articles/rhc-registration`}>{ chunks }</a>
                            })}
                        </Text>
                    </TextContent>
                </EmptyStateBody>
            </EmptyState>
        </Bullseye>
    );
};

export default NoConnectedSystemsTable;
