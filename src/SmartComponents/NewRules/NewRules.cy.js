import NewRules from './NewRules';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { hostsInterceptors } from '../../../cypress/support/interceptors';

before(() => {
    cy.mockWindowChrome();
});

describe('New Rules component renders', () => {
    beforeEach(() => {
        hostsInterceptors.successful();
        cy.mountWithContext(NewRules, Loading);
    });
    it('the amount of stale systems is correct', () => {
        cy.get('div[class="pf-l-flex pf-m-space-items-md pf-m-align-items-center pf-m-nowrap"]').eq(0)
        .should('have.text', 'Latest critical notifications on your systems');
    });
});
