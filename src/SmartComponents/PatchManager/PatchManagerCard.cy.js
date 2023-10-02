import React, { Suspense } from 'react';
import PatchManagerCard from './PatchManagerCard';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { patchInterceptors } from '../../../cypress/support/interceptors';

before(() => {
    cy.mockWindowChrome();
});

const defaultValues = {
    categoryTypes: [
        { name: 'Security advisories', value: '1033' },
        { name: 'Bug fixes', value: '2235' },
        { name: 'Enhancements', value: '343' }
    ]
};

const MountVulnerabilityCard = () => {
    return (
        <Suspense fallback={ <Loading /> }>
            <PatchManagerCard />
        </Suspense>
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

    defaultValues.categoryTypes.forEach((type, index) => {
        it(`metric ${type.name} is correct`, () => {
            cy.get('span.insd-c-legend__text').eq(index).should('contain', type.name).and('contain', type.value);
        });
    });
});
