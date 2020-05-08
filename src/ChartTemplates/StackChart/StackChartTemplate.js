/* eslint-disable camelcase */
import './_StackChartTemplate.scss';

import { Chart, ChartAxis, ChartBar, ChartLegend, ChartStack, ChartTooltip } from '@patternfly/react-charts';
import {
    c_button_m_control_active_after_BorderBottomColor,
    global_palette_gold_200,
    global_palette_gold_400,
    global_palette_orange_300,
    global_palette_red_200
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
    const dataMin = props.data.length && props.data.filter(item => item.y > 0).map(el => el.y).reduce((acc, curr) => Math.min(acc, curr));
    return (
        <React.Fragment>
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
                            dx={ -(item.y / dataMin) * 5 } orientation='top' /> }
                        data={ [{ name: item.name, y: item.y, x: 1, label: ({ datum }) => `${capitalize(datum.name)}: ${datum.y}` }] }
                    />)}
                </ChartStack>
            </Chart>
            <span className='stackChartLegend'>
                <ChartLegend
                    data={ legendData }
                    responsive={ false }
                    height={ props.legendHeight }
                    width={ props.legendWidth }
                    fontSize={ chartLegendFontSize }
                    style={ { labels: { fill: c_button_m_control_active_after_BorderBottomColor.value } } }
                    events={ [{
                        target: 'labels', eventHandlers: {
                            onClick: props.legendClick,
                            onMouseOver: () => {
                                return [{
                                    mutation: (data) => {
                                        return {
                                            style: Object.assign({}, data.style, { cursor: 'pointer' })
                                        };
                                    }
                                }];
                            }
                        }
                    }] }
                    orientation='horizontal'
                    gutter={ 0 }
                    colorScale={ colorScale } />
            </span>
        </React.Fragment>
    );
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
    legendClick: propTypes.any
};

export default StackChart;
