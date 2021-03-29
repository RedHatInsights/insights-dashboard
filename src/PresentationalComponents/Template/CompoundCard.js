import './CompoundCard.scss';
import React from 'react';
import propTypes from 'prop-types';
import { Card } from '@patternfly/react-core/dist/js/components/';

export const CompoundCard = ({className, children, ...props }) => (
    <Card className={`ins-c-dashboard-compound-card ins-c-dashboard__card ${className}` } { ...props }>
        { children }
    </Card>
);

CompoundCard.propTypes = {
    children: propTypes.any,
    className: propTypes.string
};

