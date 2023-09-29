export default () => ({
    updateDocumentTitle: () => undefined,
    isBeta: () => false,
    appAction: () => {},
    appObjectId: () => {},
    on: () => {},
    getApp: () => 'dashboard',
    getBundle: () => 'insights',
    getUserPermissions: () => [{ permission: 'inventory:*:*' }]
});
