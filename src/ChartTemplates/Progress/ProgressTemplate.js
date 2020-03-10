import React from 'react';
import propTypes from 'prop-types';
import { Progress, ProgressSize, ProgressVariant } from '@patternfly/react-core/dist/js/components/Progress';
import './ProgressTemplate.scss';

export const ProgressTemplate = ({ value, title, variant }) => {
    return (
        <Progress
            value={ value }
            title={ title }
            size={ ProgressSize.sm }
            variant={ variant === 'danger' && ProgressVariant.danger }
        />
    );
};

ProgressTemplate.propTypes = {
    value: propTypes.number,
    title: propTypes.string,
    variant: propTypes.string
};

export default ProgressTemplate;
