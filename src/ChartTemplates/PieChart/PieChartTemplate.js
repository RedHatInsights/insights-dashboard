import React from 'react';
import propTypes from 'prop-types';
import { ChartPie } from '@patternfly/react-charts/dist/js/components/ChartPie/ChartPie';
import './PieChartTemplate.scss';

export const PieChart = ({ ...props }) => {
    return (
        <div style={ { maxWidth: props.containerWidth, height: props.containerHeight } }>
            <ChartPie
                ariaDesc={ props.ariaDesc }
                ariaTitle={ props.ariaTitle }
                constrainToVisibleArea={ props.constrainToVisibleArea }
                data={ props.data }
                height={ props.height }
                labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                legendData={ props.legendData }
                legendOrientation={ props.legendOrientation }
                legendPosition={ props.legendPosition }
                padding={ props.padding }
                width={ props.width }
            />
        </div>
    );
};

PieChart.propTypes = {
    containerWidth: propTypes.number,
    containerHeight: propTypes.number,
    ariaDesc: propTypes.string,
    ariaTitle: propTypes.string,
    constrainToVisibleArea: propTypes.boolean,
    data: propTypes.array,
    legendData: propTypes.array,
    padding: propTypes.object,
    height: propTypes.number,
    legendOrientation: propTypes.boolean,
    legendPosition: propTypes.boolean,
    width: propTypes.number
};

export default PieChart;
