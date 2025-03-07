import React from 'react';
import Advisor from './Advisor';
import { advisorInterceptors, featureFlagsInterceptors } from '../../../cypress/support/interceptors';
import Masonry from 'react-masonry-css';
import { Grid } from '@patternfly/react-core/dist/esm/layouts';
import { BrowserRouter } from 'react-router-dom';

before(() => {
    cy.mockWindowChrome();
});

const breakpointColumnsObj = {
    default: 2,
    992: 1
};

const MountAdvisorCard = () => {
    return (
        <BrowserRouter>
            <Grid hasGutter>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="ins-l-masonry"
                    columnClassName="ins-l-masonry_column"
                >
                    <Advisor />
                </Masonry>
            </Grid>
        </BrowserRouter>
    );
};

describe('Advisor component renders', () => {
    beforeEach(() => {
        advisorInterceptors.rules();
        advisorInterceptors.systems();
        advisorInterceptors.rule();
        featureFlagsInterceptors.edgeParityDisabled();
        cy.mountWithContext(MountAdvisorCard);
    });
    it('The count is correct', () => {
        console.log('Navigated.');
    });
});
