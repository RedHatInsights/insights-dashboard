import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom';
import WidgetStates from './WidgetStates';
import messages from '../../Messages';

const renderStates = (ui: React.ReactElement) =>
  render(
    <IntlProvider locale="en" messages={messages as never}>
      {ui}
    </IntlProvider>,
  );

describe('WidgetStates', () => {
  it('should render children in the default state', () => {
    renderStates(
      <WidgetStates state="default">
        <div aria-label="widget content">42 systems</div>
      </WidgetStates>,
    );

    expect(screen.getByLabelText('widget content')).toBeVisible();
    expect(screen.getByText('42 systems')).toBeVisible();
  });

  it('should render a skeleton in the loading state', () => {
    const { container } = renderStates(
      <WidgetStates state="loading">
        <div>never rendered</div>
      </WidgetStates>,
    );

    // Skeleton renders (some element, no text) and children do not
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.queryByText('never rendered')).not.toBeInTheDocument();
  });

  it('should render the empty state with default copy', () => {
    renderStates(
      <WidgetStates state="empty">
        <div>never rendered</div>
      </WidgetStates>,
    );

    expect(screen.getByText('No data yet')).toBeVisible();
    expect(screen.queryByText('never rendered')).not.toBeInTheDocument();
  });

  it('should render a custom empty body when provided', () => {
    renderStates(
      <WidgetStates state="empty" emptyBody="No systems registered yet" />,
    );

    expect(screen.getByText('No systems registered yet')).toBeVisible();
  });

  it('should render a custom empty action when provided', () => {
    renderStates(
      <WidgetStates
        state="empty"
        emptyAction={<button type="button">Register systems</button>}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Register systems' }),
    ).toBeVisible();
  });

  it('should render the error state with a Get help pill CTA', () => {
    renderStates(<WidgetStates state="error" />);

    expect(screen.getByText('Something went wrong')).toBeVisible();
    expect(screen.getByTestId('widget-state-error-icon')).toBeVisible();

    const cta = screen.getByRole('link', { name: 'Get help' });
    expect(cta).toHaveAttribute('href', 'https://access.redhat.com/support');
    expect(cta).toHaveClass('insd-c-widget-state__cta');
  });

  it('should render a retry button wired to onRetry in the error state', () => {
    const onRetry = jest.fn();
    renderStates(<WidgetStates state="error" onRetry={onRetry} />);

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);

    // Get help still renders alongside the retry button
    expect(screen.getByRole('link', { name: 'Get help' })).toBeVisible();
  });

  it('should not render a retry button without onRetry', () => {
    renderStates(<WidgetStates state="error" />);

    expect(
      screen.queryByRole('button', { name: 'Try again' }),
    ).not.toBeInTheDocument();
  });

  it('should render the access denied state with a lock icon and Learn more pill CTA', () => {
    renderStates(<WidgetStates state="access-denied" />);

    expect(
      screen.getByText('Contact your administrator to access this service'),
    ).toBeVisible();
    expect(screen.getByTestId('widget-state-lock-icon')).toBeVisible();

    const cta = screen.getByRole('link', { name: 'Learn more' });
    expect(cta).toHaveAttribute(
      'href',
      'https://docs.redhat.com/en/red-hat-insights',
    );
    expect(cta).toHaveClass('insd-c-widget-state__cta');
  });
});
