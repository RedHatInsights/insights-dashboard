import { Card, CardExpandableContent, CardHeader, CardTitle, Divider, Title } from '@patternfly/react-core/dist/esm/components';
import React, { useState } from 'react';

import propTypes from 'prop-types';

export const ExpandableCardTemplate = ({ className, appName, title, header, body, hasDivider, isExpanded = true, isExpandedCallback, ...props }) => {
    const [expanded, setExpanded] = useState(isExpanded);

    return <Card
        className={`insd-c-dashboard__card insd-c-dashboard__card--${appName} ${className}`}
        id={`insd-c-dashboard__card--${appName}`}
        isExpanded={expanded}
        {...props}>
        {hasDivider && <Divider inset={{ md: 'insetLg' }} />}
        <CardHeader
            onExpand={() => { setExpanded(!expanded); isExpandedCallback && isExpandedCallback(!expanded); }}
            toggleButtonProps={{
                id: `insd-c-dashboard__card-title--${appName}-toggle-button`,
                'aria-label': 'Details',
                'aria-labelledby': `insd-c-dashboard__card-title--${appName} toggle-button`,
                'aria-expanded': expanded
            }}>
            {title && <CardTitle>
                <Title headingLevel="h2" size="lg">
                    {title}
                </Title>
            </CardTitle>
            }
            {header}
        </CardHeader>
        <CardExpandableContent>
            {body}
        </CardExpandableContent>
    </Card>;
};

ExpandableCardTemplate.propTypes = {
    appName: propTypes.string,
    className: propTypes.string,
    title: propTypes.any,
    header: propTypes.any,
    body: propTypes.any,
    hasDivider: propTypes.any,
    isExpanded: propTypes.bool,
    isExpandedCallback: propTypes.func,
    footer: propTypes.any
};
