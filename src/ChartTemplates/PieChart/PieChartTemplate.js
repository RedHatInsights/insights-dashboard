import React from 'react';
import propTypes from 'prop-types';
import { ChartPie } from '@patternfly/react-charts/dist/js/components/ChartPie/ChartPie';
import { ChartLegend } from '@patternfly/react-charts/dist/js/components/ChartLegend/ChartLegend';
import './PieChartTemplate.scss';

export const PieChart = ({ ...props }) => {
    return (
        <div className={ props.className } style={ { width: props.containerWidth, height: props.containerHeight } }>
            <ChartPie
                ariaDesc={ props.ariaDesc }
                ariaTitle={ props.ariaTitle }
                constrainToVisibleArea={ props.constrainToVisibleArea }
                data={ props.data }
                height={ props.height }
                labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                legendComponent={ <ChartLegend
                    data={ props.legendData }
                    rowGutter={ 0.5 }
                /> }
                legendOrientation={ props.legendOrientation }
                legendPosition={ props.legendPosition }
                padding={ props.padding }
                width={ props.width }
                colorScale={ props.colorScale }
            />
        </div>
    );
};

PieChart.propTypes = {
    className: propTypes.string,
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
    width: propTypes.number,
    colorScale: propTypes.array,
    maxWidth: propTypes.number
};

export default PieChart;
