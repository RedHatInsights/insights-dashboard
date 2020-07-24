/* eslint-disable camelcase */
import './_StackChartTemplate.scss';

import { Chart, ChartAxis, ChartBar, ChartLabel, ChartLegend, ChartStack, ChartTooltip } from '@patternfly/react-charts';
import React, { useEffect, useRef, useState } from 'react';
import {
    c_button_m_control_active_after_BorderBottomColor,
    global_palette_gold_200,
    global_palette_gold_400,
    global_palette_orange_300,
    global_palette_red_200,
    global_primary_color_200
} from '@patternfly/react-tokens';

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
    const dataSum = rawData.length && rawData.reduce((acc, curr) => acc + curr, 0);
    const [width, setWidth] = useState();
    const chartRef = useRef();

    const handleResize = () => chartRef.current && setWidth(chartRef.current.clientWidth);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
    }, []);

    // eslint-disable-next-line react/prop-types
    const LegendLabel = ({ index, ...rest }) =>
        <a id={ `${(props.ariaTitle).toLowerCase().replace(/\s/g, '-')}-legend-${index + 1}` }
            href={ props.legendClick[index] } className="pf-c-button pf-m-link pf-m-inline"><ChartLabel { ...rest } /></a>;

    return <React.Fragment>
        <div ref={ chartRef } aria-label='Stack Chart'>
            <Chart
                ariaDesc={ props.ariaDesc }
                ariaTitle={ props.ariaTitle }
                padding={ stackChartPadding }
                width={ width }
                height={ props.height }
                maxWidth={ props.maxWidth }>
                <ChartAxis axisComponent={ <React.Fragment /> } />
                <ChartStack horizontal
                    colorScale={ colorScale }>
                    {props.data.map(item => <ChartBar key={ item }
                        barWidth={ barWidth } labelComponent={ <ChartTooltip
                            pointerOrientation='bottom'
                            style={ { fontSize: '12px', padding: '10' } }
                            orientation='top' constrainToVisibleArea={ props.constrainToVisibleArea }
                            dx={ -(width * (item.y / dataSum)) / 2 } dy={ -12 }/> }
                        data={ [{ name: item.name, y: item.y, x: 1, label: ({ datum }) => `${capitalize(datum.name)}: ${datum.y}` }] }
                    />)}
                </ChartStack>
            </Chart>
        </div>
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
    legendHeight: propTypes.number,
    legendWidth: propTypes.number,
    legendClick: propTypes.any,
    style: propTypes.any,
    constrainToVisibleArea: propTypes.bool
};

export default StackChart;
