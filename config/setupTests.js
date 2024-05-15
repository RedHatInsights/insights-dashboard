
import { jest } from '@jest/globals';

global.jest = jest;

jest.mock('@redhat-cloud-services/frontend-components/useChrome', () => ({
    __esModule: true,
    default: () => ({
        getUserPermissions: () => Promise.resolve(['inventory:*:*']),
        hideGlobalFilter: () => jest.fn(),
        getBundle: jest.fn()
    }),
    useChrome: () => ({
        isBeta: jest.fn(),
        updateDocumentTitle: jest.fn()
    })
}));
