import React from 'react';
import { Button } from '@patternfly/react-core';
import { DownloadIcon } from '@patternfly/react-icons';
import './DownloadReport.scss';

export const DownloadReport = () => {
    return (
        <Button variant="link" icon={ <DownloadIcon /> }>
            Report
        </Button>
    );
};

export default DownloadReport;
