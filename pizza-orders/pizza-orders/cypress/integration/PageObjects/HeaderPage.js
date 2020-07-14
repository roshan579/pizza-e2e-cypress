class HeaderPage {

    checkHeaderElementsDisplayed()
    {
        expect(cy.get('[class^=logo-img]'));
        cy.get('[class^=name] > div').as('headerNames');
        expect(cy.get('@headerNames').should('have.length', 2));
        cy.get('@headerNames').then((headerNames) => {
            // get the header name elements
            cy.get(headerNames[0]).contains('Pizza');
            cy.get(headerNames[1]).contains('Manager');
        })
        expect(cy.get('[src="/assets/img/chat.svg"]'));
        expect(cy.get('[src="/assets/img/notification.svg"]'));
        expect(cy.get('[src="/assets/img/help.svg"]'));  
    }
        
}
        
export default HeaderPage
    