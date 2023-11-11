import { User } from '../../src/interfaces/User';

const testUser: User = {
  email: 'testuser@test.com',
  password: 'Test1234',
  full_name: 'John Doe',
  company: 'Test Company',
};

describe('template spec', () => {
  it('open home page', () => {
    cy.visit('http://localhost:5173/');
  });

  it('admin add property manager', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type(Cypress.env('ADMIN_EMAIL'), {
      log: false,
    });
    cy.get('input[name="password"]').type(Cypress.env('ADMIN_PW'), {
      log: false,
    });
    cy.get('button').click();
    cy.url().should('include', '/admin');
    cy.get('.nav-managers').click();
    cy.get('a[href="/admin/managers/add"]').click();
    cy.url().should('include', '/admin/managers/add');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('input[name="full_name"]').type(testUser.full_name);
    cy.get('input[name="company"]').type(testUser.company);
    cy.get('button').click();
    cy.get('#success-ok').click();
    cy.url().should('include', '/admin/managers');
  });

  it('login with test user and modify profile', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button').click();
    cy.url().should('include', '/manager');
    cy.get('.nav-profile').click();
    cy.get('a[href="/manager/profile"]').click();
    cy.url().should('include', '/manager/profile');

    // Modify profile
    cy.get('button').contains('Muokkaa').click();
    testUser.full_name = 'Jack Doe';
    testUser.email = 'jack.doe@test.com';
    testUser.company = 'Modified company';
    testUser.password = 'NewPassword1234';
    cy.get('input[name="full_name"]').clear().type(testUser.full_name);
    cy.get('input[name="email"]').clear().type(testUser.email);
    cy.get('input[name="company"]').clear().type(testUser.company);
    cy.get('input[name="password"]').clear().type(testUser.password);
    cy.get('button').contains('Tallenna').click();
  });

  it('login with modified test user', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button').click();
    cy.url().should('include', '/manager');

    // Remove test user
    cy.get('.nav-profile').click();
    cy.get('a[href="/manager/profile"]').click();
    cy.get('button.delete').click();
  });
});
