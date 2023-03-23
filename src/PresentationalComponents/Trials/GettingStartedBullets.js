import './trialsPage.scss';

import PropTypes from 'prop-types';
import { Title } from '@patternfly/react-core/dist/esm/components';
import { Split, SplitItem } from '@patternfly/react-core/dist/esm/layouts';
import React from 'react';

const GettingStartedBullets = ({ message, number, title }) => {
    return (
        <Split hasGutter className='bullet-item'>
            <SplitItem style={{ minWidth: '72px', maxWidth: '72px' }}>
                <div className='pf-u-mr-md'>
                    <Title headingLevel="h2" size="2xl" className='sm-c-trial__number'>
                        {number}
                    </Title>
                </div>
            </SplitItem>
            <SplitItem isFilled>
                <Title headingLevel="h2">
                    {title}
                </Title>
                <div className='start-trial-description'>
                    {message}
                </div>
            </SplitItem>
        </Split>
    );
};

GettingStartedBullets.propTypes = {
    message: PropTypes.string,
    number: PropTypes.string,
    title: PropTypes.string
};

export default GettingStartedBullets;
