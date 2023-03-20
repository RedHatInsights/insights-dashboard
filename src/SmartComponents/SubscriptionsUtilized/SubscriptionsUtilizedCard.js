import './SubscriptionsUtilizedCard.scss';

import * as AppActions from '../../AppActions';

import { EmptyState, EmptyStateBody, EmptyStateVariant } from '@patternfly/react-core/dist/esm/components/EmptyState/index';
import {
    RHSM_API_PRODUCT_ID_TYPES,
    RHSM_API_QUERY_GRANULARITY_TYPES,
    RHSM_API_RESPONSE_DATA,
    RHSM_API_RESPONSE_DATA_TYPES,
    RHSM_API_RESPONSE_ERROR_DATA,
    RHSM_API_RESPONSE_ERROR_DATA_CODE_TYPES,
    RHSM_API_RESPONSE_ERROR_DATA_TYPES,
    SW_PATHS
} from './Constants';
import React, { useEffect, useState } from 'react';
import { Tooltip, TooltipPosition } from '@patternfly/react-core/dist/esm/components/Tooltip/Tooltip';
import { filterChartData, setRangedDateTime } from './SubscriptionsUtilizedHelpers';
import { supportsGlobalFilter, workloadsPropType } from '../../Utilities/Common';
import { DateFormat } from '@redhat-cloud-services/frontend-components';

import { Button } from '@patternfly/react-core/dist/esm/components/Button/Button';
import { EmptyStateSecondaryActions } from '@patternfly/react-core/dist/esm/components/EmptyState/EmptyStateSecondaryActions';
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import FailState from '../../PresentationalComponents/FailState/FailState';
import FilterNotSupported from '../../PresentationalComponents/FilterNotSupported';
import Immutable from 'seamless-immutable';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { ProgressTemplate } from '../../ChartTemplates/Progress/ProgressTemplate';
import PropTypes from 'prop-types';
import { TemplateCardBody } from '../../PresentationalComponents/Template/TemplateCard';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

/**
 * Subscriptions utilized card for showing the portion of Subscriptions used.
 */
