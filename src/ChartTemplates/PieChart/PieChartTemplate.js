import React from 'react';
import propTypes from 'prop-types';
import { ChartPie } from '@patternfly/react-charts';
// import './PieChartTemplate.scss';

export const PieChart = ({ ...props }) => {
    // const paddingObject = Object.keys(props.padding).map(function(key, index) {
    //     return { bottom: value[index], left: value[index], right: value[index], top: value[index] }
    // )};

    return (
        console.log(props.padding);
        <ChartPie
            ariaDesc={ props.ariaDesc }
            ariaTitle={ props.ariaTitle }
            constrainToVisibleArea={ props.constrainToVisibleArea }
            data={ [{ x: 'Red Hat Enterprise Linux 8', y: 20 }, { x: 'Red Hat Enterprise Linux 7', y: 20 }, { x: 'Other', y: 60 }] }
            height={ props.height }
            labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
            legendData={ [{ name: 'Red Hat Enterprise Linux 8' }, { name: 'Red Hat Enterprise Linux 7' }, { name: 'Other' }] }
            legendOrientation={ props.legendOrientation }
            legendPosition={ props.legendPosition }
            padding={ props.padding }
            width={ props.width }
        />
    );
};

PieChart.propTypes = {
    ariaDesc: propTypes.string,
    ariaTitle: propTypes.string,
    constrainToVisibleArea: propTypes.boolean,
    data: propTypes.any,
    padding: propTypes.any,
    height: propTypes.number,
    legendOrientation: propTypes.boolean,
    legendPosition: propTypes.boolean,
    width: propTypes.number
};

export default PieChart;
