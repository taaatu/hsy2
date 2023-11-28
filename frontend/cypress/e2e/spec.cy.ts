import { Question } from '../../src/interfaces/Question';
import { User } from '../../src/interfaces/User';
import { testQuestions, testSurveyHeader } from './Data';

const APP_URL = 'http://localhost:5173/';

const testUser: User = {
  email: 'testuser@test.com',
  password: 'Test1234',
  full_name: 'John Doe',
  company: 'Test Company',
};

const adminLogin = () => {
  cy.visit(APP_URL);
  cy.get('#login-link').click();

  cy.get('input[name="email"]').type(Cypress.env('ADMIN_EMAIL'), {
    log: false,
  });
  cy.get('input[name="password"]').type(Cypress.env('ADMIN_PW'), {
    log: false,
  });
  cy.get('button').click();
  cy.url().should('include', '/admin');
};

describe('template spec', () => {
  it('open home page', () => {
    cy.visit(APP_URL);
  });

  it('admin add property manager', () => {
    adminLogin();
    cy.get('.nav-managers').click();
    cy.get('#add-managers-link').click();
    cy.url().should('include', '/admin/managers/add');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('input[name="full_name"]').type(testUser.full_name);
    cy.get('input[name="company"]').type(testUser.company);
    cy.get('button').click();
    cy.get('#success-ok').click();
    cy.url().should('include', '/admin/managers');
  });

  const addQuestion = (index: number, question: Question) => {
    if (index > 0) {
      cy.get('#add-question-btn').click();
    }
    const card = cy.get(`#question-${index + 1}`);
    card.find('textarea[id="question"]').type(question.question!);
    cy.get(`#question-${index + 1}-option-1`)
      .clear()
      .type(question.option_1!);
    cy.get(`#question-${index + 1}-option-2`)
      .clear()
      .type(question.option_2!);
    cy.get(`#question-${index + 1}-option-3`)
      .clear()
      .type(question.option_3!);
  };

  it('Admin create new survey', () => {
    adminLogin();
    cy.get('.nav-surveys').click();
    cy.get('#create-survey-link').click();
    cy.get('input[id="survey-title"]').type(testSurveyHeader.survey_title!);
    cy.get('input[id="end-time"]').type(testSurveyHeader.end_time!);
    cy.get('textarea[id="survey-description"]').type(
      testSurveyHeader.description!
    );
    cy.get('button').contains('Kysymykset').click();
    testQuestions.forEach((question, index) => {
      addQuestion(index, question);
    });
    cy.get('button').contains('Luo kysely').click();
    cy.get('#create-survey-btn').click();
  });

  it('login with test user and modify profile', () => {
    cy.visit(APP_URL);
    cy.get('#login-link').click();
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button').click();
    cy.url().should('include', '/manager');
    cy.get('.nav-profile').click();
    cy.get('#profile-link').click();
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
    cy.visit(APP_URL);
    cy.get('#login-link').click();
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button').click();
    cy.url().should('include', '/manager');

    // Remove test user
    cy.get('.nav-profile').click();
    cy.get('#profile-link').click();
    cy.get('button.delete').click();
  });

  it('admin delete test survey', () => {
    adminLogin();
    cy.get('.nav-surveys').click();
    cy.get('#surveys-link').click();
    cy.url().should('include', '/admin/surveys');
    cy.get('.search-bar').type(testSurveyHeader.survey_title!);
    cy.get('#survey-title').should('contain', testSurveyHeader.survey_title!);
    cy.get('button').contains('Siirry').click();
    cy.get('h1').should('have.text', testSurveyHeader.survey_title!);
    cy.get('button.delete').click();
    cy.get('.search-bar').type(testSurveyHeader.survey_title!);
    cy.get('#survey-title').should('not.exist');
  });
});
