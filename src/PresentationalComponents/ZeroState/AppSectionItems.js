import { Content, ContentVariants, Title } from '@patternfly/react-core';
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
            <Content>
                <Content component={ContentVariants.h3}>
                    {app.title}
                </Content>
                <Content component="p">
                    {intl.formatMessage(app.description)}
                </Content>
                <Title headingLevel='h4'>
                    <Link to={app.link} className='pf-v6-c-button pf-m-link pf-m-inline pf-m-display-lg'>
                        Get started <ArrowRightIcon />
                    </Link>
                </Title>
            </Content>
        </GridItem>
    );
};

AppSectionItems.propTypes = {
    app: propTypes.object
};

export default AppSectionItems;
