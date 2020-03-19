/* eslint-disable camelcase */
import React from 'react';
import propTypes from 'prop-types';
import { capitalize } from '../../Utilities/Common';
import { Chart, ChartLegend, ChartBar, ChartAxis, ChartStack, ChartTooltip } from '@patternfly/react-charts';
import { global_palette_gold_300, global_palette_gold_400, global_palette_orange_300, global_palette_red_200 } from '@patternfly/react-tokens';

export const StackChart = ({ ...props }) => {

    const colorScale = [
        global_palette_red_200.value,
        global_palette_orange_300.value,
        global_palette_gold_400.value,
        global_palette_gold_300.value
    ];
    const barWidth = 25;
    const chartLegendFontSize = 14;

    const labelComponent = () => <ChartTooltip text={ ({ datum }) => `${capitalize(datum.name)}: ${datum.y}` } constrainToVisibleArea />;

    return (
        <React.Fragment>
            <Chart
                ariaDesc={ props.ariaDesc }
                ariaTitle={ props.ariaTitle }
                padding={ props.padding }
                width={ props.width }
                height={ props.height }
                maxWidth={ props.maxWidth }>
                <ChartAxis axisComponent={ <React.Fragment /> } />
                <ChartStack horizontal
                    colorScale={ colorScale }>
                    {props.data.map(item => <ChartBar key={ item }
                        barWidth={ barWidth } labelComponent={ labelComponent() }
                        data={ [{ name: item.name, y: item.y, x: 1, label: item.name }] }
                    />)}
                </ChartStack>
            </Chart>
            <span className='stackChartLegend'>
                <ChartLegend
                    data={ props.data.map(item => ({ name: `${item.y} ${capitalize(item.name)}`, symbol: { type: null } })) }
                    responsive={ false }
                    height={ props.legendHeight }
                    width={ props.legendWidth }
                    fontSize={ chartLegendFontSize }
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
                    colorScale={ colorScale } />
            </span>
        </React.Fragment>
    );
};

StackChart.propTypes = {
    maxWidth: propTypes.number,
    ariaDesc: propTypes.string,
    ariaTitle: propTypes.string,
    domainPadding: propTypes.array,
    data: propTypes.array,
    legendData: propTypes.array,
    legendPosition: propTypes.array,
    padding: propTypes.object,
    height: propTypes.number,
    width: propTypes.number,
    colorScale: propTypes.array,
    legendHeight: propTypes.number,
    legendWidth: propTypes.number,
    legendClick: propTypes.any
};

export default StackChart;
