/* eslint-disable camelcase */
import * as AppActions from '../../AppActions';

import { EmptyState, EmptyStateVariant } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyState';
import React, { useEffect } from 'react';
import {
    TemplateCard,
    TemplateCardActions,
    TemplateCardBody,
    TemplateCardHead,
    TemplateCardHeader
} from '../../PresentationalComponents/Template/TemplateCard';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import { EmptyStateBody } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyStateBody';
import { EmptyStateSecondaryActions } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyStateSecondaryActions';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import PropTypes from 'prop-types';
import { Split } from '@patternfly/react-core/dist/js/layouts/Split/Split';
import { SplitItem } from '@patternfly/react-core/dist/js/layouts/Split/SplitItem';
import { Stack } from '@patternfly/react-core/dist/js/layouts/Stack/Stack';
import { StackItem } from '@patternfly/react-core/dist/js/layouts/Stack/StackItem';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import messages from '../../Messages';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/files/RouterParams';
import './ComplianceCard.scss';
import {
    chart_color_blue_200,
    chart_color_blue_300
} from '@patternfly/react-tokens';

import FailState from '../../PresentationalComponents/FailState/FailState';

const ComplianceCard = ({ fetchCompliance, complianceFetchStatus, complianceSummary }) => {

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
            <TemplateCardHead>
                <TemplateCardActions downloadReport="true" />
                <TemplateCardHeader title='Compliance' />
            </TemplateCardHead>
            <TemplateCardBody>
                <Stack>
                    {complianceFetchStatus === 'fulfilled' &&
                        (Array.isArray(complianceSummary.data) &&
                            (complianceSummary.data.length > 0 ? <React.Fragment>
                                {getTopThreePolicies(complianceSummary).map((element, index) =>
                                    <div className="ins-c-compliance__row" key={ index }>
                                        <div className="ins-c-compliance__row-item">
                                            <PieChart
                                                ariaDesc="Operating systems used"
                                                ariaTitle="Pie chart operating systems"
                                                constrainToVisibleArea={ true }
                                                data={ [
                                                    { x: element.attributes.name, y: element.attributes.score },
                                                    { x: 'empty', y: 100 }
                                                ] }
                                                labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                                                padding={ pieChartPadding }
                                                height={ 65 }
                                                width={ 65 }
                                                colorScale={ colorScale }
                                            />
                                        </div>
                                        <div className="ins-c-compliance__row-item">
                                            <Stack>
                                                <StackItem>
                                                    <Button
                                                        className="ins-c-compliance__policy-link"
                                                        component="a"
                                                        href={ `/${UI_BASE}/compliance/policies/` }
                                                        variant="link"
                                                        isInline
                                                    >
                                                        {element.attributes.name}
                                                    </Button>
                                                </StackItem>
                                                <StackItem>
                                                    <Split gutter='sm'>
                                                        <SplitItem>
                                                            {intl.formatMessage(messages.compliantHostCount,
                                                                { count: element.attributes.compliant_host_count }
                                                            )}
                                                        </SplitItem>
                                                        <SplitItem>
                                                            {intl.formatMessage(messages.compliantScore,
                                                                { score: Math.trunc(element.attributes.score) }
                                                            )}
                                                        </SplitItem>
                                                    </Split>
                                                </StackItem>
                                            </Stack>
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
                                            href={ `/${UI_BASE}/compliance/policies/` }
                                            variant="link"
                                            isInline
                                        >
                                            {complianceFetchStatus === 'fulfilled' && Array.isArray(complianceSummary.data) &&
                                                complianceSummary.data.length > 1 ? ` ${complianceSummary.data.length} ` : ' '}
                                                more compliance policies
                                        </Button>
                                    </div>
                                </div>

                            </React.Fragment> : (
                                <EmptyState className="ins-c-compliance__empty-state" variant={ EmptyStateVariant.full }>
                                    <Title headingLevel="h5" size="sm">
                                        {intl.formatMessage(messages.complianceEmptyStateTitle)}
                                    </Title>
                                    <EmptyStateBody>
                                        {intl.formatMessage(messages.complianceEmptyStateBody)}
                                    </EmptyStateBody>
                                    <EmptyStateSecondaryActions>
                                        <Button
                                            variant='link'
                                            href={ `${UI_BASE}/compliance/policies/` }
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
                </Stack>
                {complianceFetchStatus === 'rejected' &&
                    <FailState appName='Compliance'/>
                }
            </TemplateCardBody>
        </TemplateCard>
    );
};

ComplianceCard.propTypes = {
    fetchCompliance: PropTypes.func,
    complianceSummary: PropTypes.object,
    complianceFetchStatus: PropTypes.string,
    intl: PropTypes.any
};

const mapStateToProps = (state, ownProps) => ({
    complianceSummary: state.DashboardStore.complianceSummary,
    complianceFetchStatus: state.DashboardStore.complianceFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchCompliance: (url) => dispatch(AppActions.fetchComplianceSummary(url))
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplianceCard));
