import { Card, PageSection, Title } from '@patternfly/react-core';
import '../ZeroState/_zero-state.scss';

import {
    Flex,
    FlexItem,
    Grid,
    GridItem
} from '@patternfly/react-core';
import React from 'react';
import { getZeroStateConstants, getProductName } from './zeroStateConstants';
import propTypes from 'prop-types';

const ZeroStateFooter = ({
    appName,
    brandName,
    documentation
}) => {
    const zeroStateConstants = getZeroStateConstants(brandName);
    const actualDocumentation = documentation || zeroStateConstants[`${appName.toUpperCase()}_ZERO_STATE`].documentation;
    // Prefer an explicit documentationTitleText from constants when available
    const configuredTitle = zeroStateConstants[`${appName.toUpperCase()}_ZERO_STATE`]?.documentationTitleText;
    const documentationTitleText = configuredTitle || appName.replace('_', ' ') + ' documentation';
    return (
        <PageSection hasBodyWrapper className='footer' isWidthLimited>
            <Card>
                <Grid lg={ 4 } hasGutter className='pf-v6-u-p-xl'>
                    <GridItem>
                        <Flex direction={{ default: 'column' }}>
                            <FlexItem>
                                <Title headingLevel='h3' size='lg'>{documentationTitleText}</Title>
                            </FlexItem>
                            {actualDocumentation.map(item => (
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
                                <Title headingLevel='h3' size='lg'>Learn about {getProductName(brandName)}</Title>
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
                                Data privacy and controls in {getProductName(brandName)}
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
                                    href='/edge'>Edge Management</a>
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
    brandName: propTypes.string,
    documentation: propTypes.array
};
