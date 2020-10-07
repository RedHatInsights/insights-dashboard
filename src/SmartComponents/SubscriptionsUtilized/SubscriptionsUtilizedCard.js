import './SubscriptionsUtilizedCard.scss';

import * as AppActions from '../../AppActions';

import { EmptyState, EmptyStateVariant } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyState';
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
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { Tooltip, TooltipPosition } from '@patternfly/react-core/dist/js/components/Tooltip/Tooltip';
import { filterChartData, setRangedDateTime } from './SubscriptionsUtilizedHelpers';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import { EmptyStateBody } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyStateBody';
import { EmptyStateSecondaryActions } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyStateSecondaryActions';
import FailState from '../../PresentationalComponents/FailState/FailState';
import Immutable from 'seamless-immutable';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { ProgressTemplate } from '../../../../insights-dashboard/src/ChartTemplates/Progress/ProgressTemplate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import messages from '../../Messages';
import moment from 'moment/moment';
import { useIntl } from 'react-intl';

/**
 * Subscriptions utilized card for showing the portion of Subscriptions used.
 */
const SubscriptionsUtilizedCard = ({ subscriptionsUtilizedProductOne, subscriptionsUtilizedProductOneFetch,
    subscriptionsUtilizedProductOneFetchStatus, subscriptionsUtilizedProductTwo, subscriptionsUtilizedProductTwoFetch,
    subscriptionsUtilizedProductTwoFetchStatus, workloads }) => {

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
            <li>{ intl.formatMessage(messages.subscriptionsUtilizedProductTwoReport, { totalReport: productTwo.report }) }</li>
            <li>{ intl.formatMessage(messages.subscriptionsUtilizedProductCapacity, { totalCapacity: productTwo.capacity }) }</li>
            <li>{ intl.formatMessage(messages.subscriptionsUtilizedProductDate,
                { formattedDate: moment.utc(productTwo.date).format('MMM D, YYYY') }) }</li>
        </ul>
    );
    const productOneTooltip = (
        <ul>
            <li>{ intl.formatMessage(messages.subscriptionsUtilizedProductOneReport, { totalReport: productOne.report }) }</li>
            <li>{ intl.formatMessage(messages.subscriptionsUtilizedProductCapacity, { totalCapacity: productOne.capacity }) }</li>
            <li>{ intl.formatMessage(messages.subscriptionsUtilizedProductDate,
                { formattedDate: moment.utc(productOne.date).format('MMM D, YYYY') }) }</li>
        </ul>
    );

    const charts = [];
    const generateCharts = ({ fetchStatus, percentage, title, tooltip, link }) => {
        switch (fetchStatus) {
            case 'pending':
                charts.push(<Loading key={ `su-loading-${title}` } />);
                break;
            case 'fulfilled':
                if (percentage !== undefined && percentage !== null) {
                    charts.push(
                        <Tooltip
                            key={ `su-tooltip-${title}` }
                            content={ tooltip }
                            position={ TooltipPosition.top }
                            distance={ -10 }
                            entryDelay={ 200 }
                        >
                            <Button className="ins-c-subscriptions-utilized__chart-link"
                                variant="link"
                                href={ link } component="a"
                            >
                                <ProgressTemplate
                                    title={ title }
                                    value={ percentage }
                                    label={ `${percentage}%` }
                                    variant={ (percentage > 100 && 'danger') || 'info' }
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

    return <TemplateCard appName='SubscriptionsUtilized'>
        <TemplateCardHeader subtitle={ intl.formatMessage(messages.subscriptionsUtilizedTitle) }/>
        <TemplateCardBody>
            {workloads === undefined || workloads['All workloads'] ?
                <React.Fragment>
                    {
                        (productOptIn && <EmptyState className="ins-c-subscriptions-utilized__empty-state" variant={ EmptyStateVariant.full }>
                            <EmptyStateBody>
                                {intl.formatMessage(messages.subscriptionsUtilizedLearnMore)}
                            </EmptyStateBody>
                            <EmptyStateSecondaryActions>
                                <Button
                                    className="ins-c-subscriptions-utilized__app-link"
                                    variant="link"
                                    href={ SW_PATHS.APP }
                                    component="a"
                                >
                                    {intl.formatMessage(messages.subscriptionsUtilizedLearnMoreAction)}
                                </Button>
                            </EmptyStateSecondaryActions>
                        </EmptyState>) ||
                (productError && <FailState appName={ intl.formatMessage(messages.subscriptionsUtilizedTitle) } isSmall/>) ||
                (!charts.length && <EmptyState className="ins-c-subscriptions-utilized__empty-state" variant={ EmptyStateVariant.full }>
                    <EmptyStateBody>
                        {intl.formatMessage(messages.subscriptionsUtilizedNoProductData)}
                    </EmptyStateBody>
                </EmptyState>) ||
                charts
                    }
                </React.Fragment>
                : <EmptyState>
                    <EmptyStateBody>
                        {intl.formatMessage(messages.contentNotSupported)}
                    </EmptyStateBody>
                </EmptyState>
            }
        </TemplateCardBody>
    </TemplateCard>;
};

SubscriptionsUtilizedCard.propTypes = {
    intl: PropTypes.any,
    subscriptionsUtilizedProductOne: PropTypes.array,
    subscriptionsUtilizedProductOneFetch: PropTypes.func,
    subscriptionsUtilizedProductOneFetchStatus: PropTypes.string,
    subscriptionsUtilizedProductTwo: PropTypes.array,
    subscriptionsUtilizedProductTwoFetch: PropTypes.func,
    subscriptionsUtilizedProductTwoFetchStatus: PropTypes.string,
    workloads: PropTypes.object
};

const mapStateToProps = ({ DashboardStore }) => ({
    subscriptionsUtilizedProductOne: DashboardStore.subscriptionsUtilizedProductOne,
    subscriptionsUtilizedProductOneFetchStatus: DashboardStore.subscriptionsUtilizedProductOneFetchStatus,
    subscriptionsUtilizedProductTwo: DashboardStore.subscriptionsUtilizedProductTwo,
    subscriptionsUtilizedProductTwoFetchStatus: DashboardStore.subscriptionsUtilizedProductTwoFetchStatus,
    workloads: DashboardStore.workloads
});

const mapDispatchToProps = dispatch => ({
    subscriptionsUtilizedProductOneFetch: (productId, options) => dispatch(AppActions.subscriptionsUtilizedProductOneFetch(productId, options)),
    subscriptionsUtilizedProductTwoFetch: (productId, options) => dispatch(AppActions.subscriptionsUtilizedProductTwoFetch(productId, options))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsUtilizedCard);
