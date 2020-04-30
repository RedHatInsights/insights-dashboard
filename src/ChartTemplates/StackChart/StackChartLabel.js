import React from 'react';
import { ChartLabel } from '@patternfly/react-charts';
import propTypes from 'prop-types';

export const StackChartLabel = ({ link, ...props }) => (
    <a className="pf-c-button pf-m-link" href={ link }><ChartLabel { ...props }/></a>
);

StackChartLabel.propTypes = {
    link: propTypes.string
};

export default StackChartLabel;
