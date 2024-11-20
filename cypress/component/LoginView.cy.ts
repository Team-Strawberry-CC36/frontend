import { mount } from '@cypress/vue'
import LoginView from '../../src/views/LoginView.vue';

describe('LoginView Component', () => {
    beforeEach(() => {
        mount(LoginView);
    });

    it('renders the login form correctly', () => {
        // Check if the main container exists
        cy.get('main').should('exist');

        // Verify the layout elements
        cy.contains('Login with Username').should('exist')
        cy.get('input').should('have.length', 2); // Two input fields
        cy.contains('Login').should('exist');
        cy.contains('Alternative Login').should('exist');

        // Check for the SVG line
        cy.get('svg line').should('exist')
            .and('have.attr', 'x1', '0')
            .and('have.attr', 'x2', '300');
    });

    it('allows the user to input values and submit', () => {
        const username = 'testUser';
        const password = 'testPassword';

        // Type into the input fields
        cy.get('input').first().type(username).should('have.value', username);
        cy.get('input').eq(1).type(password).should('have.value', password);

        // Click the login button
        cy.contains('Login').click();
    });

});