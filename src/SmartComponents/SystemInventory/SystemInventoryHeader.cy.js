import React, { Suspense } from 'react';
import SystemInventoryHeader from './SystemInventoryHeader';
import Loading from '../../PresentationalComponents/Loading/Loading';

import { hostsInterceptors, edgeInterceptors, unleashInterceptors } from '../../../cypress/support/interceptors';
import { BrowserRouter } from 'react-router-dom';

before(() => {
    cy.mockWindowChrome();
});

const ComponentForMount = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={ <Loading /> }>
                <SystemInventoryHeader />
            </Suspense>);
        </BrowserRouter>
    );
};

describe('Dashboard', () => {
    beforeEach(() => {
        hostsInterceptors.successful();
        edgeInterceptors.successful();
        unleashInterceptors.successful();
        cy.mountWithContext(ComponentForMount);
    });
    it('renders correct total with edge hosts', () => {
        cy.get('span[class="insd-c-dashboard__number-data--lg"]').should('have.text', '630');
    });
    it('the amount of stale systems to remove is correct', () => {
        cy.get('div[class="insd-c-dashboard__info-inline  insd-m-padding-top"]').eq(1).should('have.text', '630 systems to be removed');
    });
});
