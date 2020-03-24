import React from 'react';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import DownloadIcon from '@patternfly/react-icons/dist/js/icons/download-icon';
import './DownloadReport.scss';

export const DownloadReport = () => (
    <Button className="ins-c-download-report__button" variant="link" icon={ <DownloadIcon /> }>
        Report
    </Button>
);

export default DownloadReport;
