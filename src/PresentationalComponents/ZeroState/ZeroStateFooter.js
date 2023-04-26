import { Title } from '@patternfly/react-core';
import '../ZeroState/_zero-state.scss';

import {
    Flex,
    FlexItem
} from '@patternfly/react-core/dist/esm/layouts/Flex/index';
import {
    Grid,
    GridItem
} from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import React from 'react';
import zeroStateConstants from './zeroStateConstants';
import propTypes from 'prop-types';

const ZeroStateFooter = ({
    appName = 'Vulnerability',
    documentation = zeroStateConstants[`${appName.toUpperCase()}_ZERO_STATE`].documentation
}) => {
    return (
        <div className='footer pf-u-mt-lg pf-u-ml-md pf-u-mr-md pf-u-mb-md'  style={{ backgroundColor: '#fff' }}>
            <Grid lg={ 4 } hasGutter className='pf-u-p-xl'>
                <GridItem>
                    <Flex direction={{ default: 'column' }}>
                        <FlexItem>
                            <Title headingLevel='h1' size='lg'>{appName} documentation</Title>
                        </FlexItem>
                        {documentation.map(item => (
                            <FlexItem key={item.title} >
                                <a component='a'
                                    target='_blank'
                                    rel="noreferre noreferrer"
                                    href={item.link} >{item.title}</a>
                            </FlexItem>
                        ))}
                    </Flex>
                </GridItem>
                <GridItem >
                    <Flex direction={{ default: 'column' }} spacer={{ default: 'spacerSm' }}>
                        <FlexItem>
                            <Title headingLevel='h1' size='lg'>Learn about Insights</Title>
                        </FlexItem>
                        <FlexItem>
                            <a component='a'
                                target='_blank'
                                rel='noreferrer'
                                href={'https://www.redhat.com/en/technologies/management/insights'}>Product page</a>
                        </FlexItem>
                        <FlexItem>
                            <a component='a'
                                target='_blank'
                                rel='noreferrer'
                                href={'https://access.redhat.com/documentation/en-us/red_hat_insights/2023'}>Product documentation</a>
                        </FlexItem>
                        <FlexItem>
                            <a component='a'
                                target='_blank'
                                rel='noreferrer' href={'https://www.redhat.com/en/technologies/management/insights/data-application-security'} >
                                Data privacy and controls in Insights
                            </a>
                        </FlexItem>
                        <FlexItem>
                            <a component='a'
                                target='_blank'
                                rel='noreferrer' href={'https://console.redhat.com/docs/api'}>APIs</a>
                        </FlexItem>
                        <FlexItem>
                            <a component='a'
                                target='_blank'
                                rel='noreferrer' href={'https://www.redhat.com/en/blog/channel/red-hat-insights'}>Blog</a>
                        </FlexItem>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex direction={{ default: 'column' }}>
                        <FlexItem>
                            <Title headingLevel='h1' size='lg'>Other bundles</Title>
                        </FlexItem>
                        <FlexItem>
                            <a component='a'
                                target='_blank'
                                rel='noreferrer' href={'https://console.redhat.com/openshift'}>OpenShift</a>
                        </FlexItem>
                        <FlexItem>
                            <a component='a'
                                target='_blank'
                                rel='noreferrer' href={'https://console.redhat.com/application-services/overview'}>Application and Data Services</a>
                        </FlexItem>
                        <FlexItem>
                            <a component='a'
                                target='_blank'
                                rel='noreferrer' href={'https://console.redhat.com/edge/'}>Edge Managment</a>
                        </FlexItem>
                        <FlexItem>
                            <a component='a'
                                target='_blank'
                                rel='noreferrer' href={'https://console.redhat.com/ansible/ansible-dashboard'}>Ansible Automation Platform</a>
                        </FlexItem>
                    </Flex>
                </GridItem>
            </Grid>
        </div>

    );
};

export default ZeroStateFooter;

ZeroStateFooter.propTypes = {
    appName: propTypes.string,
    documentation: propTypes.array
};
