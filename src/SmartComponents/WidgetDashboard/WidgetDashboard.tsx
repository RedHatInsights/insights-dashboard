import React from 'react';
import AsyncComponent from '@redhat-cloud-services/frontend-components/AsyncComponent';

const WidgetDashboard = () => (
  <AsyncComponent
    scope="widgetLayout"
    module="./WidgetLayout"
    layoutType="dashboard-insightsDashboard"
  />
);

export default WidgetDashboard;
