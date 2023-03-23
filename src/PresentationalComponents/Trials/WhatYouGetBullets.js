import './trialsPage.scss';

import PropTypes from 'prop-types';
import { Split, SplitItem } from '@patternfly/react-core/dist/esm/layouts';
import { CheckCircleIcon } from '@patternfly/react-icons';
import { Icon } from '@patternfly/react-core';
import React from 'react';

const WhatYouGetBullets = ({ message }) => {
    return (
        <Split hasGutter className='bullet-item'>
            <SplitItem>
                <Icon status='success' size='lg'>
                    <CheckCircleIcon />
                </Icon>
            </SplitItem>
            <SplitItem>
                {message}
            </SplitItem>
        </Split>
    );
};

WhatYouGetBullets.propTypes = {
    message: PropTypes.string
};

export default WhatYouGetBullets;
