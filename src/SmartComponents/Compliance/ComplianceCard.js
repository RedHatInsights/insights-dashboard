import './ComplianceCard.scss';

import * as AppActions from '../../AppActions';

import {
    Button,
    DataList,
    DataListCell,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
    EmptyState,
    EmptyStateBody,
    EmptyStateSecondaryActions,
    EmptyStateVariant,
    Title
} from '@patternfly/react-core/dist/esm/components';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts';
import React, { useEffect } from 'react';
import { TemplateCardActions, TemplateCardBody } from '../../PresentationalComponents/Template/TemplateCard';
import { supportsGlobalFilter, workloadsPropType } from '../../Utilities/Common';

import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import FailState from '../../PresentationalComponents/FailState/FailState';
import FilterNotSupported from '../../PresentationalComponents/FilterNotSupported';
import Loading from '../../PresentationalComponents/Loading/Loading';
import PropTypes from 'prop-types';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink';

const ComplianceCard = ({ fetchCompliance, complianceFetchStatus, complianceSummary, selectedTags, workloads, SID }) => {
    useEffect(() => {
        fetchCompliance();
    }, [fetchCompliance]);

    const intl = useIntl();

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
        <ExpandableCardTemplate
            appName='Compliance'
            className='ins-c-card__compliance insd-m-toggle-right-on-md'
            { ...complianceFetchStatus !== 'pending' ? {
                'data-ouia-safe': true
            } : { 'data-ouia-safe': false } }
            title={ intl.formatMessage(messages.complianceTitle) }
            isExpanded={JSON.parse(localStorage.getItem('dashboard_expanded_compliance') || 'true')}
            isExpandedCallback={isExpanded => localStorage.setItem('dashboard_expanded_compliance', isExpanded)}
            header={
                <TemplateCardActions />
            }
            body={
                <TemplateCardBody>
                    {supportsGlobalFilter(selectedTags, workloads, SID) ?
                        <React.Fragment>
                            {complianceFetchStatus === 'fulfilled' &&
                                (Array.isArray(complianceSummary.data) &&
                                    (complianceSummary.data.length > 0 ? <React.Fragment>
                                        <DataList className='insd-m-no-padding insd-m-no-top-border' isCompact>
                                            {getTopThreePolicies(complianceSummary).map((policy, index) =>
                                                <DataListItem key={ index }>
                                                    <DataListItemRow>
                                                        <DataListItemCells
                                                            dataListCells={[
                                                                <DataListCell key={ index }>
                                                                    <Flex
                                                                        direction={ { default: 'column' } }
                                                                        spaceItems={ { default: 'spaceItemsNone' } }
                                                                    >
                                                                        <InsightsLink
                                                                            app='compliance'
                                                                            to={`/reports/${policy.id}`}
                                                                            className='ins-c-compliance__policy-link
                                                                            pf-c-button pf-m-link pf-m-inline'
                                                                            id={ `compliance-link-${index + 1}` }
                                                                        >
                                                                            {policy.attributes.name}
                                                                        </InsightsLink>
                                                                        <Flex>
                                                                            <FlexItem flex={ { default: 'flex_1' } }>
                                                                                <p>RHEL { policy.attributes.os_version }</p>
                                                                            </FlexItem>
                                                                            <Flex flex={{ default: 'None' }}>
                                                                                <FlexItem>
                                                                                    {intl.formatMessage(messages.compliantHostCount,
                                                                                        { count: policy.attributes.test_result_host_count }
                                                                                    )}
                                                                                </FlexItem>
                                                                                <FlexItem>
                                                                                    {intl.formatMessage(messages.compliantScore,
                                                                                        {
                                                                                            score: +(policy.attributes.test_result_host_count &&
                                                                                                (100 * (
                                                                                                    policy.attributes.compliant_host_count /
                                                                                                    policy.attributes.test_result_host_count
                                                                                                ))
                                                                                            ).toFixed(1)
                                                                                        }
                                                                                    )}
                                                                                </FlexItem>
                                                                            </Flex>
                                                                        </Flex>
                                                                    </Flex>
                                                                </DataListCell>
                                                            ]}
                                                        />
                                                    </DataListItemRow>
                                                </DataListItem>
                                            )}
                                        </DataList>
                                        <InsightsLink app='compliance' to='/reports' className='pf-c-button pf-m-link pf-m-inline'>
                                            {complianceFetchStatus === 'fulfilled' && Array.isArray(complianceSummary.data) &&
                                                complianceSummary.data.length - 3 >= 1 &&
                                                `${complianceSummary.data.length - 3} more reports`
                                            }
                                        </InsightsLink>
                                    </React.Fragment> : (
                                        <EmptyState className='ins-c-compliance__empty-state' variant={ EmptyStateVariant.full }>
                                            <Title headingLevel='h5' size='md'>
                                                {intl.formatMessage(messages.complianceEmptyStateTitle)}
                                            </Title>
                                            <EmptyStateBody>
                                                {intl.formatMessage(messages.complianceEmptyStateBody)}
                                            </EmptyStateBody>
                                            <EmptyStateSecondaryActions>
                                                <InsightsLink app='compliance' to='/scappolicies/new' className='pf-c-button pf-m-link'>
                                                    {intl.formatMessage(messages.complianceEmptyStateAction1)}
                                                </InsightsLink>
                                                <Button
                                                    variant='link'
                                                    component='a'
                                                    href='https://www.open-scap.org/getting-started/'
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
                        : <FilterNotSupported
                            href={ `${UI_BASE}/compliance/` }
                            title={ intl.formatMessage(messages.filterNotApplicable) }
                            appName={ intl.formatMessage(messages.complianceTitle) }
                        />
                    }
                </TemplateCardBody>
            }
        />
    );
};

ComplianceCard.propTypes = {
    fetchCompliance: PropTypes.func,
    complianceSummary: PropTypes.object,
    complianceFetchStatus: PropTypes.string,
    intl: PropTypes.any,
    selectedTags: PropTypes.array,
    workloads: workloadsPropType,
    SID: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = ({ DashboardStore }) => ({
    complianceSummary: DashboardStore.complianceSummary,
    complianceFetchStatus: DashboardStore.complianceFetchStatus,
    selectedTags: DashboardStore.selectedTags,
    workloads: DashboardStore.workloads,
    SID: DashboardStore.SID
});

const mapDispatchToProps = dispatch => ({
    fetchCompliance: (url) => dispatch(AppActions.fetchComplianceSummary(url))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplianceCard);
