import { Card, CardExpandableContent, CardHeader, CardTitle, Divider, Title } from '@patternfly/react-core/dist/esm/components';
import React, { useState } from 'react';

import propTypes from 'prop-types';

export const ExpandableCardTemplate = ({ className, appName, title, header, body, hasDivider, isExpanded = true, isExpandedCallback, ...props }) => {
    const [expanded, setExpanded] = useState(isExpanded);

    return <Card
        className={`ins-c-dashboard__card ins-c-dashboard__card--${appName} ${className}`}
        id={`ins-c-dashboard__card--${appName}`}
        isExpanded={expanded}
        {...props}>
        {hasDivider && <Divider inset={{ md: 'insetLg' }} />}
        <CardHeader
            onExpand={() => { setExpanded(!expanded); isExpandedCallback && isExpandedCallback(!expanded); }}
            toggleButtonProps={{
                id: `ins-c-dashboard__card-title--${appName}-toggle-button`,
                'aria-label': 'Details',
                'aria-labelledby': `ins-c-dashboard__card-title--${appName} toggle-button`,
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
    title: propTypes.string,
    header: propTypes.any,
    body: propTypes.any,
    hasDivider: propTypes.any,
    isExpanded: propTypes.bool,
    isExpandedCallback: propTypes.func,
    footer: propTypes.footer
};
