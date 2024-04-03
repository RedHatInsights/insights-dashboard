export default () => ({
    updateDocumentTitle: () => undefined,
    isBeta: () => false,
    appAction: () => {},
    appObjectId: () => {},
    on: () => {},
    getApp: () => 'dashboard',
    getBundle: () => 'insights',
    getUserPermissions: () => [{ permission: 'inventory:*:*' }],
    analytics: {
        track: () => fetch('/analytics/track')
    },
    auth: {
        getUser: () => Promise.resolve(true),
        logout: () => Promise.resolve(true)
    }
});

export const useChrome = () => ({
    updateDocumentTitle: () => undefined,
    isBeta: () => false,
    analytics: {
        track: () => fetch('/analytics/track')
    },
    auth: {
        getUser: () => Promise.resolve(true),
        logout: () => Promise.resolve(true)
    }
});
