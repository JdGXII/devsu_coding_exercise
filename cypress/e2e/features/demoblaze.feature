Feature: Demoblaze website automation

  Scenario: Add two products to the shopping cart and complete the purchase
    Given a user is logged in on "https://www.demoblaze.com/index.html"
    When the user adds a random product to the cart
    And the user goes back to the home page
    And the user adds another random product to the cart
    When the user completes the purchase
    Then a success message should be visible
