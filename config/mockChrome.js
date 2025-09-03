const mockChrome = {
    updateDocumentTitle: () => ({}),
    on: () => ({}),
    mapGlobalFilter: () => [[], [], []],
    getUserPermissions: () => Promise.resolve(['inventory:*:*']),
    hideGlobalFilter: () => true
};

export default mockChrome;
