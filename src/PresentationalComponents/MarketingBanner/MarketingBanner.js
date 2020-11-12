import './_marketing-banner.scss';

import { PageSection } from '@patternfly/react-core';
import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';

const MarketingBanner = ({ className, hasGraphic, graphicRight, dark1000, fullBleed, style, isWidthLimited, children }) => {

    const MarketingBannerSectionClasses = classNames(
        className,
        'ins-c-marketing-banner',
        { [`ins-m-with-graphic `]: hasGraphic },
        { [`ins-m-graphic-right`]: graphicRight },
        { [`ins-m-dark-1000 pf-m-dark-1000`]: dark1000 },
        { [`ins-m-full-bleed`]: fullBleed }
    );

    return <PageSection
        className={ MarketingBannerSectionClasses }
        style={ style }
        isWidthLimited={ isWidthLimited }>
        {children}
    </PageSection>;
};

export default MarketingBanner;

MarketingBanner.propTypes = {
    children: propTypes.any.isRequired,
    className: propTypes.string,
    style: propTypes.string,
    graphicRight: propTypes.bool,
    hasGraphic: propTypes.bool,
    dark1000: propTypes.bool,
    fullBleed: propTypes.bool,
    isWidthLimited: propTypes.bool
};
