import React from 'react';
import propTypes from 'prop-types';
import { Grid, GridItem } from '@patternfly/react-core';
import './TemplateGrid.scss';

export const TemplateGrid = ({ children, ...props }) => {
    return (
        <Grid { ...props }>
            { children }
        </Grid>
    );
};

TemplateGrid.propTypes = {
    children: propTypes.any
};

export const TemplateGridItem = ({ children, isRemediationStatus, ...props }) => {
    return (
        <GridItem className={ isRemediationStatus &&  'ins-m-remediation-status' } { ...props }>
            { children }
        </GridItem>
    );
};

TemplateGridItem.propTypes = {
    isRemediationStatus: propTypes.boolean,
    children: propTypes.any
};
