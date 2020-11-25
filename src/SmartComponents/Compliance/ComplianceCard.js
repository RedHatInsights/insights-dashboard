import './ComplianceCard.scss';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as AppActions from '../../AppActions';

import { supportsGlobalFilter, workloadsPropType } from '../../Utilities/Common';
import FailState from '../../PresentationalComponents/FailState/FailState';
import FilterNotSupported from '../../PresentationalComponents/FilterNotSupported';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import messages from '../../Messages';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/RouterParams';
import { useIntl } from 'react-intl';

// components
import {
    Button,
    DataList,
    DataListItem,
    DataListItemRow,
    DataListCell,
    DataListItemCells,
    EmptyState,
    EmptyStateBody,
    EmptyStateSecondaryActions,
    EmptyStateVariant,
    Title
} from '@patternfly/react-core/dist/esm/components';

// layouts
import {
    Flex,
    FlexItem
} from '@patternfly/react-core/dist/esm/layouts';

// template card
import {
    TemplateCardActions,
    TemplateCardBody
} from '../../PresentationalComponents/Template/TemplateCard';

// expandable card
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';

const ComplianceCard = ({ fetchCompliance, complianceFetchStatus, complianceSummary, selectedTags, workloads, SID }) => {
    useEffect(() => {
        fetchCompliance();
    }, [fetchCompliance]);

    const intl = useIntl();
    // const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };
    // const colorScale = [
    //     chart_color_blue_300.value,
    //     chart_color_blue_200.value
    // ];

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
            className='ins-c-card__compliance ins-m-toggle-right-on-md'
            { ...complianceFetchStatus !== 'pending' ? {
                'data-ouia-safe': true
            } : { 'data-ouia-safe': false } }
            title={ intl.formatMessage(messages.complianceTitle) }
            header={
                <TemplateCardActions downloadReport="true"/>
            }
            body={
                <TemplateCardBody>
                    {supportsGlobalFilter(selectedTags, workloads, SID) ?
                        <React.Fragment>
                            {complianceFetchStatus === 'fulfilled' &&
                                (Array.isArray(complianceSummary.data) &&
                                    (complianceSummary.data.length > 0 ? <React.Fragment>
                                        <DataList className='ins-m-no-padding ins-m-no-top-border' isCompact>
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
                                                                        <Flex>
                                                                            <FlexItem flex={ { default: 'flex_1' } }>
                                                                                <p>description</p>
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
                        : <FilterNotSupported href={ `${UI_BASE}/compliance/` } title={ intl.formatMessage(messages.filterNotApplicable) }
                            appName={ intl.formatMessage(messages.complianceTitle) } />
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

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplianceCard));
