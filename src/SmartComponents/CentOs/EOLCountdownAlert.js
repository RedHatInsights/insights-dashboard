import { Alert } from '@patternfly/react-core';
import React from 'react';

const CentOSEOLDate = 'June 30, 2024';

const getDaysLeft = (untilDate) => {
    let timeDiff = new Date(untilDate).getTime() - new Date().getTime();

    return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const EOLCountdownAlert = () => {
    const daysLeft = getDaysLeft(CentOSEOLDate);
    const preTitle = `CentOS 7 reaches End of Life (EOL) in ${daysLeft} days`;
    const postTitle = 'CentOS 7 has reached End of Life (EOL)';

    return (
        <Alert
            variant={daysLeft > 0 ? 'warning' : 'danger'}
            title={daysLeft > 0 ? preTitle : postTitle}
            isInline
        />
    );
};

export { EOLCountdownAlert, CentOSEOLDate };
