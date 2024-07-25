import { Card, PageSection, Title } from '@patternfly/react-core';
import '../ZeroState/_zero-state.scss';

import {
    Flex,
    FlexItem,
    Grid,
    GridItem
} from '@patternfly/react-core';
import React from 'react';
import zeroStateConstants from './zeroStateConstants';
import propTypes from 'prop-types';

const ZeroStateFooter = ({
    appName,
    documentation = zeroStateConstants[`${appName.toUpperCase()}_ZERO_STATE`].documentation
}) => {
    return (
        <PageSection className='footer' isWidthLimited>
            <Card>
                <Grid lg={ 4 } hasGutter className='pf-v5-u-p-xl'>
                    <GridItem>
                        <Flex direction={{ default: 'column' }}>
                            <FlexItem>
                                <Title headingLevel='h3' size='lg'>{appName.replace('_', ' ')} documentation</Title>
                            </FlexItem>
                            {documentation.map(item => (
                                <FlexItem key={item.title} >
                                    <a
                                        target='_blank'
                                        rel="noreferrer"
                                        href={item.link} >{item.title}</a>
                                </FlexItem>
                            ))}
                        </Flex>
                    </GridItem>
                    <GridItem >
                        <Flex direction={{ default: 'column' }} spacer={{ default: 'spacerSm' }}>
                            <FlexItem>
                                <Title headingLevel='h3' size='lg'>Learn about Insights</Title>
                            </FlexItem>
                            <FlexItem>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href={'https://www.redhat.com/en/technologies/management/insights'}>Product page</a>
                            </FlexItem>
                            <FlexItem>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href={'https://access.redhat.com/documentation/en-us/red_hat_insights/1-latest'}>Product documentation</a>
                            </FlexItem>
                            <FlexItem>
                                <a
                                    target='_blank'
                                    rel='noreferrer' href={'https://www.redhat.com/en/technologies/management/insights/data-application-security'} >
                                Data privacy and controls in Insights
                                </a>
                            </FlexItem>
                            <FlexItem>
                                <a
                                    target='_blank'
                                    rel='noreferrer' href={'https://console.redhat.com/docs/api'}>APIs</a>
                            </FlexItem>
                            <FlexItem>
                                <a
                                    target='_blank'
                                    rel='noreferrer' href={'https://www.redhat.com/en/blog/channel/red-hat-insights'}>Blog</a>
                            </FlexItem>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex direction={{ default: 'column' }}>
                            <FlexItem>
                                <Title headingLevel='h3' size='lg'>Other bundles</Title>
                            </FlexItem>
                            <FlexItem>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='/openshift'>OpenShift</a>
                            </FlexItem>
                            <FlexItem>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='/application-services/overview'>Application and Data Services</a>
                            </FlexItem>
                            <FlexItem>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='/edge'>Edge Managment</a>
                            </FlexItem>
                            <FlexItem>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='/ansible/ansible-dashboard'>Ansible Automation Platform</a>
                            </FlexItem>
                        </Flex>
                    </GridItem>
                </Grid>
            </Card>
        </PageSection>

    );
};

export default ZeroStateFooter;

ZeroStateFooter.propTypes = {
    appName: propTypes.string,
    documentation: propTypes.array
};
