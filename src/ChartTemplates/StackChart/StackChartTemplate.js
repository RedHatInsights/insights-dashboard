import React from 'react';
import propTypes from 'prop-types';
import { Chart, ChartBar, ChartAxis, ChartStack, ChartThemeColor, ChartTooltip } from '@patternfly/react-charts';

export const StackChart = ({ ...props }) => {
    return (
        <div style={ { width: '100%' } }>
            <Chart
                ariaDesc={ props.ariaDesc }
                ariaTitle={ props.ariaTitle }
                legendData={ props.legendData }
                legendPosition={ props.legendPosition }
                height={ props.height }
                padding={ props.padding }
                width={ props.width }
                colorScale={ props.colorScale }
                themeColor={ ChartThemeColor.multiOrdered }
            >
                <ChartAxis />
                <ChartAxis />
                <ChartStack horizontal>
                    <ChartBar
                        data={ props.data1 }
                        labelComponent={ <ChartTooltip constrainToVisibleArea /> }
                    />
                    <ChartBar
                        data={ props.data2 }
                        labelComponent={ <ChartTooltip constrainToVisibleArea /> }
                    />
                    <ChartBar
                        data={ props.data3 }
                        labelComponent={ <ChartTooltip constrainToVisibleArea /> }
                    />
                </ChartStack>
            </Chart>
        </div>
    );
};

StackChart.propTypes = {
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
    data1: propTypes.array,
    data2: propTypes.array,
    data3: propTypes.array
};

export default StackChart;
