import { formUrl } from '../../environments';
import { FORM_DATA, QUESTION_SETS } from '../../config';

describe('Google Form Automation', () => {
  const getRandomItem = (array) =>
    array[Math.floor(Math.random() * array.length)];

  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const selectRadioOption = (questionText, value) => {
    cy.get(`[aria-label="${questionText}"][role="radiogroup"]`)
      .find(`[data-value="${value}"][role="radio"]`)
      .should('be.visible')
      .click();
  };

  const answerQuestionSet = (questions, minValue = 3, maxValue = 5) => {
    questions.forEach((question) => {
      const randomValue = getRandomNumber(minValue, maxValue);
      selectRadioOption(question, randomValue);
      cy.wait(500);
    });
  };

  it('should fill out the form', () => {
    cy.visit(formUrl);

    cy.get(`[aria-label="${getRandomItem(FORM_DATA.genders)}"]`).click();
    cy.get(`[aria-label="${getRandomItem(FORM_DATA.ageOptions)}"]`).click();
    cy.get(
      `[aria-label="${getRandomItem(FORM_DATA.educationOptions)}"]`
    ).click();
    cy.get(
      `[aria-label="${getRandomItem(FORM_DATA.employmentOptions)}"]`
    ).click();
    cy.get(`[aria-label="${getRandomItem(FORM_DATA.incomeOptions)}"]`).click();

    cy.get('.uArJ5e.UQuaGc.YhQJj.zo8FOc.ctEux').should('be.visible').click();
    cy.wait(2000);

    const questions = [0, 1, 2, 3, 4];
    questions.forEach((questionIndex) => {
      const randomValue = getRandomNumber(4, 5);
      cy.get(
        `[data-field-index="${questionIndex}"][data-value="${randomValue}"][role="radio"]`
      )
        .first()
        .should('be.visible')
        .click();
    });
    cy.wait(1000);

    answerQuestionSet(QUESTION_SETS.influencer);
    answerQuestionSet(QUESTION_SETS.socialMedia, 4, 5);
    answerQuestionSet(QUESTION_SETS.customerService, 4, 5);
    answerQuestionSet(QUESTION_SETS.final, 4, 5);

    cy.get('div[role="button"][jsname="M2UYVd"]').should('be.visible').click();
  });
});
