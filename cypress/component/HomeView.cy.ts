import { mount } from '@cypress/vue';
import HomeView from '../../src/views/HomeView.vue';

describe('HomeView component', () => {
    beforeEach(() => {
        mount(HomeView);
    });

    it('renders the main element', () => {
        // Check if the main container exists
        cy.get('main').should('exist');
    });

    it('renders a navbar with expected links and search bar', () => {
        cy.get('nav').should('exist');
        cy.get('nav a').contains('Dashboard').should('have.attr', 'href', '/dashboard');
        cy.get('nav a').contains('Logout').should('have.attr', 'href', '/logout');
        cy.get('nav input[type="search"]').should('exist');
    });

    it('renders the place details section', () => {
        const classes = ['place-name', 'general-info', 'guide', 'etiquette', 'experience-redirect'];
        classes.forEach(className => {
            cy.get(`.${className}`).should('exist');
        });
    });

    it('renders a google map with markers', () => {
        cy.get('#google-map').should('exist');
        cy.get('#google-map canvas').should('exist'); // canvas is created by google maps
        cy.get('#google-map .gm-style').should('exist'); // gm-style is added by google maps
    });

    
})