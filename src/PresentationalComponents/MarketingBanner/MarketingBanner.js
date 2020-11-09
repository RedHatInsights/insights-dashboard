import React, { Component } from 'react';
import { PageSection } from '@patternfly/react-core';
import './_marketing-banner.scss';

import classNames from 'classnames';
import propTypes from 'prop-types';

class MarketingBanner extends Component {

    render () {
        const MarketingBannerSectionClasses = classNames(
            this.props.className,
            'ins-c-marketing-banner',
            { [`ins-m-with-graphic `]: this.props.hasGraphic },
            { [`ins-m-graphic-right`]: this.props.graphicRight },
            { [`ins-m-dark-1000 pf-m-dark-1000`]: this.props.dark1000 },
            { [`ins-m-full-bleed`]: this.props.fullBleed }
        );

        return (
            <PageSection
                className={ MarketingBannerSectionClasses }
                style={ this.props.style }
                isWidthLimited={ this.props.isWidthLimited }>
                { this.props.children }
            </PageSection>
        );
    }
}

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
