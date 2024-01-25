import { Text, TextContent, TextVariants, Title } from '@patternfly/react-core/dist/esm/components';
import propTypes from 'prop-types';
import { GridItem } from '@patternfly/react-core';
import { ArrowRightIcon } from '@patternfly/react-icons';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const AppSectionItems = ({ app }) => {
    const intl = useIntl();

    return (
        <GridItem md={ 4 }>
            <TextContent>
                <Text component={TextVariants.h3}>
                    {app.title}
                </Text>
                <Text>
                    {intl.formatMessage(app.description)}
                </Text>
                <Title headingLevel='h4'>
                    <Link to={app.link} className='pf-c-button pf-m-link pf-m-inline pf-m-display-lg'>
                        Get started <ArrowRightIcon />
                    </Link>
                </Title>
            </TextContent>
        </GridItem>
    );
};

AppSectionItems.propTypes = {
    app: propTypes.object
};

export default AppSectionItems;
