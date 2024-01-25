/* eslint-disable react/prop-types */
import './_StackChartTemplate.scss';

import { Chart, ChartAxis, ChartBar, ChartLabel, ChartLegend, ChartStack, ChartTooltip } from '@patternfly/react-charts';
import React, { useEffect, useRef, useState } from 'react';

import c_button_m_control_active_after_BorderBottomColor from '@patternfly/react-tokens/dist/esm/c_button_m_control_active_after_BorderBottomWidth';
import { capitalize } from '../../Utilities/Common';
import global_palette_gold_200 from '@patternfly/react-tokens/dist/esm/global_palette_gold_200';
import global_palette_gold_400 from '@patternfly/react-tokens/dist/esm/global_palette_gold_400';
import global_palette_orange_300 from '@patternfly/react-tokens/dist/esm/global_palette_orange_300';
import global_palette_red_200 from '@patternfly/react-tokens/dist/esm/global_palette_red_200';
import global_primary_color_200 from '@patternfly/react-tokens/dist/esm/global_primary_color_200';
import propTypes from 'prop-types';

export const StackChart = ({ ariaTitle, ariaDesc, data, height, maxWidth, legendHeight, legendClick, legendWidth, style,
    constrainToVisibleArea }) => {

    const colorScale = [
        global_palette_red_200.value,
        global_palette_orange_300.value,
        global_palette_gold_400.value,
        global_palette_gold_200.value
    ];
    const barWidth = 25;
    const chartLegendFontSize = 12;
    const legendData = data.map(item => ({ name: `${item.y} ${capitalize(item.name)}`, symbol: { type: null } }));
    const stackChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };
    const rawData = data.length && data.filter(item => item.y > 0).map(el => el.y);
    const dataSum = rawData.length && rawData.reduce((acc, curr) => acc + curr, 0);
    const [width, setWidth] = useState();
    const chartRef = useRef();

    const handleResize = () => chartRef.current && setWidth(chartRef.current.clientWidth);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
    }, []);

    const LegendLabel = ({ index, ...rest }) =>
        <a id={ `${ariaTitle.toLowerCase().replace(/\s/g, '-')}-legend-${index + 1}` }
            href={ legendClick[index] } className="pf-c-button pf-m-link pf-m-inline"><ChartLabel { ...rest } /></a>;

    return <React.Fragment>
        <div ref={ chartRef } aria-label='Stack Chart'>
            <Chart
                ariaDesc={ ariaDesc }
                ariaTitle={ ariaTitle }
                padding={ stackChartPadding }
                width={ width }
                height={ height }
                maxWidth={ maxWidth }>
                <ChartAxis axisComponent={ <React.Fragment /> } />
                <ChartStack horizontal
                    colorScale={ colorScale }>
                    {data.map(item => <ChartBar key={ item }
                        barWidth={ barWidth } labelComponent={ <ChartTooltip
                            pointerOrientation='bottom'
                            style={ { fontSize: '12px', padding: '10' } }
                            orientation='top' constrainToVisibleArea={ constrainToVisibleArea }
                            dx={ -(width * (item.y / dataSum)) / 2 } dy={ -12 }/> }
                        data={ [{ name: item.name, y: item.y, x: 1, label: ({ datum }) => `${capitalize(datum.name)}: ${datum.y}` }] }
                    />)}
                </ChartStack>
            </Chart>
        </div>
        <span className='stackChartLegend' aria-label="Chart legend">
            <table tabIndex="0" className="visually-hidden" aria-label={ ariaTitle + ` data` }>
                {data.map((d, index) => {
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
                height={ legendHeight }
                width={ legendWidth }
                fontSize={ chartLegendFontSize }
                className='pf-m-redhat-font'
                labelComponent={ <LegendLabel /> }
                orientation='horizontal'
                gutter={ 20 }
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
                                mutation: () => {
                                    return {
                                        style: Object.assign({}, style, { fill: global_primary_color_200.value, textDecoration: 'underline' })
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
                                mutation: () => {
                                    return {
                                        style: Object.assign({}, style, { fill: global_primary_color_200.value, textDecoration: 'underline' })
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
