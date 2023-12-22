const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

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
  cy.get('#navbarExample > ul > li:nth-child(1) > a');
});

When('the user completes the purchase', () => {
  cy.get('.btn.btn-success[data-target="#orderModal"]').click();
  cy.get('#name').focus().clear().type("Test User", { delay: 100 });
  cy.get('#country').focus().clear().type("Peru", { delay: 100 });
  cy.get('#city').focus().clear().type("Peru", { delay: 100 });
  cy.get('#card').focus().clear().type( Math.floor(Math.random() * 10000), { delay: 100 });
  cy.get('#month').focus().clear().type("12", { delay: 100 });
  cy.get('#year').focus().clear().type("24", { delay: 100 });
  cy.get('button[onclick="purchaseOrder()"]').click();
});

Then('a success message should be visible', () => {
  cy.get('#navbarExample > ul > li:nth-child(1) > a');
});

