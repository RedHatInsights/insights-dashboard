import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { usePermissions } from '@redhat-cloud-services/frontend-components-utilities/RBACHook/RBACHook';
import {
  INVENTORY_ALL_SYSTEMS_VIEW_PARAM,
  INVENTORY_FETCH_URL,
  INVENTORY_STALE_FETCH_URL,
  INVENTORY_TOTAL_FETCH_URL,
  INVENTORY_WARNING_FETCH_URL,
} from '../../AppConstants';
import { useFeatureFlag } from '../../Utilities/Hooks';
import { useInventoryViewsFeatureFlag } from '../../Utilities/hooks/useInventoryViewsFeatureFlag';
import { useInventoryHostsReadKesselProbe } from '../../Utilities/hooks/useInventoryHostsReadKesselProbe';
import InventoryWidget from './InventoryWidget';
import messages from '../../Messages';

jest.mock(
  '@redhat-cloud-services/frontend-components-utilities/interceptors',
  () => ({
    __esModule: true,
    useAxiosWithPlatformInterceptors: jest.fn(),
  }),
);

jest.mock('../../Utilities/hooks/useInventoryViewsFeatureFlag', () => ({
  __esModule: true,
  useInventoryViewsFeatureFlag: jest.fn(),
}));

jest.mock(
  '@redhat-cloud-services/frontend-components-utilities/RBACHook/RBACHook',
  () => ({
    __esModule: true,
    usePermissions: jest.fn(),
  }),
);

jest.mock('../../Utilities/hooks/useInventoryHostsReadKesselProbe', () => ({
  __esModule: true,
  useInventoryHostsReadKesselProbe: jest.fn(),
}));

jest.mock('../../Utilities/Hooks', () => ({
  __esModule: true,
  useFeatureFlag: jest.fn(),
}));

jest.mock('@redhat-cloud-services/frontend-components/useChrome', () => ({
  __esModule: true,
  default: () => ({
    isBeta: () => false,
    getBundle: () => 'insights',
    getApplication: () => 'dashboard',
  }),
  useChrome: () => ({
    isBeta: () => false,
    getBundle: () => 'insights',
    getApplication: () => 'dashboard',
  }),
}));

const mockApi = { get: jest.fn() };

const mockUseInterceptors = useAxiosWithPlatformInterceptors as jest.Mock;
const mockUseInventoryViews = useInventoryViewsFeatureFlag as jest.Mock;
const mockUsePermissions = usePermissions as jest.Mock;
const mockUseKesselProbe = useInventoryHostsReadKesselProbe as jest.Mock;
const mockUseFeatureFlag = useFeatureFlag as jest.Mock;

const mockCounts = (counts: Partial<Record<string, number>>) => {
  mockApi.get = jest.fn((url: string) =>
    Promise.resolve({ total: counts[url] ?? 0 }),
  );
};

const renderWidget = () =>
  render(
    <BrowserRouter>
      <IntlProvider locale="en" messages={messages as never}>
        <InventoryWidget />
      </IntlProvider>
    </BrowserRouter>,
  );

