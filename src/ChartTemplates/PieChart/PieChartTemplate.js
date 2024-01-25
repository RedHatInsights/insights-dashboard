import './PieChartTemplate.scss';

import { ChartLabel } from '@patternfly/react-charts/dist/esm/components/ChartLabel/ChartLabel';
import { ChartLegend } from '@patternfly/react-charts/dist/esm/components/ChartLegend/ChartLegend';
import { ChartPie } from '@patternfly/react-charts/dist/esm/components/ChartPie/ChartPie';
import React from 'react';
import propTypes from 'prop-types';

export const PieChart = ({ ariaDesc, ariaTitle, constrainToVisibleArea, data, legendData, padding, height, width, legendOrientation,
    colorScale, legend, legendWidth, legendHeight, legendClick }) => {
    // eslint-disable-next-line react/prop-types
    const LegendLabel = ({ index, ...rest }) => <a id={ `${ariaTitle.toLowerCase().replace(/\s/g, '-')}-legend-${index + 1}` }
        href={ legendClick[index] } className="pf-c-button pf-m-link pf-m-inline"><ChartLabel { ...rest } /></a>;

    return (
        <div className="insd-c-pie-chart__row">
            <div style={ { width, height, position: 'relative' } }>
                <ChartPie
                    ariaDesc={ ariaDesc }
                    ariaTitle={ ariaTitle }
                    constrainToVisibleArea={ constrainToVisibleArea }
                    data={ data }
                    height={ height }
                    labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                    padding={ padding }
                    width={ width }
                    colorScale={ colorScale }
                />
                <table tabIndex="0" className="visually-hidden" aria-label={ ariaTitle + ` data` }>
                    <tbody>
                        {data.map((d, index) => {
                            return [
                                <tr key={ index }>
                                    <td>{d.y}</td>
                                    <td>{d.x}</td>
                                </tr>
                            ];
                        })}
                    </tbody>
                </table>
            </div>
            {legend &&
                <div className="insd-c-pie-chart__legend" aria-label="Chart legend" style={ { width: legendWidth, height: legendHeight } }>
                    <ChartLegend
                        height={ legendHeight }
                        width={ legendWidth }
                        fontSize={ 14 }
                        data={ legendData }
                        rowGutter={ { top: -5, bottom: -5 } }
                        orientation={ legendOrientation }
                        labelComponent={ legendClick && < LegendLabel /> }
                    />
                </div>
            }
        </div>
    );
};

PieChart.propTypes = {
    ariaDesc: propTypes.string,
    ariaTitle: propTypes.string,
    constrainToVisibleArea: propTypes.bool,
    data: propTypes.array,
    legendData: propTypes.array,
    padding: propTypes.object,
    height: propTypes.number,
    width: propTypes.number,
    legendOrientation: propTypes.string,
    colorScale: propTypes.array,
    legend: propTypes.bool,
    legendWidth: propTypes.number,
    legendHeight: propTypes.number,
    legendClick: propTypes.any
};

export default PieChart;
