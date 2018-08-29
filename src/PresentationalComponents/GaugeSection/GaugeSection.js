import React, { Component } from 'react';
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
class GaugeSection extends Component {

    render () {
        const gaugeSectionClasses = classNames(
            this.props.className,
            'ins-c-gauge-widget'
        );

        const changeClasses = classNames(
            'ins-m-' + this.props.change,
            'ins-m-' + this.props.affect,
            'ins-c-gauge-widget__metrics-change',
        );

        let changeHtml = '';

        if (this.props.change === 'increase') {
            changeHtml = <i className='fas fa-caret-up'></i>;
        } else if (this.props.change === 'decrease') {
            changeHtml = <i className='fas fa-caret-down'></i>;
        }

        return (
            <div className={gaugeSectionClasses} id={this.props.id}>
                <div className='ins-c-gauge-widget__graph pf-u-text-align-center'>
                    <div className='ins-c-gauge-widget__metrics'>
                        <div className='ins-c-gauge-widget__metrics-percentage'>
                            {this.props.value}%
                        </div>
                        <div className={changeClasses}>
                            <span className='ins-c-gauge-widget__metrics-change-text'>
                                {this.props.changeValue}% {changeHtml}
                            </span>
                            <span className='ins-c-gauge-widget__metrics-change-timeframe'>
                                Last {this.props.timeframe} days
                            </span>
                        </div>
                    </div>
                    <Gauge
                        label={this.props.label} value={this.props.value} width={this.props.width}
                        height={this.props.height} identifier={this.props.identifier} change={this.props.change}>
                    </Gauge>
                </div>
                <div className='ins-c-gauge-widget__legend'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default GaugeSection;

GaugeSection.propTypes = {
    children: propTypes.any.isRequired,
    className: propTypes.string,
    id: propTypes.string,
    height: propTypes.number,
    identifier: propTypes.string,
    label: propTypes.string,
    value: propTypes.number,
    width: propTypes.number,
    change: propTypes.string,
    changeValue: propTypes.string,
    affect: propTypes.string,
    timeframe: propTypes.string
};
