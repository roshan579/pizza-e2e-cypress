class SideMenuPage {

    clickOnSideMenuItem(menuItem)
    {
        cy.get('[class=sidebar-list] > li > a').each(($el, index, $list) => {
            if ($el.text().trim() == menuItem){
                cy.wrap($el).click();
            } 
        });
    }
        
}
        
export default SideMenuPage
    