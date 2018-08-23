import React, { Component } from 'react';
import { Split, SplitItem } from '@patternfly/react-core';
import { Gauge } from '@red-hat-insights/insights-frontend-components';
import classNames from 'classnames';
import propTypes from 'prop-types';

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
            'gauge-with-legend'
        );

        return (
            <Split className={gaugeSectionClasses}>
                <SplitItem>
                    <Gauge label={this.props.label} value={this.props.value} identifier={this.props.identifier}></Gauge>
                </SplitItem>
                <SplitItem className='gauge-with-legend__items'>
                    {this.props.children}
                </SplitItem>
            </Split>
        );
    }
}

export default GaugeSection;

GaugeSection.propTypes = {
    children: propTypes.any.isRequired,
    className: propTypes.string,
    height: propTypes.number,
    identifier: propTypes.string,
    label: propTypes.string,
    value: propTypes.number,
    width: propTypes.number
};
