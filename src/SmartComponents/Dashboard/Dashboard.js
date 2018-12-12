import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Title } from '@patternfly/react-core';
import { Dark, PageHeader, PageHeaderTitle, Main, routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import asyncComponent from '../../Utilities/asyncComponent';
import * as AppActions from '../../AppActions';
import './_dashboard.scss';

const ComplianceCard = asyncComponent(() => import ('../Cards/ComplianceCard'));
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
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: '',
            itemsPerPage: 10,
            page: 1,
            cards: []
        };
        this.setPage = this.setPage.bind(this);
        this.setPerPage = this.setPerPage.bind(this);
    }

    componentDidMount() {
        this.props.fetchRules({ page_size: this.state.itemsPerPage }); // eslint-disable-line camelcase
    }

    setPage(page) {
        this.setState(() => ({ page }));
        this.props.fetchRules({ page, page_size: this.state.itemsPerPage }); // eslint-disable-line camelcase
    }

    setPerPage(itemsPerPage) {
        this.setState(() => ({ itemsPerPage }));
        this.props.fetchRules({ page_size: itemsPerPage  }); // eslint-disable-line camelcase
    }

    render() {
        return (
            <Dark>
                <PageHeader>
                    <PageHeaderTitle title='Health of Your Infrastructure'/>
                </PageHeader>
                <Main className='ins-l-dashboard'>
                    <Card className='pf-m-dark'>
                        <CardHeader>
                            <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Configuration Assessments</Title>
                        </CardHeader>
                        <CardBody>
                            <GaugeWidget label='advisor' width={250} height={250} value={42}
                                identifier='advisor-gauge' negative flipFullColors
                                changeValue='4' timeframe='30' className='pf-m-gutter'>
                                <ul className='ins-c-gauge-widget__legend-list'>
                                    <li className='ins-c-gauge-widget__legend-list-item ins-m-special'>
                                        <span className='ins-c-gauge-widget__legend-list-count ins-m-emphasis'>10</span>
                                        <span className='ins-c-gauge-widget__legend-list-type ins-m-dark'>New</span>
                                    </li>
                                    <li className='ins-c-gauge-widget__legend-list-item'>
                                        <span className='ins-c-gauge-widget__legend-list-count'>7</span>
                                        <span className='ins-c-gauge-widget__legend-list-type'>Critical</span>
                                    </li>
                                    <li className='ins-c-gauge-widget__legend-list-item'>
                                        <span className='ins-c-gauge-widget__legend-list-count'>3</span>
                                        <span className='ins-c-gauge-widget__legend-list-type'>Warning</span>
                                    </li>
                                </ul>
                                <a className='ins-c-icon-inline' href={'/' + release + 'insights/platform/advisor/'}>
                                    <span>View All</span>
                                    <i className='fas fa-external-link-alt'/>
                                </a>
                            </GaugeWidget>
                        </CardBody>
                    </Card>
                    <ComplianceCard/>
                    <Card className='card-gauge pf-m-dark'>
                        <CardHeader>
                            <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Subscriptions</Title>
                        </CardHeader>
                        <CardBody>
                            <GaugeWidget label='subscriptions' width={250} height={250}
                                value={25} identifier='subscriptions-gauge' decrease
                                flipFullColors changeValue='15' timeframe='30' variant='notEntitled'>
                                <ul className='ins-c-gauge-widget__legend-list'>
                                    <li className='ins-c-gauge-widget__legend-list-item'>
                                        <span className='ins-c-gauge-widget__legend-list-count'>7</span>
                                        <span className='ins-c-gauge-widget__legend-list-type'>Expired Licenses</span>
                                    </li>
                                    <li className='ins-c-gauge-widget__legend-list-item'>
                                        <span className='ins-c-gauge-widget__legend-list-count'>2</span>
                                        <span className='ins-c-gauge-widget__legend-list-type'>Unused Subscriptions</span>
                                    </li>
                                </ul>
                                <a className='ins-c-icon-inline' href={`/insights/platform/subscriptions/`}>
                                    <span>View All</span>
                                    <i className='fas fa-external-link-alt'/>
                                </a>
                            </GaugeWidget>
                        </CardBody>
                    </Card>
                    <Card className='card-gauge pf-m-dark'>
                        <CardHeader>
                            <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Vulnerabilities</Title>
                        </CardHeader>
                        <CardBody>
                            <GaugeWidget label='vulnerabilities' width={250} height={250}
                                value={68} identifier='vulnerabilities-gauge'
                                negative flipFullColors changeValue='23' timeframe='30'>
                                <ul className='ins-c-gauge-widget__legend-list'>
                                    <li className='ins-c-gauge-widget__legend-list-item ins-m-special'>
                                        <span className='ins-c-gauge-widget__legend-list-count ins-m-emphasis'>10</span>
                                        <span className='ins-c-gauge-widget__legend-list-type ins-m-dark'>New</span>
                                    </li>
                                    <li className='ins-c-gauge-widget__legend-list-item'>
                                        <span className='ins-c-gauge-widget__legend-list-count'>5</span>
                                        <span className='ins-c-gauge-widget__legend-list-type'>High Impact</span>
                                    </li>
                                    <li className='ins-c-gauge-widget__legend-list-item'>
                                        <span className='ins-c-gauge-widget__legend-list-count'>3</span>
                                        <span className='ins-c-gauge-widget__legend-list-type'>Medium Impact</span>
                                    </li>
                                </ul>
                                <a className='ins-c-icon-inline' href={`/insights/platform/vulnerability/`}>
                                    <span>View All</span>
                                    <i className='fas fa-external-link-alt'/>
                                </a>
                            </GaugeWidget>
                        </CardBody>
                    </Card>
                    <Card className='card-gauge pf-m-dark'>
                        <CardHeader>
                            <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Costing</Title>
                        </CardHeader>
                        <CardBody>
                            <GaugeWidget label='costing' width={250} height={250} value={92}
                                identifier='costing-gauge' changeValue='25' timeframe='30'>
                                <ul className='ins-c-gauge-widget__legend-list'>
                                    <li className='ins-c-gauge-widget__legend-list-item pf-u-flex-column'>
                                        <span className='ins-c-gauge-widget__legend-list-count ins-m-emphasis'>$15,778.00</span>
                                        <span className='ins-c-gauge-widget__legend-list-type ins-m-dark'>All AWS Accounts</span>
                                    </li>
                                </ul>
                                <a className='ins-c-icon-inline' href={`/insights/platform/cmaas/`}>
                                    <span>View All</span>
                                    <i className='fas fa-external-link-alt'/>
                                </a>
                            </GaugeWidget>
                        </CardBody>
                    </Card>
                </Main>
            </Dark>
        );
    }
}

Dashboard.propTypes = {
    fetchRules: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
    rules: state.DashboardStore.rules,
    rulesFetchStatus: state.DashboardStore.rulesFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRules: (url) => AppActions.fetchRules(url),
    setBreadcrumbs: (obj) => AppActions.setBreadcrumbs(obj)
}, dispatch);

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard));
