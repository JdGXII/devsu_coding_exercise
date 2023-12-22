const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');
import {faker} from '@faker-js/faker';

Given('a user navigates to {string}', (url) => {
  cy.visit(url);
});

When('the user adds a random product to the cart', () => {
  clickOnProductRandomLink();
  addProductAndGoToCart();
});

And('the user adds another random product to the cart', () => {
  clickOnProductRandomLink();
  addProductAndGoToCart();
});

const clickOnProductRandomLink = () => {
  // Get all the links inside the container with the "href" attribute
  cy.get('#tbodyid a[href]').then((links) => {
    // Convert the links into an array
    const linkArray = links.toArray();

    // Get a random index between 0 and the number of links - 1
    const randomIndex = Math.floor(Math.random() * linkArray.length);

    // Click on the random link from the array
    cy.wrap(linkArray[randomIndex]).click();
  });
}

const addProductAndGoToCart = () => {
  cy.get('a.btn.btn-success.btn-lg').click();
  cy.get('#cartur').click();
}

And('the user goes back to the home page', () => {
  cy.get('#navbarExample > ul > li:nth-child(1) > a').click();
});

When('the user completes the purchase', () => {
  cy.get('.btn.btn-success[data-target="#orderModal"]').click();
  cy.get('#name').focus().clear().type(faker.person.fullName(), { delay: 100 });
  cy.get('#country').focus().clear().type(faker.location.country(), { delay: 100 });
  cy.get('#city').focus().clear().type(faker.location.city(), { delay: 100 });
  cy.get('#card').focus().clear().type( faker.finance.creditCardNumber(), { delay: 100 });
  cy.get('#month').focus().clear().type(faker.date.month(), { delay: 100 });
  cy.get('#year').focus().clear().type(faker.date.future().getFullYear(), { delay: 100 });
  cy.get('button[onclick="purchaseOrder()"]').click();
});

Then('a success message should be visible', () => {
  cy.get('#navbarExample > ul > li:nth-child(1) > a');
});

