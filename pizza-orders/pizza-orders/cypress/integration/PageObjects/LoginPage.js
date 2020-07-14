class LoginPage {

    launch(){
        cy.visit("/");
    }

    verifyPageLoaded(){
        expect(cy.get('[class=right-nav]'));
        expect(cy.get('[class=content]'));
        expect(cy.get('[class=sidebar-list] > li'));
        expect(cy.get('[class=dashboard] > div'));
    }

}

export default LoginPage










