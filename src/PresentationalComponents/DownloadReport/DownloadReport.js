import './DownloadReport.scss';

import { Button } from '@patternfly/react-core/dist/esm/components/Button/Button';
import DownloadIcon from '@patternfly/react-icons/dist/esm/icons/download-icon';
import React from 'react';

export const DownloadReport = () => (
    <Button className="insd-c-button-report-download" variant="link" icon={ <DownloadIcon /> }>
        Report
    </Button>
);

export default DownloadReport;
