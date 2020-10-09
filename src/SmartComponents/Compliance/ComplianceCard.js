import './ComplianceCard.scss';

import * as AppActions from '../../AppActions';

import { EmptyState, EmptyStateVariant } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyState';
import React, { useEffect } from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { chart_color_blue_200, chart_color_blue_300 } from '@patternfly/react-tokens';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import { EmptyStateBody } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyStateBody';
import { EmptyStateSecondaryActions } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyStateSecondaryActions';
import FailState from '../../PresentationalComponents/FailState/FailState';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import PropTypes from 'prop-types';
import { Split } from '@patternfly/react-core/dist/js/layouts/Split/Split';
import { SplitItem } from '@patternfly/react-core/dist/js/layouts/Split/SplitItem';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import messages from '../../Messages';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/files/RouterParams';
import { useIntl } from 'react-intl';

const ComplianceCard = ({ fetchCompliance, complianceFetchStatus, complianceSummary, workloads }) => {

    useEffect(() => {
        fetchCompliance();
    }, [fetchCompliance]);

    const intl = useIntl();
    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };
    const colorScale = [
        chart_color_blue_300.value,
        chart_color_blue_200.value
    ];

    /*
        * Returns the first two -- if there are at least two entries -- items as a shallow copy of
        * complianceSummary
        */
    const getTopThreePolicies = function (compliance) {
        const complianceTopThree = compliance.data.length > 1 ? compliance.data.slice(0, 3) :
            compliance.data.slice();

        return complianceTopThree;
    };

    return (
        <TemplateCard appName='Compliance' className='ins-c-card__compliance'
            { ...complianceFetchStatus !== 'pending' ? {
                'data-ouia-safe': true
            } : { 'data-ouia-safe': false } }
        >
            <TemplateCardHeader title='Compliance' />
            <TemplateCardBody>
                {workloads === undefined || workloads['All workloads'] || Object.entries(workloads).length === 0 ?
                    <React.Fragment>
                        {complianceFetchStatus === 'fulfilled' &&
                            (Array.isArray(complianceSummary.data) &&
                                (complianceSummary.data.length > 0 ? <React.Fragment>
                                    {getTopThreePolicies(complianceSummary).map((policy, index) =>
                                        <div className="ins-c-compliance__row" key={ index }>
                                            <div className="ins-c-compliance__row-item">
                                                <PieChart
                                                    ariaDesc="Compliance score"
                                                    ariaTitle="Pie chart compliance"
                                                    constrainToVisibleArea={ true }
                                                    data={ [
                                                        {
                                                            x: 'Compliant',
                                                            y: policy.attributes.compliant_host_count
                                                        }, {
                                                            x: 'Non-compliant',
                                                            y: policy.attributes.total_host_count - policy.attributes.compliant_host_count
                                                        }
                                                    ] }
                                                    labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                                                    padding={ pieChartPadding }
                                                    height={ 65 }
                                                    width={ 65 }
                                                    colorScale={ colorScale }
                                                />
                                            </div>
                                            <div className="ins-c-compliance__row-item">
                                                <Button
                                                    id={ `compliance-link-${index + 1}` }
                                                    className="ins-c-compliance__policy-link"
                                                    component="a"
                                                    href={ `${UI_BASE}/compliance/reports/${policy.id}` }
                                                    variant="link"
                                                    isInline
                                                >
                                                    {policy.attributes.name}
                                                </Button>
                                                <Split hasGutter>
                                                    <SplitItem>
                                                        {intl.formatMessage(messages.compliantHostCount,
                                                            { count: policy.attributes.total_host_count }
                                                        )}
                                                    </SplitItem>
                                                    <SplitItem>
                                                        {intl.formatMessage(messages.compliantScore,
                                                            {
                                                                score: +(
                                                                    100 * (
                                                                        policy.attributes.compliant_host_count / policy.attributes.total_host_count
                                                                    )
                                                                ).toFixed(1)
                                                            }
                                                        )}
                                                    </SplitItem>
                                                </Split>

                                            </div>
                                        </div>
                                    )}
                                    <div className="ins-c-compliance__row">
                                        <div className="ins-c-compliance__row-item">
                                        </div>
                                        <div className="ins-c-compliance__row-item">
                                            <Button
                                                className="ins-c-compliance__policy-link"
                                                component="a"
                                                href={ `${UI_BASE}/compliance/reports/` }
                                                variant="link"
                                                isInline
                                            >
                                                {complianceFetchStatus === 'fulfilled' && Array.isArray(complianceSummary.data) &&
                                                    complianceSummary.data.length - 3 >= 1 &&
                                                    `${complianceSummary.data.length - 3} more compliance reports`
                                                }
                                            </Button>
                                        </div>
                                    </div>

                                </React.Fragment> : (
                                    <EmptyState className="ins-c-compliance__empty-state" variant={ EmptyStateVariant.full }>
                                        <Title headingLevel="h5" size="md">
                                            {intl.formatMessage(messages.complianceEmptyStateTitle)}
                                        </Title>
                                        <EmptyStateBody>
                                            {intl.formatMessage(messages.complianceEmptyStateBody)}
                                        </EmptyStateBody>
                                        <EmptyStateSecondaryActions>
                                            <Button
                                                variant='link'
                                                href={ `${UI_BASE}/compliance/reports/` }
                                                component='a'
                                            >
                                                {intl.formatMessage(messages.complianceEmptyStateAction1)}
                                            </Button>
                                            <Button
                                                variant='link'
                                                component='a'
                                                href="https://www.open-scap.org/getting-started/"
                                            >
                                                {intl.formatMessage(messages.complianceEmptyStateAction2)}
                                            </Button>
                                        </EmptyStateSecondaryActions>
                                    </EmptyState>
                                ))
                            )
                        }
                        {complianceFetchStatus === 'pending' && (<Loading />)}
                        {complianceFetchStatus === 'rejected' && <FailState appName='Compliance' />}
                    </React.Fragment>
                    : <EmptyState>
                        <EmptyStateBody>
                            {intl.formatMessage(messages.contentNotSupported)}
                        </EmptyStateBody>
                    </EmptyState>
                }
            </TemplateCardBody>
        </TemplateCard>
    );
};

ComplianceCard.propTypes = {
    fetchCompliance: PropTypes.func,
    complianceSummary: PropTypes.object,
    complianceFetchStatus: PropTypes.string,
    intl: PropTypes.any,
    workloads: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
    complianceSummary: state.DashboardStore.complianceSummary,
    complianceFetchStatus: state.DashboardStore.complianceFetchStatus,
    workloads: state.DashboardStore.workloads,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchCompliance: (url) => dispatch(AppActions.fetchComplianceSummary(url))
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplianceCard));
