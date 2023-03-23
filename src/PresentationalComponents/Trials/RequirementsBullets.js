import './trialsPage.scss';

import PropTypes from 'prop-types';
import { Title } from '@patternfly/react-core/dist/esm/components';
import { Split, SplitItem } from '@patternfly/react-core/dist/esm/layouts';
import React from 'react';

const RequirementsBullets = ({ icon, message, title }) => {
    return (
        <Split hasGutter className='bullet-item'>
            <SplitItem className={icon} style={{ alignItems: 'center', minWidth: '72px', maxWidth: '72px' }} />
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

RequirementsBullets.propTypes = {
    icon: PropTypes.node,
    message: PropTypes.string,
    title: PropTypes.string
};

export default RequirementsBullets;
