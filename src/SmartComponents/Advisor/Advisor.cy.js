import React, { Suspense } from 'react';
import Advisor from './Advisor';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { cvesInterceptors } from '../../../cypress/support/interceptors';
import Masonry from 'react-masonry-css';
import { Grid } from '@patternfly/react-core/dist/esm/layouts';

before(() => {
    cy.mockWindowChrome();
});

const breakpointColumnsObj = {
    default: 2,
    992: 1
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
        cy.mountWithContext(AdvisorCard);});
    //The interceptors are Failing, replace them with the new ones and provide data to the component.
    //Write basic render test for the case when the data is present and when it's not

    it('the text in the header text is correct', () => {
        cy.get('div[class="pf-c-content insd-c-width-limiter"]')
        .should('have.text',
            'I need this to render so I wrote this basic test');
    });
});
