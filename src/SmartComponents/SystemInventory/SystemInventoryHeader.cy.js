import React, { Suspense } from 'react';
import SystemInventoryHeader from './SystemInventoryHeader';
import Loading from '../../PresentationalComponents/Loading/Loading';

import { hostsInterceptors } from '../../../cypress/support/interceptors';
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
        cy.mountWithContext(ComponentForMount);
    });
    it('the amount of stale systems is correct', () => {
        cy.get('div[class="insd-c-dashboard__info-inline  insd-m-padding-top"]').eq(0).should('have.text', '630 stale systems');
    });
    it('the amount of stale systems to remove is correct', () => {
        cy.get('div[class="insd-c-dashboard__info-inline  insd-m-padding-top"]').eq(1).should('have.text', '630 systems to be removed');
    });
});
