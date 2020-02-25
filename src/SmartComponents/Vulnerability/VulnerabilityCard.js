import * as AppActions from '../../AppActions';
import { Divider } from '@patternfly/react-core';
import {
    TemplateCard,
    TemplateCardBody,
    TemplateCardHeader,
    TemplateCardHead,
    TemplateCardActions,
    TemplateCardFooter
} from '../../PresentationalComponents/Template/TemplateCard';
import { ExclamationCircleIcon, FlagIcon } from '@patternfly/react-icons';
import React, { Component } from 'react';
import Loading from '../../PresentationalComponents/Loading/Loading';
import PropTypes from 'prop-types';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/files/RouterParams';
import { NumberDescription } from '../../../../insights-dashboard/src/PresentationalComponents/NumberDescription/NumberDescription';
import { VerticalDivider } from '../../../../insights-dashboard/src/PresentationalComponents/VerticalDivider/VerticalDivider';

/**
 * Vulnerability Card for showing number of critical vulnerabilities
 */
class VulnerabilityCard extends Component {

    constructor(props) {
        super(props);
        this.props = {};
    }

    componentDidMount() {
        this.props.fetchCriticalVulnerabilities();
        this.props.fetchLatestVulnerabilities();
        this.props.fetchVulnerabilities();
    }

    render() {
        const {
            criticalVulnerabilitiesFetchStatus,
            latestVulnerabilitiesFetchStatus,
            criticalVulnerabilities,
            latestVulnerabilities,
            vulnerabilitiesFetchStatus,
            vulnerabilities
        } = this.props;

        return (
            <TemplateCard className='ins-c-card__vulnerability'
                { ...(
                    criticalVulnerabilitiesFetchStatus !== 'pending' &&
                    latestVulnerabilitiesFetchStatus !== 'pending' &&
                    vulnerabilitiesFetchStatus !== 'pending'
                ) ? {
                        'data-ouia-safe': true
                    } : {
                        'data-ouia-safe': false
                    } }
            >
                <TemplateCardHead>
                    <TemplateCardActions
                        downloadReport="true"
                        infoInlineMessage="Learn about CVSS Scores">
                    </TemplateCardActions>
                    <TemplateCardHeader title="Vulnerabilities">
                    </TemplateCardHeader>
                </TemplateCardHead>
                <TemplateCardBody>
                    {criticalVulnerabilitiesFetchStatus === 'fulfilled' && (
                        <div className='ins-c-summary'>
                            <ExclamationCircleIcon className='ins-c-summary__icon ins-c-summary__icon-critical' />
                            <span className='ins-c-summary__emphasis'>{criticalVulnerabilities.meta.total_items}</span>
                            <span className='ins-c-summary__label'>
                                <a href={ `${UI_BASE}/vulnerability/cves?cvss_filter=from8to10` }>CVEs with CVSS score &gt;= 8</a>
                            </span>
                        </div>
                    )} {criticalVulnerabilitiesFetchStatus === 'pending' && (<Loading />)}
                    {latestVulnerabilitiesFetchStatus === 'fulfilled' && (
                        <div className='ins-c-summary'>
                            <FlagIcon className='ins-c-summary__icon ins-c-summary__icon-flag' />
                            <span className='ins-c-summary__emphasis'>{latestVulnerabilities.meta.total_items}</span>
                            <span className='ins-c-summary__label'>
                                <a href={ `${UI_BASE}/vulnerability/cves?publish_date=last7&show_irrelevant=true` }>CVEs added in the last 7 days</a>
                            </span>
                        </div>
                    )}
                </TemplateCardBody>
                <Divider/>
                <TemplateCardBody isHorizontalLayout="true">
                    <NumberDescription
                        data="NA"
                        dataSize="md"
                        linkDescription="Last 90 days"
                    />
                    <VerticalDivider/>
                    <NumberDescription
                        data="NA"
                        dataSize="md"
                        linkDescription="Last 30 days"
                    />
                    <VerticalDivider/>
                    <NumberDescription
                        data="NA"
                        dataSize="md"
                        linkDescription="Last 7 days"
                    />
                </TemplateCardBody>
                <TemplateCardFooter>
                    <a href={ `${UI_BASE}/vulnerability/` }>
                        View all{vulnerabilitiesFetchStatus === 'fulfilled' && vulnerabilities.meta.total_items > 0 ?
                            ` ${vulnerabilities.meta.total_items} ` : ''} vulnerabilities
                    </a>
                </TemplateCardFooter>
            </TemplateCard>
        );
    }
}

VulnerabilityCard.propTypes = {
    fetchCriticalVulnerabilities: PropTypes.func,
    criticalVulnerabilities: PropTypes.object,
    criticalVulnerabilitiesFetchStatus: PropTypes.string,
    fetchLatestVulnerabilities: PropTypes.func,
    latestVulnerabilities: PropTypes.object,
    latestVulnerabilitiesFetchStatus: PropTypes.string,
    fetchVulnerabilities: PropTypes.func,
    vulnerabilities: PropTypes.object,
    vulnerabilitiesFetchStatus: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    criticalVulnerabilities: state.DashboardStore.criticalVulnerabilities,
    criticalVulnerabilitiesFetchStatus: state.DashboardStore.criticalVulnerabilitiesFetchStatus,
    latestVulnerabilities: state.DashboardStore.latestVulnerabilities,
    latestVulnerabilitiesFetchStatus: state.DashboardStore.latestVulnerabilitiesFetchStatus,
    vulnerabilities: state.DashboardStore.vulnerabilities,
    vulnerabilitiesFetchStatus: state.DashboardStore.vulnerabilitiesFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchCriticalVulnerabilities: (url) => dispatch(AppActions.fetchCriticalVulnerabilities(url)),
    fetchLatestVulnerabilities: (url) => dispatch(AppActions.fetchLatestVulnerabilities(url)),
    fetchVulnerabilities: (url) => dispatch(AppActions.fetchVulnerabilities(url))
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(VulnerabilityCard));