describe('InventoryWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInterceptors.mockReturnValue(mockApi);
    mockUseInventoryViews.mockReturnValue(false);
    mockUseFeatureFlag.mockReturnValue(false);
    mockUsePermissions.mockReturnValue({
      hasAccess: true,
      isLoading: false,
    });
    mockUseKesselProbe.mockReturnValue({
      hasAccess: true,
      isLoading: false,
    });
  });

  it('should fetch all four counts through the platform axios instance', async () => {
    mockCounts({
      [INVENTORY_TOTAL_FETCH_URL]: 345,
      [INVENTORY_STALE_FETCH_URL]: 43,
      [INVENTORY_WARNING_FETCH_URL]: 7,
      [INVENTORY_FETCH_URL]: 340,
    });
    renderWidget();

    await waitFor(() => expect(screen.getByText('345')).toBeVisible());
    expect(mockUseKesselProbe).not.toHaveBeenCalled();
    expect(mockApi.get).toHaveBeenCalledWith(INVENTORY_TOTAL_FETCH_URL);
    expect(mockApi.get).toHaveBeenCalledWith(INVENTORY_STALE_FETCH_URL);
    expect(mockApi.get).toHaveBeenCalledWith(INVENTORY_WARNING_FETCH_URL);
    expect(mockApi.get).toHaveBeenCalledWith(INVENTORY_FETCH_URL);
  });

  it('should render the stale and to-be-removed links with their counts', async () => {
    mockCounts({
      [INVENTORY_TOTAL_FETCH_URL]: 345,
      [INVENTORY_STALE_FETCH_URL]: 43,
      [INVENTORY_WARNING_FETCH_URL]: 7,
      [INVENTORY_FETCH_URL]: 340,
    });
    const { container } = renderWidget();

    await waitFor(() =>
      expect(screen.getByText('43 stale systems')).toBeVisible(),
    );
    expect(screen.getByText('7 systems to be removed')).toBeVisible();
    expect(screen.getByText('Total systems')).toBeVisible();

    // eslint-disable-next-line testing-library/no-container
    const stats = container.querySelector<HTMLElement>(
      '.insd-c-inventory-widget__stats',
    );
    expect(stats).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-container
    const row = container.querySelector('.insd-c-inventory-widget__row');
    expect(row).toContainElement(stats);
    expect(row).toContainElement(
      // eslint-disable-next-line testing-library/no-container
      container.querySelector('.insd-c-inventory-widget__count'),
    );

    expect(
      screen.getByRole('link', { name: 'Register systems' }),
    ).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Configure integrations' }),
    ).toBeVisible();
    // single-element CTAs: no nested <button> inside the links
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should link the stat links to the filtered inventory views', async () => {
    mockCounts({
      [INVENTORY_TOTAL_FETCH_URL]: 345,
      [INVENTORY_STALE_FETCH_URL]: 43,
      [INVENTORY_WARNING_FETCH_URL]: 7,
      [INVENTORY_FETCH_URL]: 340,
    });
    renderWidget();

    await waitFor(() =>
      expect(screen.getByText('43 stale systems')).toBeVisible(),
    );

    expect(screen.getByRole('link', { name: /stale systems/ })).toHaveAttribute(
      'href',
      expect.stringContaining('status=stale&source=puptoo'),
    );
    expect(screen.getByRole('link', { name: /to be removed/ })).toHaveAttribute(
      'href',
      expect.stringContaining('status=stale_warning&source=puptoo'),
    );
    expect(
      screen.getByRole('link', { name: /not registered/ }),
    ).toHaveAttribute('href', expect.not.stringContaining('status='));
  });

  it('should add the inventory views param to the stat links when the flag is on', async () => {
    mockUseInventoryViews.mockReturnValue(true);
    mockCounts({
      [INVENTORY_TOTAL_FETCH_URL]: 345,
      [INVENTORY_STALE_FETCH_URL]: 43,
      [INVENTORY_WARNING_FETCH_URL]: 7,
      [INVENTORY_FETCH_URL]: 340,
    });
    renderWidget();

    await waitFor(() =>
      expect(screen.getByText('43 stale systems')).toBeVisible(),
    );

    expect(screen.getByRole('link', { name: /stale systems/ })).toHaveAttribute(
      'href',
      expect.stringContaining(INVENTORY_ALL_SYSTEMS_VIEW_PARAM),
    );
  });

  it('should show the not-registered upsell only when some systems lack the insights-client', async () => {
    mockCounts({
      [INVENTORY_TOTAL_FETCH_URL]: 345,
      [INVENTORY_STALE_FETCH_URL]: 0,
      [INVENTORY_WARNING_FETCH_URL]: 0,
      [INVENTORY_FETCH_URL]: 340,
    });
    const { unmount } = renderWidget();

    await waitFor(() =>
      expect(
        screen.getByText('5 systems not registered to the insights-client'),
      ).toBeVisible(),
    );
    unmount();

    mockCounts({
      [INVENTORY_TOTAL_FETCH_URL]: 345,
      [INVENTORY_FETCH_URL]: 345,
    });
    renderWidget();

    await waitFor(() => expect(screen.getByText('345')).toBeVisible());
    expect(
      screen.queryByText(/not registered to the insights-client/),
    ).not.toBeInTheDocument();
  });

  it('should render the empty state inline when the total is zero', async () => {
    mockCounts({});
    renderWidget();

    await waitFor(() => expect(screen.getByText('0')).toBeVisible());
    expect(screen.getByText('Total systems')).toBeVisible();
    expect(
      screen.getByText(
        'To start using Red Hat Lightspeed, register your systems with the insights-client.',
      ),
    ).toBeVisible();
    expect(screen.queryByText('43 stale systems')).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Register systems' }),
    ).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Configure integrations' }),
    ).toBeVisible();
  });

  it('should render the access-denied state without fetching when RBAC v1 denies inventory:hosts:read', async () => {
    mockUsePermissions.mockReturnValue({
      hasAccess: false,
      isLoading: false,
    });
    renderWidget();

    await waitFor(() =>
      expect(
        screen.getByText('Contact your administrator to access this service'),
      ).toBeVisible(),
    );
    expect(
      screen.getByText(
        'You do not have permission to view this data. An organization administrator can grant you access.',
      ),
    ).toBeVisible();
    expect(screen.queryByText('Total systems')).not.toBeInTheDocument();
    expect(mockApi.get).not.toHaveBeenCalled();
  });

  it('should gate on the Kessel probe when the kessel_enabled flag is on', async () => {
    mockUseFeatureFlag.mockImplementation(
      (flag: string) => flag === 'insights-dashboard.kessel_enabled',
    );

    mockUseKesselProbe.mockReturnValue({
      hasAccess: false,
      isLoading: false,
    });
    renderWidget();

    await waitFor(() =>
      expect(
        screen.getByText('Contact your administrator to access this service'),
      ).toBeVisible(),
    );
    expect(mockApi.get).not.toHaveBeenCalled();
    expect(mockUsePermissions).not.toHaveBeenCalled();
  });

  it('should not render content or fetch while permissions resolve', async () => {
    mockUsePermissions.mockReturnValue({
      hasAccess: false,
      isLoading: true,
    });
    renderWidget();

    expect(screen.queryByText('Total systems')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Contact your administrator to access this service'),
    ).not.toBeInTheDocument();
    expect(mockApi.get).not.toHaveBeenCalled();
  });

  it('should render the Default workspace chip until a workspace is selected', async () => {
    mockCounts({
      [INVENTORY_TOTAL_FETCH_URL]: 345,
      [INVENTORY_STALE_FETCH_URL]: 43,
      [INVENTORY_WARNING_FETCH_URL]: 7,
      [INVENTORY_FETCH_URL]: 340,
    });
    renderWidget();

    await waitFor(() => expect(screen.getByText('345')).toBeVisible());
    expect(screen.getByText('Default')).toBeVisible();
  });

  it('should render the error state when the fetch fails', async () => {
    mockApi.get = jest.fn(() => Promise.reject(new Error('boom')));
    renderWidget();

    await waitFor(() =>
      expect(screen.getByText('Something went wrong')).toBeVisible(),
    );
    expect(screen.getByRole('link', { name: 'Get help' })).toBeVisible();
  });
});
