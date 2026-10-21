const mockChrome = {
  updateDocumentTitle: () => ({}),
  on: () => ({}),
  getUserPermissions: () => Promise.resolve(['inventory:*:*']),
  hideGlobalFilter: () => true,
};

export default mockChrome;
