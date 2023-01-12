import './DriftCard.scss';

import * as AppActions from '../../AppActions';
import * as ActionTypes from '../../AppConstants';
import { getDate, buildCompareUrl } from './utils';

import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import { TemplateCardBody } from '../../PresentationalComponents/Template/TemplateCard';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts';
import { DriftDropDown } from './DriftDropDown';
import messages from '../../Messages';
import SortUpIcon from '@patternfly/react-icons/dist/esm/icons/sort-up-icon';
import {
    TextContent,
    Divider,
    DataList,
    DataListItem,
    DataListItemRow,
    DataListCell,
    DataListItemCells,
    DataListWrapModifier,
    Button,
    TextVariants,
    Text,
    Bullseye,
    Spinner,
    Tooltip
} from '@patternfly/react-core';
import { DriftEmptyState } from './DriftEmptyState';
import { useDispatch } from 'react-redux';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/RouterParams';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const DriftCard = () => {

    const intl = useIntl();
    const dispatch = useDispatch();
    const [activeDrift, setActiveDrift] = useState({
        id: 'hours-24',
        description: intl.formatMessage(messages.driftDropDown24hours),
        startDate: getDate(1),
        endDate: getDate(0)
    });
    const [isCardExpanded, setIsCardExpanded] = useState(true);
    const driftEvents = useSelector(({ DashboardStore }) => DashboardStore.driftEvents);
    const driftEventFetchStatus = useSelector(({ DashboardStore }) => DashboardStore.driftEventFetchStatus);
    const fetchDriftData = useCallback((dropDownItem) => {
        dispatch(AppActions.fetchDrift({
            appIds: ActionTypes.DRIFT_EVENTS_APP_ID,
            startDate: dropDownItem.startDate,
            endDate: dropDownItem.endDate,
            includePayload: true
        }));
        setActiveDrift(dropDownItem);
    }, [dispatch]);

    useEffect(() => {
        fetchDriftData(activeDrift);
    }, [fetchDriftData, activeDrift.id]);

    return (
        <ExpandableCardTemplate
            className='insd-m-toggle-right-on-md'
            appName='Drift'
            isExpanded={isCardExpanded}
            isExpandedCallback={setIsCardExpanded}
            title={
                <Flex>
                    <FlexItem>
                        {intl.formatMessage(messages.driftCardTitle)}
                    </FlexItem>
                    {isCardExpanded ? (
                        <FlexItem
                            className='ins-c-drift__drop_down'
                            align={{ default: 'alignRight' }}>
                            <DriftDropDown fetchDriftData={fetchDriftData} selectedFilter={activeDrift} />
                        </FlexItem>) : null}
                </Flex>}
            body={
                <React.Fragment>
                    {driftEventFetchStatus === 'pending' ?
                        (
                            <React.Fragment>
                                <Bullseye>
                                    <Spinner className='ins-c-drift__drift_spinner' />
                                </Bullseye>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {driftEvents.baselineDetail?.length > 0 ?
                                    (<TemplateCardBody>
                                        <Flex
                                            direction={{ default: 'column' }}
                                            alignItems={{ default: 'alignItemsCenter' }}>
                                            <FlexItem>
                                                <Flex
                                                    alignItems={{ default: 'alignItemsFlexCenter' }}
                                                    justifyContent={{ default: 'justifyContentCenter' }}>
                                                    <span className='pf-u-font-size-2xl pf-u-text-align-center pf-u-font-weight-normal'>
                                                        {driftEvents.numEvents}
                                                    </span>
                                                </Flex>
                                                <TextContent
                                                    className='insd-c-width-limiter pf-u-text-align-center'>
                                                    <p className='pf-u-font-size-sm'>
                                                        {intl.formatMessage(messages.driftNumberOfEvents)}
                                                    </p>
                                                </TextContent>
                                            </FlexItem>
                                            <Button
                                                variant="secondary"
                                                component='a'
                                                className='ins-c-drift__investigate_button'
                                                href={ActionTypes.DRIFT_URL}>
                                                {intl.formatMessage(messages.driftInventigateButtton)}
                                            </Button>
                                        </Flex>
                                        <Divider />
                                        <TextContent
                                            className='insd-c-width-limiter ins-c-drift__top_5'>
                                            <p className='pf-u-font-size-sm pf-u-font-weight-bold'>
                                                {intl.formatMessage(messages.driftTop5)}
                                            </p>
                                        </TextContent>
                                        <DataList className='insd-m-no-padding insd-m-no-top-border insd-m-no-bottom-border' isCompact>
                                            {driftEvents.baselineDetail.slice(0, ActionTypes.TOP_BASELINES).map((baseline, index) =>
                                                <DataListItem key={index}>
                                                    <DataListItemRow>
                                                        <DataListItemCells
                                                            dataListCells={[
                                                                <React.Fragment key={index}>
                                                                    <DataListCell key={`title-${index}`}
                                                                        wrapModifier={DataListWrapModifier.truncate}>
                                                                        <Text
                                                                            component={TextVariants.a}
                                                                            href={`${ActionTypes.DRIFT_BASELINES_URL}/${baseline.baselineId}`}
                                                                        >
                                                                            {baseline.baselineName}
                                                                        </Text>
                                                                    </DataListCell>
                                                                    <DataListCell key={`system-${index}`}
                                                                        className='ins-c-drift__data_list_cell_system_len'>
                                                                        <span className='pf-u-font-weight-normal ins-c-drift__system_len'>
                                                                            <SortUpIcon  color='black'/>
                                                                            {intl.formatMessage(messages.driftSystems,
                                                                                { systems: baseline.systems.length })}
                                                                        </span>
                                                                    </DataListCell>
                                                                    <DataListCell key={`compare-${index}`}
                                                                        className='ins-c-drift__data_list_cell_compare'>
                                                                        <Tooltip
                                                                            content={
                                                                                <div>
                                                                                    {intl.formatMessage(messages.driftCompareTooltip)}
                                                                                </div>}>
                                                                            <Text
                                                                                component={TextVariants.a}
                                                                                href={buildCompareUrl(baseline.baselineId, baseline.systems)}
                                                                                className='ins-c-drift__text_compare'
                                                                            >
                                                                                {intl.formatMessage(messages.driftCompare)}
                                                                            </Text>
                                                                        </Tooltip>
                                                                    </DataListCell>
                                                                </React.Fragment>
                                                            ]}
                                                        />
                                                    </DataListItemRow>
                                                </DataListItem>
                                            )}
                                        </DataList>
                                    </TemplateCardBody>)
                                    : (<DriftEmptyState />)
                                }
                            </React.Fragment>
                        )}
                </React.Fragment>
            }
        />
    );
};

DriftCard.propTypes = {
    fetchDrift: PropTypes.func,
    driftEvents: PropTypes.object,
    driftEventFetchStatus: PropTypes.string,
    intl: PropTypes.any
};

export default routerParams(DriftCard);
