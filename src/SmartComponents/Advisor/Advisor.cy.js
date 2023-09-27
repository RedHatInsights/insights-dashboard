import React, { Suspense } from 'react';
import Advisor from './Advisor';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { cvesInterceptors, rulesInterceptors, systemsInterceptors } from '../../../cypress/support/interceptors';
import Masonry from 'react-masonry-css';
import { Grid } from '@patternfly/react-core/dist/esm/layouts';

before(() => {
    cy.mockWindowChrome();
});

const breakpointColumnsObj = {
    default: 2,
    992: 1
};

const defaultValues = {
    categoryTypes: [
        { name: 'Availability', value: '62' },
        { name: 'Stability', value: '10' },
        { name: 'Performance', value: '20' },
        { name: 'Security', value: '35' }]
};

const AdvisorCard = () => {
    return (
        <Grid hasGutter>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="ins-l-masonry"
                columnClassName="ins-l-masonry_column"
            >
                <Suspense fallback={ <Loading /> }>
                    <Advisor />
                </Suspense>;
            </Masonry>
        </Grid>
    );
};

describe('Dashboard Advisor rules', () => {
    beforeEach(() => {
        cvesInterceptors.successful();
        rulesInterceptors.successful();
        systemsInterceptors.successful();
        cy.mountWithContext(AdvisorCard);});

    it('the text in the header text is correct', () => {
        cy.get('div[class="pf-c-content insd-c-width-limiter pf-u-text-align-center"]')
        .should('have.text',
            'Problematic conditions that cause an issue have been actively detected on your systems.');
    });

    defaultValues.categoryTypes.forEach((type, index) => {
        it(`metric ${type.name} is correct`, () => {
            cy.get('span.insd-c-legend__text').eq(index).should('contain', type.name).and('contain', type.value);
        });
    });
});
