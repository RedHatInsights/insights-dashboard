/* eslint-disable camelcase */
import React from 'react';
import propTypes from 'prop-types';
import { Chart, ChartBar, ChartAxis, ChartStack, ChartThemeColor, ChartTooltip } from '@patternfly/react-charts';
import { global_palette_gold_300, global_palette_gold_400, global_palette_orange_300, global_palette_red_200 } from '@patternfly/react-tokens';

export const StackChart = ({ ...props }) => {
    const colorScale = [
        global_palette_red_200.value,
        global_palette_orange_300.value,
        global_palette_gold_400.value,
        global_palette_gold_300.value
    ];

    const barWidth = 25;

    return (
        <div style={ { maxWidth: props.maxWidth } }>
            <Chart
                ariaDesc={ props.ariaDesc }
                ariaTitle={ props.ariaTitle }
                legendData={ props.legendData }
                legendPosition={ props.legendPosition }
                height={ props.height }
                padding={ props.padding }
                width={ props.width }
                colorScale={ colorScale }
                themeColor={ ChartThemeColor.multiOrdered }
            >
                <ChartAxis />
                <ChartStack horizontal colorScale={ colorScale }>
                    <ChartBar
                        barWidth={ barWidth }
                        data={ [{ name: props.data[0].name, x: props.data[0].x, y: props.data[0].y, label: props.data[0].name }] }
                        labelComponent={ <ChartTooltip constrainToVisibleArea /> }
                    />
                    <ChartBar
                        barWidth={ barWidth }
                        data={ [{ name: props.data[1].name, x: props.data[1].x, y: props.data[1].y, label: props.data[1].name }] }
                        labelComponent={ <ChartTooltip constrainToVisibleArea /> }
                    />
                    <ChartBar
                        barWidth={ barWidth }
                        data={ [{ name: props.data[2].name, x: props.data[2].x, y: props.data[2].y, label: props.data[2].name }] }
                        labelComponent={ <ChartTooltip constrainToVisibleArea /> }
                    />
                </ChartStack>
            </Chart>
        </div>
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
    colorScale: propTypes.array
};

export default StackChart;
