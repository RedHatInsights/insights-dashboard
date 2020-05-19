import React from 'react';
import propTypes from 'prop-types';
import { ChartPie } from '@patternfly/react-charts/dist/js/components/ChartPie/ChartPie';
import { ChartLegend } from '@patternfly/react-charts/dist/js/components/ChartLegend/ChartLegend';
import './PieChartTemplate.scss';

export const PieChart = ({ ...props }) => {
    return (
        <div className="ins-c-pie-chart__row">
            <div style={ { width: props.width, height: props.height, position: 'relative' } }>
                <ChartPie
                    ariaDesc={ props.ariaDesc }
                    ariaTitle={ props.ariaTitle }
                    constrainToVisibleArea={ props.constrainToVisibleArea }
                    data={ props.data }
                    height={ props.height }
                    labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                    padding={ props.padding }
                    width={ props.width }
                    colorScale={ props.colorScale }
                />
                <table tabIndex="0" className="visually-hidden" aria-label={ props.ariaTitle + ` data` }>
                    { props.data.map((d, index) => {
                        return [
                            <tr key={ index }>
                                <td>{ d.y }</td>
                                <td>{ d.x }</td>
                            </tr>
                        ];
                    }) }
                </table>
            </div>
            { props.legend === 'true' &&
                <div className="ins-c-pie-chart__legend" aria-label="Chart legend" style={ { width: props.legendWidth, height: props.legendHeight } }>
                    <ChartLegend
                        height={ props.legendHeight }
                        width={ props.legendWidth }
                        fontSize={ 14 }
                        data={ props.legendData }
                        rowGutter={ { top: -5, bottom: -5 } }
                        orientation={ props.legendOrientation }
                    />
                </div>
            }
        </div>
    );
};

PieChart.propTypes = {
    ariaDesc: propTypes.string,
    ariaTitle: propTypes.string,
    constrainToVisibleArea: propTypes.boolean,
    data: propTypes.array,
    legendData: propTypes.array,
    padding: propTypes.object,
    height: propTypes.number,
    width: propTypes.number,
    legendOrientation: propTypes.boolean,
    colorScale: propTypes.array,
    legend: propTypes.boolean,
    legendWidth: propTypes.number,
    legendHeight: propTypes.number
};

export default PieChart;
