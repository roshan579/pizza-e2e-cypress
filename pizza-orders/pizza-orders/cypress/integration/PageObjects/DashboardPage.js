class DashboardPage {

    verifyPage(){
        expect(cy.get('[class=dashboard] > div'));
        cy.request("GET", "http://localhost:5000/api/dashboard").then((response) => {
            expect(response).to.have.property('status', 200);
            const jsonResponse = JSON.stringify(response.body);
            cy.wrap(jsonResponse).as("dashboardResponse");
        });
    }
    
}
    
export default DashboardPage
    
    
    
    
    
    
    
    
    
    
    