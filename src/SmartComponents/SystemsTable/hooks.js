import { buildFilterSortString } from './helpers';
import API from '../../Utilities/Api';
import * as ActionTypes from '../../AppConstants';

export const useGetEntities = (onComplete, { selectedIds }) => {
    return async (
        _items,
        { page = 1, per_page: perPage, orderBy, orderDirection, filters }
    ) => {
        const filterSortString = buildFilterSortString(
            perPage,
            page,
            orderBy,
            orderDirection,
            filters
        );
        await window.insights.chrome.auth.getUser();
        const fetchedEntities = await API.get(`${ActionTypes.INVENTORY_BASE_FETCH_URL}${filterSortString}`);

        const {
            data
        } = fetchedEntities || {};

        onComplete && onComplete(fetchedEntities);

        return {
            results: data.results.map((entity) => ({
                ...entity,
                selected: (selectedIds || []).map((id) => id).includes(entity.id)
            })),
            page,
            perPage,
            orderBy,
            orderDirection,
            total: data.total
        };
    };
};
