import { Card, CardBody, CardTitle, PageSection, Title } from '@patternfly/react-core/dist/esm/components';
import propTypes from 'prop-types';
import { Grid } from '@patternfly/react-core';
import React from 'react';
import AppSectionItems from './AppSectionItems';
import zeroStateConstants from './zeroStateConstants';

const AppSection = ({ appName }) => {
    const appSectionList = zeroStateConstants[`${appName.toUpperCase()}_ZERO_STATE`].otherApps;

    return (
        <PageSection isWidthLimited>
            <Card>
                <CardTitle>
                    <Title headingLevel='h3'>
                        Other Applications
                    </Title>
                </CardTitle>
                <CardBody>
                    <Grid hasGutter style={{ marginTop: '16px', marginBottom: '16px' }}>
                        {appSectionList.map((app) => {
                            return <AppSectionItems key={ app.title } app={ app } />;
                        })}
                    </Grid>
                </CardBody>
            </Card>
        </PageSection>
    );
};

AppSection.propTypes = {
    appName: propTypes.string
};

export default AppSection;
