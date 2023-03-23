import React from 'react';

export const createSystemLink = (id, name, keyData) => (
    <a
        rel="noreferrer"
        target="_blank"
        key={keyData}
        href={
            insights.chrome.isBeta()
                ? `/beta/insights/inventory/${id}`
                : `/insights/inventory/${id}`
        }
    >
        {name}
    </a>
);

const buildFilterString = (filters) => {
    let displayNameFilter = filters.hostnameOrId
        ? `&display_name=${filters.hostnameOrId}`
        : '';

    let osFilter = filters.osFilter?.length
        ? '&os_version=' + filters.osFilter.join(',')
        : '';

    return `${displayNameFilter}${osFilter}`;
};

export const buildFilterSortString = (
    perPage,
    page,
    orderBy,
    orderDirection,
    filters
) => {
    let pagePerPageString = `page=${page}&per_page=${perPage}`;
    let sortString = `&order_by=${orderBy}&order_how=${orderDirection}`;
    let filterString = buildFilterString(filters);
    //return encodeURI(`?${pagePerPageString}${sortString}${filterString}&fields[system_profile][]=operating_system`);
    return encodeURI(`?${pagePerPageString}${sortString}${filterString}&filter[system_profile][rhc_client_id][]=not_nil&fields[system_profile][]=operating_system`);
};

export const findCheckedValue = (total, selected) => {
    if (selected === total && total > 0) {
        return true;
    } else if (selected > 0 && selected < total) {
        return null;
    } else {
        return false;
    }
};