const SubscriptionsUtilizedCard = ({ subscriptionsUtilizedProductOne, subscriptionsUtilizedProductOneFetch,
    subscriptionsUtilizedProductOneFetchStatus, subscriptionsUtilizedProductTwo, subscriptionsUtilizedProductTwoFetch,
    subscriptionsUtilizedProductTwoFetchStatus, workloads, selectedTags, SID }) => {

    const [products, setProducts] = useState([]);
    const intl = useIntl();

    useEffect(() => {
        const { startDate, endDate } = setRangedDateTime();
        const options = {
            granularity: RHSM_API_QUERY_GRANULARITY_TYPES.DAILY,
            beginning: startDate.toISOString(),
            ending: endDate.toISOString()
        };

        subscriptionsUtilizedProductOneFetch(RHSM_API_PRODUCT_ID_TYPES.OPENSHIFT, options);
        subscriptionsUtilizedProductTwoFetch(RHSM_API_PRODUCT_ID_TYPES.RHEL, options);
    }, [
        subscriptionsUtilizedProductOneFetch,
        subscriptionsUtilizedProductTwoFetch
    ]);

    useEffect(() => {
        const chartData = { productError: false, productOptIn: false, productOne: {}, productTwo: {} };

        if (subscriptionsUtilizedProductOneFetchStatus === 'fulfilled' || subscriptionsUtilizedProductTwoFetchStatus === 'fulfilled') {
            const [productOneReport = {}, productOneCapacity = {}] = Immutable.asMutable(subscriptionsUtilizedProductOne, { deep: true }) || [];
            const [productTwoReport = {}, productTwoCapacity = {}] = Immutable.asMutable(subscriptionsUtilizedProductTwo, { deep: true }) || [];

            chartData.productOne = filterChartData(
                productOneReport[RHSM_API_RESPONSE_DATA],
                productOneCapacity[RHSM_API_RESPONSE_DATA],
                RHSM_API_RESPONSE_DATA_TYPES.CORES
            );
            chartData.productTwo = filterChartData(
                productTwoReport[RHSM_API_RESPONSE_DATA],
                productTwoCapacity[RHSM_API_RESPONSE_DATA],
                RHSM_API_RESPONSE_DATA_TYPES.SOCKETS
            );
        }

        if (subscriptionsUtilizedProductOneFetchStatus === 'rejected' && subscriptionsUtilizedProductTwoFetchStatus === 'rejected') {
            const [productOneError = {}] = subscriptionsUtilizedProductOne.data?.[RHSM_API_RESPONSE_ERROR_DATA] || [];
            const [productTwoError = {}] = subscriptionsUtilizedProductOne.data?.[RHSM_API_RESPONSE_ERROR_DATA] || [];

            chartData.productError = true;
            chartData.productOptIn = productOneError[RHSM_API_RESPONSE_ERROR_DATA_TYPES.CODE] === RHSM_API_RESPONSE_ERROR_DATA_CODE_TYPES.OPTIN &&
                productTwoError[RHSM_API_RESPONSE_ERROR_DATA_TYPES.CODE] === RHSM_API_RESPONSE_ERROR_DATA_CODE_TYPES.OPTIN;
        }

        setProducts(chartData);
    }, [
        subscriptionsUtilizedProductOne,
        subscriptionsUtilizedProductTwo,
        subscriptionsUtilizedProductOneFetchStatus,
        subscriptionsUtilizedProductTwoFetchStatus
    ]);

    const { productError, productOptIn, productOne = {}, productTwo = {} } = products;

    const productTwoTooltip = (
        <ul>
            <li>{intl.formatMessage(messages.subscriptionsUtilizedProductTwoReport, { totalReport: productTwo.report })}</li>
            <li>{intl.formatMessage(messages.subscriptionsUtilizedProductCapacity, { totalCapacity: productTwo.capacity })}</li>
            <li>{intl.formatMessage(messages.subscriptionsUtilizedProductDate,
                { formattedDate: <DateFormat type='exact' date={ productTwo.date } /> })}</li>
        </ul>
    );
    const productOneTooltip = (
        <ul>
            <li>{intl.formatMessage(messages.subscriptionsUtilizedProductOneReport, { totalReport: productOne.report })}</li>
            <li>{intl.formatMessage(messages.subscriptionsUtilizedProductCapacity, { totalCapacity: productOne.capacity })}</li>
            <li>{intl.formatMessage(messages.subscriptionsUtilizedProductDate,
                { formattedDate: <DateFormat type='exact' date={ productOne.date } /> })}</li>
        </ul>
    );

    const charts = [];
    const generateCharts = ({ fetchStatus, percentage, title, tooltip, link }) => {
        switch (fetchStatus) {
            case 'pending':
                charts.push(<Loading key={`su-loading-${title}`} />);
                break;
            case 'fulfilled':
                if (percentage !== undefined && percentage !== null) {
                    charts.push(
                        <Tooltip
                            key={`su-tooltip-${title}`}
                            content={tooltip}
                            position={TooltipPosition.top}
                            distance={-10}
                            entryDelay={200}
                        >
                            <Button className='insd-c-subscriptions-utilized__chart-link'
                                variant='link'
                                href={link} component='a'
                            >
                                <ProgressTemplate
                                    title={title}
                                    value={percentage}
                                    label={`${percentage}%`}
                                    variant={(percentage > 100 && 'danger') || 'info'}
                                />
                            </Button>
                        </Tooltip>);
                }

                break;
        }
    };

    generateCharts({
        fetchStatus: subscriptionsUtilizedProductTwoFetchStatus,
        percentage: productTwo.percentage,
        title: intl.formatMessage(messages.subscriptionsUtilizedProductTwoTitle),
        tooltip: productTwoTooltip,
        link: SW_PATHS.RHEL
    });

    generateCharts({
        fetchStatus: subscriptionsUtilizedProductOneFetchStatus,
        percentage: productOne.percentage,
        title: intl.formatMessage(messages.subscriptionsUtilizedProductOneTitle),
        tooltip: productOneTooltip,
        link: SW_PATHS.OPENSHIFT
    });

    if (productOne.percentage > productTwo.percentage && productOne.percentage > 100) {
        charts.reverse();
    }

    return <ExpandableCardTemplate appName='SubscriptionsUtilized'
        className='insd-m-toggle-right-on-md'
        title={intl.formatMessage(messages.subscriptionsUtilizedTitle)}
        isExpanded={JSON.parse(localStorage.getItem('dashboard_expanded_subwatch') || 'true')}
        isExpandedCallback={isExpanded => localStorage.setItem('dashboard_expanded_subwatch', isExpanded)}
        body={<TemplateCardBody>
            {supportsGlobalFilter(selectedTags, workloads, SID) ?
                <React.Fragment>
                    {
                        (productOptIn && <EmptyState className='insd-c-subscriptions-utilized__empty-state' variant={EmptyStateVariant.full}>
                            <EmptyStateBody>
                                {intl.formatMessage(messages.subscriptionsUtilizedLearnMore)}
                            </EmptyStateBody>
                            <EmptyStateSecondaryActions>
                                <Button
                                    className='insd-c-subscriptions-utilized__app-link'
                                    variant='link'
                                    href={SW_PATHS.APP}
                                    component='a'
                                >
                                    {intl.formatMessage(messages.subscriptionsUtilizedLearnMoreAction)}
                                </Button>
                            </EmptyStateSecondaryActions>
                        </EmptyState>) ||
                        (productError && <FailState appName={intl.formatMessage(messages.subscriptionsUtilizedTitle)} isSmall />) ||
                        (!charts.length && <EmptyState className='insd-c-subscriptions-utilized__empty-state' variant={EmptyStateVariant.full}>
                            <EmptyStateBody>
                                {intl.formatMessage(messages.subscriptionsUtilizedNoProductData)}
                            </EmptyStateBody>
                        </EmptyState>) ||
                        charts
                    }
                </React.Fragment>
                : <FilterNotSupported
                    href={SW_PATHS.APP}
                    title={intl.formatMessage(messages.filterNotApplicable)}
                    appName={intl.formatMessage(messages.subscriptionsTitle)}
                />
            }
        </TemplateCardBody>}
    />;
};

