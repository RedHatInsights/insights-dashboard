import React from 'react';
import propTypes from 'prop-types';
import { Progress, ProgressSize, ProgressVariant } from '@patternfly/react-core';

export const ProgressTemplate = ({ value, title, variant }) => {
    return (
        <Progress
            value={ value }
            title={ title }
            size={ ProgressSize.sm }
            variant={ ProgressVariant + '.' + variant }
        />
    );
};

ProgressTemplate.propTypes = {
    value: propTypes.number,
    title: propTypes.string,
    variant: propTypes.string
};

export default ProgressTemplate;
