import React, { Component } from 'react';
import { Button, Stack, StackItem } from '@patternfly/react-core';
import { Gauge } from '@red-hat-insights/insights-frontend-components';
import classNames from 'classnames';
import propTypes from 'prop-types';

import './_ins-c-gauge-widget.scss';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class GaugeWidget extends Component {

    render () {
        // set the change to positive by default, unless defined as negative
        // effect sets color on metrics, eg. negative = red, otherwise default = green
        let effect = this.props.negative ? 'ins-m-negative' : '';
        // set change arrow icon set to increase by default, unless defined as decrease
        // changeIndicator sets icon to `up` or `down`, eg. default = up, decrease = down
        let changeIndicator = this.props.decrease ? 'down' : 'up';

        const gaugeWidgetClasses = classNames(
            this.props.className,
            'ins-c-gauge-widget',
            { [`ins-c-gauge-widget--disabled ins-c-gauge-widget-disabled__${this.props.variant}`]: this.props.variant }
        );

        const changeClasses = classNames(
            'ins-c-gauge-widget__metrics-change',
            effect
        );

        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        let variantLegend;
        let variantType;
        if (this.props.variant) {
            switch (this.props.variant) {
                case 'notEntitled':
                    variantLegend = (
                        <React.Fragment>
                            <StackItem> { capitalize(this.props.label) } Is not entitled </StackItem>
                            <StackItem> <Button> Start Evaluation </Button> </StackItem>
                            <StackItem>
                                <a href={'#'}>
                                    <span>Find out more</span>
                                </a> </StackItem>
                        </React.Fragment>
                    );
                    variantType = 'not entitled';
                    break;
                case 'notSetUp':
                    variantLegend = (
                        <React.Fragment>
                            <StackItem> { capitalize(this.props.label) } Is not set up </StackItem>
                            <StackItem> <Button> Get Started </Button> </StackItem>
                        </React.Fragment>
                    );
                    variantType = 'not set up';
            }
        }

        if (this.props.variant) {
            return (
                <div className={gaugeWidgetClasses} id={this.props.id} aria-label={ `${this.props.label} is ${variantType}` }>
                    <div className='ins-c-gauge-widget__graph pf-u-text-align-center'>
                        <div className='ins-c-gauge-widget__metrics'>
                            <div className='ins-c-gauge-widget__metrics-percentage'> 0% </div>
                        </div>
                        <Gauge
                            label={this.props.label} value={0} width={this.props.width}
                            flipFullColors={this.props.flipFullColors} height={this.props.height}
                            identifier={this.props.identifier}>
                        </Gauge>
                    </div>
                    <div className='ins-c-gauge-widget__disabled--legend'>
                        <Stack gutter='sm'>
                            { variantLegend }
                        </Stack>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={gaugeWidgetClasses} id={this.props.id}>
                    <div className='ins-c-gauge-widget__graph pf-u-text-align-center'>
                        <div className='ins-c-gauge-widget__metrics'>
                            <div className='ins-c-gauge-widget__metrics-percentage'>
                                {this.props.value}%
                            </div>
                            <div className={changeClasses}>
                                <span className='ins-c-gauge-widget__metrics-change-text'>
                                    {this.props.changeValue}% <i className={`fas fa-caret-${changeIndicator}`}></i>
                                </span>
                                <span className='ins-c-gauge-widget__metrics-change-timeframe'>
                                    Last {this.props.timeframe} days
                                </span>
                            </div>
                        </div>
                        <Gauge
                            label={this.props.label} value={this.props.value} width={this.props.width}
                            flipFullColors={this.props.flipFullColors} height={this.props.height}
                            identifier={this.props.identifier}>
                        </Gauge>
                    </div>
                    <div className='ins-c-gauge-widget__legend'>
                        {this.props.children}
                    </div>
                </div>
            );
        }
    }
}

export default GaugeWidget;

GaugeWidget.propTypes = {
    children: propTypes.any.isRequired,
    className: propTypes.string,
    id: propTypes.string,
    height: propTypes.number,
    identifier: propTypes.string,
    label: propTypes.string,
    value: propTypes.number,
    width: propTypes.number,
    negative: propTypes.bool,
    changeValue: propTypes.string,
    decrease: propTypes.bool,
    flipFullColors: propTypes.bool,
    timeframe: propTypes.string,
    variant: propTypes.oneOf(['notEntitled', 'notSetUp'])
};
