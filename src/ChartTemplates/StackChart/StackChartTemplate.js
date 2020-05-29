/* eslint-disable camelcase */
import './_StackChartTemplate.scss';

import { Chart, ChartAxis, ChartBar, ChartLabel, ChartLegend, ChartStack, ChartTooltip } from '@patternfly/react-charts';
import {
    c_button_m_control_active_after_BorderBottomColor,
    global_palette_gold_200,
    global_palette_gold_400,
    global_palette_orange_300,
    global_palette_red_200,
    global_primary_color_200
} from '@patternfly/react-tokens';

import React from 'react';
import { capitalize } from '../../Utilities/Common';
import propTypes from 'prop-types';

export const StackChart = ({ ...props }) => {

    const colorScale = [
        global_palette_red_200.value,
        global_palette_orange_300.value,
        global_palette_gold_400.value,
        global_palette_gold_200.value
    ];
    const barWidth = 25;
    const chartLegendFontSize = 12;
    const legendData = props.data.map(item => ({ name: `${item.y} ${capitalize(item.name)}`, symbol: { type: null } }));
    const stackChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };
    const rawData = props.data.length && props.data.filter(item => item.y > 0).map(el => el.y);
    const dataMin = rawData.length && rawData.reduce((acc, curr) => Math.min(acc, curr));

    // eslint-disable-next-line react/prop-types
    const LegendLabel = ({ index, ...rest }) =>
        <a href={ props.legendClick[index] } className="pf-c-button pf-m-link pf-m-inline"><ChartLabel { ...rest } /></a>;

    return <React.Fragment>
        <Chart
            ariaDesc={ props.ariaDesc }
            ariaTitle={ props.ariaTitle }
            padding={ stackChartPadding }
            width={ props.width }
            height={ props.height }
            maxWidth={ props.maxWidth }>
            <ChartAxis axisComponent={ <React.Fragment /> } />
            <ChartStack horizontal
                colorScale={ colorScale }>
                {props.data.map(item => <ChartBar key={ item }
                    barWidth={ barWidth } labelComponent={ <ChartTooltip
                        style={ { fontSize: '12px', padding: '10' } }
                        dx={ dataMin ? (-(item.y / dataMin) * 5) : 0 } orientation='top' /> }
                    data={ [{ name: item.name, y: item.y, x: 1, label: ({ datum }) => `${capitalize(datum.name)}: ${datum.y}` }] }
                />)}
            </ChartStack>
        </Chart>
        <span className='stackChartLegend' aria-label="Chart legend">
            <table tabIndex="0" className="visually-hidden" aria-label={ props.ariaTitle + ` data` }>
                {props.data.map((d, index) => {
                    return [
                        <tr key={ index }>
                            <td>{d.y}</td>
                            <td>{d.name}</td>
                        </tr>
                    ];
                })}
            </table>
            <ChartLegend
                data={ legendData }
                responsive={ false }
                height={ props.legendHeight }
                width={ props.legendWidth }
                fontSize={ chartLegendFontSize }
                className='pf-m-redhat-font'
                labelComponent={ <LegendLabel /> }
                orientation='horizontal'
                gutter={ 0 }
                style={ {
                    labels: {
                        fill: c_button_m_control_active_after_BorderBottomColor.value
                    }
                } }
                events={ [{
                    target: 'labels',
                    eventHandlers: {
                        onMouseOver: () => {
                            return [{
                                mutation: (props) => {
                                    return {
                                        style: Object.assign({}, props.style, { fill: global_primary_color_200.value, textDecoration: 'underline' })
                                    };
                                }
                            }];
                        },
                        onMouseOut: () => {
                            return [{
                                mutation: () => {
                                    return null;
                                }
                            }];
                        },
                        onClick: () => {
                            return [{
                                mutation: (props) => {
                                    return {
                                        style: Object.assign({}, props.style, { fill: global_primary_color_200.value, textDecoration: 'underline' })
                                    };
                                }
                            }];
                        }
                    }
                }] }
                colorScale={ colorScale } />
        </span>
    </React.Fragment>;
};

StackChart.propTypes = {
    maxWidth: propTypes.number,
    ariaDesc: propTypes.string,
    ariaTitle: propTypes.string,
    data: propTypes.array,
    height: propTypes.number,
    width: propTypes.number,
    legendHeight: propTypes.number,
    legendWidth: propTypes.number,
    legendClick: propTypes.any,
    style: propTypes.any
};

export default StackChart;
