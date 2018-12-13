import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Title } from '@patternfly/react-core';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import asyncComponent from '../../Utilities/asyncComponent';
import * as AppActions from '../../AppActions';
import './_cards.scss';

const GaugeWidget = asyncComponent(() => import ('../../PresentationalComponents/GaugeWidget/GaugeWidget.js'));

// makes eslint exception for webpack variable RELEASE
/*global RELEASE:true*/
/*eslint no-undef: "error"*/
const release = RELEASE;

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class ComplianceCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchCompliance({ per_page: 3 }); // eslint-disable-line camelcase
    }

    render() {
        const {
            complianceFetchStatus,
            complianceSummary
        } = this.props;

        return (
            <Card className='pf-m-dark'>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Compliance</Title>
                </CardHeader>
                <CardBody>

                    { complianceFetchStatus === 'fulfilled' && (
                        <ul>
                            { complianceSummary.map((profile, key) => <li> {profile.attributes.name}: {score * 100}% compliance</li> ) }
                    ) }

                    { complianceFetchStatus === 'pending' && (<Loading /> ) }
                    

                    // <GaugeWidget label='compliance' width={250} height={250} value={42}
                    //     identifier='compliance-gauge' negative flipFullColors
                    //     changeValue='4' timeframe='30' className='pf-m-gutter'>
                    //     <ul className='ins-c-gauge-widget__legend-list'>
                    //         <li className='ins-c-gauge-widget__legend-list-item ins-m-special'>
                    //             <span className='ins-c-gauge-widget__legend-list-count ins-m-emphasis'>10</span>
                    //             <span className='ins-c-gauge-widget__legend-list-type ins-m-dark'>New</span>
                    //         </li>
                    //         <li className='ins-c-gauge-widget__legend-list-item'>
                    //             <span className='ins-c-gauge-widget__legend-list-count'>7</span>
                    //             <span className='ins-c-gauge-widget__legend-list-type'>Critical</span>
                    //         </li>
                    //         <li className='ins-c-gauge-widget__legend-list-item'>
                    //             <span className='ins-c-gauge-widget__legend-list-count'>3</span>
                    //             <span className='ins-c-gauge-widget__legend-list-type'>Warning</span>
                    //         </li>
                    //     </ul>
                    //     <a className='ins-c-icon-inline' href={'/' + release + 'insights/platform/compliance/'}>
                    //         <span>View All</span>
                    //         <i className='fas fa-external-link-alt'/>
                    //     </a>
                    // </GaugeWidget>
                </CardBody>
            </Card>
        );
    }
}

ComplianceCard.propTypes = {
    fetchCompliance: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
    complianceSummary: state.DashboardStore.complianceSummary,
    complianceFetchStatus: state.DashboardStore.complianceFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCompliance: (url) => AppActions.fetchComplianceSummary(url)
}, dispatch);

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplianceCard));
