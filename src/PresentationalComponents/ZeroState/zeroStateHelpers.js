import zeroStateAppList from './zeroStateConstants';

export const createAppNamesList = () => {
    return Object.keys(zeroStateAppList).map(key => key.replace('_ZERO_STATE', ''));
};
