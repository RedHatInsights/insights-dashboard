import {
    Card,
    CardExpandableContent,
    CardHeader,
    CardTitle,
    Title
} from '@patternfly/react-core/dist/esm/components';
import React, { useState } from 'react';

import propTypes from 'prop-types';

export const ExpandableCardTemplate = ({ className, appName, title, header, body, ...props }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <Card
            className={ `ins-c-dashboard__card ins-c-dashboard__card--${appName} ${className}` }
            id={ `ins-c-dashboard__card--${appName}` }
            isExpanded={ isExpanded }
            { ...props }
        >
            <CardHeader
                onExpand={() => setIsExpanded(!isExpanded)}
                toggleButtonProps={{
                    id: `ins-c-dashboard__card-title--${appName}-toggle-button`,
                    'aria-label': 'Details',
                    'aria-labelledby': `ins-c-dashboard__card-title--${appName} toggle-button`,
                    'aria-expanded': isExpanded }}
            >
                { title &&
                    <CardTitle>
                        <Title headingLevel='h2' size='xl'>
                            { title }
                        </Title>
                    </CardTitle>
                }
                { header }
            </CardHeader>
            <CardExpandableContent>
                { body }
            </CardExpandableContent>
        </Card>
    );
};

ExpandableCardTemplate.propTypes = {
    appName: propTypes.string,
    className: propTypes.string,
    title: propTypes.string,
    header: propTypes.any,
    body: propTypes.any,
    footer: propTypes.footer
};
