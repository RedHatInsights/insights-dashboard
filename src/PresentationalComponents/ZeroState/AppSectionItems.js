import { Button, Text, TextContent, TextVariants } from '@patternfly/react-core/dist/esm/components';
import propTypes from 'prop-types';
import { GridItem } from '@patternfly/react-core';
import { ArrowRightIcon } from '@patternfly/react-icons';
import React from 'react';
import { useIntl } from 'react-intl';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

const AppSectionItems = ({ app }) => {
    const intl = useIntl();
    const chrome = useChrome();

    return (
        <GridItem md={ 4 }>
            <TextContent>
                <Text component={TextVariants.h3}>
                    {app.title}
                </Text>
                <Text>
                    {intl.formatMessage(app.description)}
                </Text>
                <Text component={TextVariants.p}>
                    <Button
                        variant='link'
                        isLarge
                        isInline
                        component='a'
                        href={`${chrome.isBeta() ? '/beta' : ''}${app.link}`}
                    >
                        Get started <ArrowRightIcon />
                    </Button>
                </Text>
            </TextContent>
        </GridItem>
    );
};

AppSectionItems.propTypes = {
    app: propTypes.object
};

export default AppSectionItems;
