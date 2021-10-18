import './CompoundCard.scss';

import { Card } from '@patternfly/react-core/dist/esm/components/Card/Card';
import React from 'react';
import propTypes from 'prop-types';

export const CompoundCard = ({ className, children, ...props }) => <Card
    className={`insd-c-dashboard-compound-card insd-c-dashboard__card ${className}`} {...props}>
    {children}
</Card>;

CompoundCard.propTypes = {
    children: propTypes.any,
    className: propTypes.string
};