SubscriptionsUtilizedCard.propTypes = {
    intl: PropTypes.any,
    subscriptionsUtilizedProductOne: PropTypes.array,
    subscriptionsUtilizedProductOneFetch: PropTypes.func,
    subscriptionsUtilizedProductOneFetchStatus: PropTypes.string,
    subscriptionsUtilizedProductTwo: PropTypes.array,
    subscriptionsUtilizedProductTwoFetch: PropTypes.func,
    subscriptionsUtilizedProductTwoFetchStatus: PropTypes.string,
    selectedTags: PropTypes.array,
    workloads: workloadsPropType,
    SID: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = ({ DashboardStore }) => ({
    subscriptionsUtilizedProductOne: DashboardStore.subscriptionsUtilizedProductOne,
    subscriptionsUtilizedProductOneFetchStatus: DashboardStore.subscriptionsUtilizedProductOneFetchStatus,
    subscriptionsUtilizedProductTwo: DashboardStore.subscriptionsUtilizedProductTwo,
    subscriptionsUtilizedProductTwoFetchStatus: DashboardStore.subscriptionsUtilizedProductTwoFetchStatus,
    selectedTags: DashboardStore.selectedTags,
    workloads: DashboardStore.workloads,
    SID: DashboardStore.SID
});

const mapDispatchToProps = dispatch => ({
    subscriptionsUtilizedProductOneFetch: (productId, options) => dispatch(AppActions.subscriptionsUtilizedProductOneFetch(productId, options)),
    subscriptionsUtilizedProductTwoFetch: (productId, options) => dispatch(AppActions.subscriptionsUtilizedProductTwoFetch(productId, options))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsUtilizedCard);
