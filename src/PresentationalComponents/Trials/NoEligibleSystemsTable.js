import React from 'react';
import {
    EmptyStateBody,
    EmptyState,
    EmptyStateVariant,
    Text,
    TextContent,
    TextVariants,
    Title,
    Bullseye,
    Button
} from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import trialsMessages from './TrialsMessages';

const NoEligibleSystemsTable = () => {
    const intl = useIntl();
    return (
        <Bullseye>
            <EmptyState variant={EmptyStateVariant.full}>
                <Title headingLevel="h2" size="lg">
                    {intl.formatMessage(trialsMessages.noEligibleSystemsTitle)}
                </Title>
                <EmptyStateBody>
                    <TextContent>
                        <Text component={TextVariants.p}>
                            {intl.formatMessage(trialsMessages.noEligibleSystemsParagraphOne)}
                        </Text>
                        <Text component={TextVariants.p}>
                            {intl.formatMessage(trialsMessages.noEligibleSystemsParagraphTwo, {
                                a: (chunks) => <a href={`https://access.redhat.com/articles/rhc-registration`}>{ chunks }</a>
                            })}
                        </Text>
                        <Button
                            variant='primary'
                            component='a'
                            href='https://access.redhat.com/downloads/content/479/ver=/rhel---9/9.1/x86_64/product-software'
                            target='blank'
                            rel='noopener noreferrer'
                        >
                            Download Red Hat Enterprise Linux
                        </Button>
                    </TextContent>
                </EmptyStateBody>
            </EmptyState>
        </Bullseye>
    );
};

export default NoEligibleSystemsTable;
