import React, { Suspense } from 'react';
import PatchManagerCard from './PatchManagerCard';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { patchInterceptors } from '../../../cypress/support/interceptors';
import Masonry from 'react-masonry-css';
import { Grid } from '@patternfly/react-core/dist/esm/layouts';

before(() => {
    cy.mockWindowChrome();
});

const breakpointColumnsObj = {
    default: 2,
    992: 1
};

const MountVulnerabilityCard = () => {
    return (
        <Grid hasGutter>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="ins-l-masonry"
                columnClassName="ins-l-masonry_column"
            >
                <Suspense fallback={ <Loading /> }>
                    <PatchManagerCard />
                </Suspense>;
            </Masonry>
        </Grid>
    );
};

describe('Dashboard Patch', () => {
    beforeEach(() => {
        patchInterceptors.successful();
        cy.mountWithContext(MountVulnerabilityCard);});
    it('the title is correct', () => {
        cy.get('div[id="insd-c-dashboard__card--PatchManager-title"] h2')
        .should('have.text',
            'Patch');
    });
    it('the systes affected value is correct', () => {
        cy.get('div.insd-c-dashboard__card--body > div > a > span')
        .should('have.text',
            '4,957 systems affected');
    });
    it('the legend has 3 items', () => {
        cy.get('div.insd-c-legend')
        .children().should('have.length', 3);
    });
    it('the first metric is correct', () => {
        cy.get('span.insd-c-legend__text').eq(0).should('contain', 'Security advisories').and('contain', '1033');
    });
    it('the second metric is correct', () => {
        cy.get('span.insd-c-legend__text').eq(1).should('contain', 'Bug fixes').and('contain', '2235');
    });
    it('the third metric is correct', () => {
        cy.get('span.insd-c-legend__text').eq(2).should('contain', 'Enhancements').and('contain', '343');
    });
});
