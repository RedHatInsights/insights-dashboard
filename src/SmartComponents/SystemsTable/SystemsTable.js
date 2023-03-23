import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { defaultOnLoad, systemColumns } from './constants';

import { InventoryTable } from '@redhat-cloud-services/frontend-components/Inventory';
import { Spinner } from '@patternfly/react-core';
import { RegistryContext } from '../../Store/index';
import { useDispatch } from 'react-redux';
import NoEntitiesFound from '../../PresentationalComponents/Trials/NoEntitiesFound';

const SystemTable = ({ activeEmptyState, defaultActiveFilters }) => {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const inventory = useRef(null);
    const { getRegistry } = useContext(RegistryContext);
    const dispatch = useDispatch();
    const entities = useSelector(({ entities }) => entities);

    /*const tagsFilter = useSelector(
        ({ globalFilterState }) => globalFilterState?.tagsFilter
    );
    const workloadsFilter = useSelector(
        ({ globalFilterState }) => globalFilterState?.workloadsFilter
    );
    const sidsFilter = useSelector(
        ({ globalFilterState }) => globalFilterState?.sidsFilter
    );*/

    useEffect(() => {
        if (isFirstLoad && entities?.loaded && entities?.total > 0) {
            setIsFirstLoad(false);
        }
    }, [entities]);

    useEffect(() => {
        dispatch({ type: 'INVENTORY_INIT' });
        dispatch({ type: 'RESET_PAGE' });
        inventory?.current?.onRefreshData();
    }, [defaultActiveFilters]);

    const mergedColumns = (defaultColumns) =>
        systemColumns.map((column) => {
            const isStringCol = typeof column === 'string';
            const key = isStringCol ? column : column.key;
            const defaultColumn = defaultColumns.find(
                (defaultCol) => defaultCol.key === key
            );
            return {
                ...defaultColumn,
                ...(isStringCol ? { key: column } : column),
                props: {
                    ...defaultColumn?.props,
                    ...column?.props
                }
            };
        });

    return (
        <InventoryTable
            isFullView
            autoRefresh
            initialLoading
            showTags
            columns={mergedColumns}
            ref={inventory}
            fallback={<Spinner />}
            customFilters={{
                filters: defaultActiveFilters
                /*tags: tagsFilter,
                workloadFilters: generateFilter(
                    {
                        system_profile: {
                            ...(workloadsFilter?.SAP?.isSelected && { sap_system: true }),
                            ...(workloadsFilter?.['Ansible Automation Platform']
                            ?.isSelected && {
                                ansible: {
                                    not_nil: true
                                }
                            }),
                            ...(workloadsFilter?.['Microsoft SQL']?.isSelected && {
                                mssql: {
                                    not_nil: true
                                }
                            }),
                            ...(sidsFilter?.length > 0 && { sap_sids: sidsFilter })
                        }
                    },
                    undefined,
                    { arrayEnhancer: 'contains' }
                )*/
            }}
            //noSystemsTable={isFirstLoad ? activeEmptyState : <NoEntitiesFound />}
            noSystemsTable={activeEmptyState}
            onLoad={defaultOnLoad(systemColumns, getRegistry)}
            tableProps={{
                canSelectAll: false,
                isStickyHeader: true
            }}
        />
    );
};

SystemTable.propTypes = {
    activeEmptyState: PropTypes.node,
    defaultActiveFilters: PropTypes.array
};

export default SystemTable;
