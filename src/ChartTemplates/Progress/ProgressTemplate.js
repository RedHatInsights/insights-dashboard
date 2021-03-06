import './ProgressTemplate.scss';

import { Progress, ProgressSize, ProgressVariant } from '@patternfly/react-core/dist/esm/components/Progress';

import React from 'react';
import propTypes from 'prop-types';

export const ProgressTemplate = ({ distance, label, value, title, variant }) => {
    return (
        <Progress
            distance={ distance }
            label={ label }
            value={ value }
            title={ title }
            size={ ProgressSize.sm }
            variant={ variant === 'danger' && ProgressVariant.danger }
        />
    );
};

ProgressTemplate.propTypes = {
    distance: propTypes.number,
    label: propTypes.string,
    value: propTypes.number,
    title: propTypes.string,
    variant: propTypes.string
};

export default ProgressTemplate;
