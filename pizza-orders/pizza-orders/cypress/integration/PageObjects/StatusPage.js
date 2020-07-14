class StatusPage {

    verifyPage(){
        expect(cy.get('[class=table-summary]'));
        cy.request("GET", "http://localhost:5000/api/orders").then((response) => {
            expect(response).to.have.property('status', 200);
            const jsonResponse = JSON.stringify(response.body);
            cy.wrap(jsonResponse).as("ordersResponse");
        });
    }

    performActionOnStatusPageForTheOrderPlaced(actionType){

        let json;
        cy.get('@ordersResponse').then(elements => {
            json = elements;
        });

        cy.get("@addressContext").then(elements => {
            var addresssContext = String(elements);
            if(actionType == 'Accept'){
                cy.contains(addresssContext).parent().find('span[class="accept"]').click();
                expect(cy.contains(addresssContext).parent().find('span[class="accepted"]').contains("Accepted"));
            } else if(actionType == 'Cancel'){
                cy.contains(addresssContext).parent().find('span[class="cancel"]').click();
                expect(cy.contains(addresssContext).parent().find('span[class="canceled"]').contains("Cancelled"));
            } else if(actionType == 'Mark as Completed'){
                cy.contains(addresssContext).parent().find('span[class="accept"]').click();
                expect(cy.contains(addresssContext).parent().find('span[class="accepted"]').contains("Accepted"));
                cy.contains(addresssContext).parent().find('div[class="table-col mark-completed"]').click();
                expect(cy.contains(addresssContext).parent().find('span[class="completed"]').contains("Completed"));
            }
        });
    }



}
    
export default StatusPage
    
    
    
    
    
    
    
    
    
    
    