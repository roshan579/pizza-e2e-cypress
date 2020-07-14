/// <reference types="Cypress" />

import LoginPage from '../PageObjects/LoginPage'
import HeaderPage from '../PageObjects/HeaderPage'
import SideMenuPage from '../PageObjects/SideMenuPage'
import DashboardPage from '../PageObjects/DashboardPage'
import NewOrderPage from '../PageObjects/NewOrderPage'
import StatusPage from '../PageObjects/StatusPage'


Given('User should be able to launch pizza order application', () =>{
    const loginPage = new LoginPage();
    loginPage.launch();
    loginPage.verifyPageLoaded();

    const headerPage = new HeaderPage();
    headerPage.checkHeaderElementsDisplayed();

    return;
});

When('click on {string} side menu item', (content) =>{
    const sideMenuPage = new SideMenuPage();
    sideMenuPage.clickOnSideMenuItem(content);
    return;
});


Then('{string} page is displayed', (content) =>{
    if (content == 'Dashboard') {
        const pageType = new DashboardPage();
        pageType.verifyPage();
    } else if (content == 'New Order') {
        const pageType = new NewOrderPage();
        pageType.verifyPage();
    } else if (content == 'Status') {
        const pageType = new StatusPage();
        pageType.verifyPage();
    }
    return;
});

When('enter the basic information values', () =>{
    const pageType = new NewOrderPage();
    pageType.enterBasicInformationValues();
    return;
});

And('choose the {string}, {string} for the pizza type', (pizzaType, pizzaToppings) =>{
    const pageType = new NewOrderPage();
    pageType.chooseThePizzaTypeAndToppings(pizzaType, pizzaToppings);
    return;
   
});

Then('verify the summary section details', () =>{
    const pageType = new NewOrderPage();
    pageType.verifyTheNewOrderSummarySectionDetails();
    return;
});


And('verify the total values displayed', () =>{
    const pageType = new NewOrderPage();
    pageType.verifyTotalValueDisplayed();
    return;
});

When ('click on place order button', () =>{
    const pageType = new NewOrderPage();
    pageType.clickOnPlaceOrderButton();
    return;
});

And ('perform action {string} on status page for the order placed', (actionType) =>{
    const pageType = new StatusPage();
    pageType.performActionOnStatusPageForTheOrderPlaced(actionType);
    return;
});









