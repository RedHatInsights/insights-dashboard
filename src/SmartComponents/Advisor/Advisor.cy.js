import React from 'react';
import Advisor from './Advisor';
import { advisorInterceptors, featureFlagsInterceptors } from '../../../cypress/support/interceptors';
import Masonry from 'react-masonry-css';
import { Grid } from '@patternfly/react-core/dist/esm/layouts';
import { BrowserRouter } from 'react-router-dom';
import messages from '../../Messages';

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
        cy.get('div[class*="skeleton"]').should('not.exist');
    });

    it('The count is correct', () => {
        // Advisor recommendations section
        cy.get('span:contains("incidents detected")').invoke('text').should((text) => {
            expect(parseInt(text.split(' ')[0].trim(), 10)).to.equal(4);
        });

        // Recommendations by total risk section
        cy.get('a:contains("Critical")').find('span').first().invoke('text').should((text) => {
            expect(parseInt(text.trim(), 10)).to.equal(3);
        });
        cy.get('a:contains("Important")').find('span').first().invoke('text').should((text) => {
            expect(parseInt(text.trim(), 10)).to.equal(16);
        });
        cy.get('a:contains("Moderate")').find('span').first().invoke('text').should((text) => {
            expect(parseInt(text.trim(), 10)).to.equal(10);
        });
        cy.get('a:contains("Low")').find('span').first().invoke('text').should((text) => {
            expect(parseInt(text.trim(), 10)).to.equal(0);
        });

        // Recommendations by category section
        cy.get('a:contains("Availability")').find('span').eq(1).invoke('text').should((text) => {
            expect(parseInt(text.split(' ')[0].trim(), 10)).to.equal(18);
        });
        cy.get('a:contains("Stability")').find('span').eq(1).invoke('text').should((text) => {
            expect(parseInt(text.split(' ')[0].trim(), 10)).to.equal(4);
        });
        cy.get('a:contains("Performance")').find('span').eq(1).invoke('text').should((text) => {
            expect(parseInt(text.split(' ')[0].trim(), 10)).to.equal(2);
        });
        cy.get('a:contains("Security")').find('span').eq(1).invoke('text').should((text) => {
            expect(parseInt(text.split(' ')[0].trim(), 10)).to.equal(5);
        });
    });

    it('Check that links point to the right URLs.', () => {
        // Advisor recommendations section
        cy.get('div[id*="Advisor"]')
        .find('a')
        .invoke('attr', 'href')
        .should('equal', '/insights/advisor/recommendations?reports_shown=true&impacting=true&offset=0&limit=10&sort=-publish_date&incident=true');

        // Recommendations by total risk section
        cy.get('a:contains("Critical")')
        .invoke('attr', 'href')
        .should('equal', '/insights/advisor/recommendations?sort=-total_risk&total_risk=4&reports_shown=true&impacting=true&offset=0&limit=10');

        cy.get('a:contains("Important")')
        .invoke('attr', 'href')
        .should('equal', '/insights/advisor/recommendations?sort=-total_risk&total_risk=3&reports_shown=true&impacting=true&offset=0&limit=10');

        cy.get('a:contains("Moderate")')
        .invoke('attr', 'href')
        .should('equal', '/insights/advisor/recommendations?sort=-total_risk&total_risk=2&reports_shown=true&impacting=true&offset=0&limit=10');

        cy.get('a:contains("Low")')
        .invoke('attr', 'href')
        .should('equal', '/insights/advisor/recommendations?sort=-total_risk&total_risk=1&reports_shown=true&impacting=true&offset=0&limit=10');

        // Recommendations by category section
        cy.get('a:contains("Availability")')
        .invoke('attr', 'href')
        .should('equal', '/insights/advisor/recommendations?sort=-category&category=1&reports_shown=true&impacting=true&offset=0&limit=10');

        cy.get('a:contains("Stability")')
        .invoke('attr', 'href')
        .should('equal', '/insights/advisor/recommendations?sort=-category&category=3&reports_shown=true&impacting=true&offset=0&limit=10');

        cy.get('a:contains("Performance")')
        .invoke('attr', 'href')
        .should('equal', '/insights/advisor/recommendations?sort=-category&category=4&reports_shown=true&impacting=true&offset=0&limit=10');

        cy.get('a:contains("Security")')
        .invoke('attr', 'href')
        .should('equal', '/insights/advisor/recommendations?sort=-category&category=2&reports_shown=true&impacting=true&offset=0&limit=10');
    });

    it('Check that tooltips display the correct text.', () => {
        cy.get('span[aria-label="Action"]').trigger('mouseenter');
        cy.contains(messages.totalRiskDef.defaultMessage.replace(/<\/?[^>]+(>|$)/g, '')).should('be.visible');
    });

    it('Check that the Advisor recommendations expandable section can be expanded.', () => {
        cy.get('button[id*="Advisor-toggle-button"][aria-expanded="true"]').should('exist');
        cy.get('div[id*="Advisor"]').find('button[class*="pf-m-secondary"]').should('exist');
        cy.get('button[id*="Advisor-toggle-button"]').click();
        cy.get('div[id*="Advisor"]').find('button[class*="pf-m-secondary"]').should('not.exist');
    });

    it('Check that the Recommendations by total risk expandable section can be expanded.', () => {
        cy.get('div[class*="skeleton"]').should('not.exist');
        cy.get('button[id*="advisor-recommendation-by-total-risk-toggle-button"][aria-expanded="true"]').should('exist');
        cy.get('a:contains("Critical")').should('exist');
        cy.get('a:contains("Important")').should('exist');
        cy.get('a:contains("Moderate")').should('exist');
        cy.get('a:contains("Low")').should('exist');
        cy.get('button[id*="advisor-recommendation-by-total-risk-toggle-button"]').click();
        cy.get('a:contains("Critical")').should('not.exist');
        cy.get('a:contains("Important")').should('not.exist');
        cy.get('a:contains("Moderate")').should('not.exist');
        cy.get('a:contains("Low")').should('not.exist');
    });
});
