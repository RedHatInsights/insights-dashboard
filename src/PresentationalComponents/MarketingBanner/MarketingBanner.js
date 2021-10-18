import './_marketing-banner.scss';

import { PageSection } from '@patternfly/react-core';
import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';

const MarketingBanner = ({ className, hasGraphic, graphicRight, dark1000, fullBleed, style, children }) => {

    const MarketingBannerSectionClasses = classNames(
        className,
        'insd-c-marketing-banner',
        { [`insd-m-with-graphic`]: hasGraphic },
        { [`insd-m-graphic-right`]: graphicRight },
        { [`insd-m-dark-1000 pf-m-dark-1000`]: dark1000 },
        { [`insd-m-full-bleed`]: fullBleed }
    );

    return <PageSection
        className={ MarketingBannerSectionClasses }
        style={ style }
        isWidthLimited>
        {children}
    </PageSection>;
};

export default MarketingBanner;

MarketingBanner.propTypes = {
    children: propTypes.any.isRequired,
    className: propTypes.string,
    style: propTypes.any,
    graphicRight: propTypes.bool,
    hasGraphic: propTypes.bool,
    dark1000: propTypes.bool,
    fullBleed: propTypes.bool,
    isWidthLimited: propTypes.bool
};
