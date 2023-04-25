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
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ZeroStateFooter = () => {
    return (
        <div className='footer pf-u-mt-lg' style={{ backgroundColor: '#fff' }}>
            <Grid lg={ 4 } hasGutter className='pf-u-p-xl'>
                <GridItem >
                    <Flex direction={{ default: 'column' }} spacer={{ default: 'spacerSm' }}>
                        <FlexItem>
                            <Title headingLevel='h1' size='xl'>Learn about Insights</Title>
                        </FlexItem>
                        <FlexItem>
                            <Link>Data privacy and controls in Insights</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link>Red Hat Customer portal Link</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link>Product documentation</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link>Blog</Link>
                        </FlexItem>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex direction={{ default: 'column' }}>
                        <FlexItem>
                            <Title headingLevel='h1' size='xl'>Other bundles</Title>
                        </FlexItem>
                        <FlexItem>
                            <Link>OpenShift</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link>Application and Data Services</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link>Edge Managment</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link>Ansible Automation Platform</Link>
                        </FlexItem>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex direction={{ default: 'column' }}>
                        <FlexItem>
                            <Title headingLevel='h1' size='xl'>Explore more</Title>
                        </FlexItem>
                        <FlexItem>
                            <Link>Dashboard</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link>Operations</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link>Content</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link>Buisiness</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link>Automation</Link>
                        </FlexItem>
                    </Flex>
                </GridItem>

            </Grid>
        </div>

    );
};

export default ZeroStateFooter;

ZeroStateFooter.propTypes = {};
