/* eslint-disable camelcase */
import React from 'react';
import propTypes from 'prop-types';
import { Chart, ChartLegend, ChartBar, ChartAxis, ChartStack, ChartTooltip } from '@patternfly/react-charts';
import { global_palette_gold_300, global_palette_gold_400, global_palette_orange_300, global_palette_red_200 } from '@patternfly/react-tokens';

export class StackChart extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            width: 0
        };

        this.handleResize = () => {
            if (this.containerRef.current && this.containerRef.current.clientWidth) {
                this.setState({ width: this.containerRef.current.clientWidth });
            }
        };
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const colorScale = [
            global_palette_red_200.value,
            global_palette_orange_300.value,
            global_palette_gold_400.value,
            global_palette_gold_300.value
        ];
        const barWidth = 25;
        const { width } = this.state;
        return (
            <div ref={ this.containerRef }>
                <Chart
                    ariaDesc={ this.props.ariaDesc }
                    constrainToVisibleArea
                    ariaTitle={ this.props.ariaTitle }
                    legendComponent={ <ChartLegend
                        data={ this.props.legendData }
                        gutter={ 1 }
                        rowGutter={ 1 }
                    /> }
                    legendAllowWrap={ true }
                    legendPosition={ this.props.legendPosition }
                    height={ this.props.height }
                    padding={ this.props.padding }
                    width={ width }
                >
                    <ChartAxis />
                    <ChartStack horizontal colorScale={ colorScale }>
                        <ChartBar
                            barWidth={ barWidth }
                            data={ [
                                { name: this.props.data[0].name,
                                    x: this.props.data[0].x,
                                    y: this.props.data[0].y,
                                    label: this.props.data[0].name }
                            ] }
                            labelComponent={ <ChartTooltip constrainToVisibleArea /> }
                        />
                        <ChartBar
                            barWidth={ barWidth }
                            data={ [
                                { name: this.props.data[1].name,
                                    x: this.props.data[1].x,
                                    y: this.props.data[1].y,
                                    label: this.props.data[1].name }
                            ] }
                            labelComponent={ <ChartTooltip constrainToVisibleArea /> }
                        />
                        <ChartBar
                            barWidth={ barWidth }
                            data={ [
                                { name: this.props.data[2].name,
                                    x: this.props.data[2].x,
                                    y: this.props.data[2].y,
                                    label: this.props.data[2].name }
                            ] }
                            labelComponent={ <ChartTooltip constrainToVisibleArea /> }
                        />
                    </ChartStack>
                </Chart>
            </div>
        );
    }
}

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
