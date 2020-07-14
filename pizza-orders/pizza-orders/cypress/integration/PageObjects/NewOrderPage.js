class NewOrderPage {

    verifyPage(){
        expect(cy.get('[class=basic-information]'));
        cy.request("GET", "http://localhost:5000/api/prices").then((response) => {
            expect(response).to.have.property('status', 200);
            const jsonResponse = JSON.stringify(response.body);
            cy.wrap(jsonResponse).as("pricesResponse");
        });
    }

    enterBasicInformationValues(){
        const faker = require('faker');
        cy.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
        cy.get('[formcontrolname=name]').type(faker.name.findName());
        cy.get('[formcontrolname=email]').type(faker.internet.email());
        const address = faker.address.streetAddress();
        cy.get('[formcontrolname=address]').type(address);
        cy.wrap(address).as("addressContext");
        cy.get('[formcontrolname=phone]').type(faker.phone.phoneNumber().substring(0, 10));
    }

    chooseThePizzaTypeAndToppings(pizzaType, pizzaToppings){
        expect(pizzaType).to.be.not.null;
        expect(pizzaType).to.be.not.empty;
        
        let pizzaTypesList = String(pizzaType).split(":", 1000);
        cy.wrap(pizzaTypesList).as("pizzaTypesList");

        let pizzaToppingsList = new Array(pizzaTypesList.length);
        let pizzaWiseToppingsList;
        if(pizzaToppings.length > 0){
            pizzaWiseToppingsList = String(pizzaToppings).split(":", 1000);
        }
        
        for (let i = 0; i < pizzaTypesList.length; i++) {
            if (i != 0) {
                cy.get('[class="btn add-pizza"]').click();
            } 

            let choosePizzaType = String(pizzaTypesList[i]);
            cy.get('[class="pizza-size"]').find('div[class="btns-grid size"]').each(($el, elIdx, $list) => {
                if (elIdx == parseInt(i)){
                    cy.wrap($el).find('button').each(($subEl, elSubIdx, $sublist) => {
                        if ($subEl.text().trim() == choosePizzaType){
                            cy.wrap($subEl).click();
                            return false;
                        } 
                    });
                    return false;
                } 
            });

            let toppingWiseList = new Array(0);
            if(pizzaWiseToppingsList.length > 0){
                let toppingListString = String(pizzaWiseToppingsList[i]);
                if (toppingListString.length > 0) {
                    let toppingWiseListLength = toppingListString.split(",", 1000).length;
                    toppingWiseList = new Array(toppingWiseListLength);
                    if (toppingWiseList.length > 0) {
                        for (let t = 0; t < toppingWiseList.length; t++) {
                            let topping = String(toppingListString.split(",", 1000)[t]);
                            if (topping.length > 0) {
                                toppingWiseList[t] = topping;
                                cy.get('[class="pizza-toppings"]').find('div[class="btns-grid toppings"]').each(($tel, telIdx, $tlist) => {
                                    if (telIdx == parseInt(i)){
                                        cy.wrap($tel).find('button').each(($tsubEl, telSubIdx, $tsublist) => {
                                            if ($tsubEl.text().trim() == topping){
                                                cy.wrap($tsubEl).click();
                                                return false;
                                            } 
                                        });
                                        return false;
                                    } 
                                });
                            }
                        }
                    }
                }
            }
            pizzaToppingsList[i] = new Array(toppingWiseList.length);
            for (let pt = 0; pt < toppingWiseList.length; pt++) { 
                pizzaToppingsList[i][pt] = toppingWiseList[pt]; 
            } 
        }
        cy.wrap(pizzaToppingsList).as("pizzaToppingsList");
    }

   

    verifyTheNewOrderSummarySectionDetails(){
        
        let pizzaTypesList;
        cy.get('@pizzaTypesList').then(elements => {
            pizzaTypesList = new Array(elements.length);
            for(let i=0;i<elements.length;i++){
                pizzaTypesList[i] = String(elements[i]).split(",", 1000);
            }
        });
        cy.get('[class="size-chosen"]').find('div[class="sum-label left"]').each(($el, elIdx, $list) => {
            let pizzaChosen = String($el.text().trim());
            let expected = String(pizzaTypesList[elIdx]);
            expect(pizzaChosen).contains(expected);
        });

        let json;
        cy.get('@pricesResponse').then(elements => {
            json = elements;
        });
        
        var pizzaTotal = 0;
        cy.get('[class="price"]').find('div[class="sum-label right"]').each(($el, elIdx, $list) => {
            let pizzaTypePrice = String($el.text().trim());
            let objSizes = JSON.parse(json).sizes;
            for(let i=0;i<objSizes.length;i++){
                if(String(objSizes[i].name) == pizzaTypesList[elIdx]){
                    let price = objSizes[i].price;
                    pizzaTotal = pizzaTotal + parseFloat(price);
                    expect(pizzaTypePrice).contains(String(price));
                    break;
                }
            }
            cy.wrap(pizzaTotal).as("pizzaTotal");
        });


        var toppingsList = new Array(0);
        cy.get('@pizzaToppingsList').then(elements => {
            toppingsList = new Array(elements.length);
            for(let i=0;i<elements.length;i++){
                let temp = String(elements[i]).split(",", 1000);
                toppingsList[i] = new Array(temp.length);
                for (let pt = 0; pt < temp.length; pt++) { 
                    toppingsList[i][pt] = temp[pt]; 
                } 
            }
        });

        var summaryToppingsList = new Array(toppingsList.length);
        cy.get('[class="size-chosen"]').find('div[class="toppings-chosen"]').each(($el, elIdx, $list) => {
            summaryToppingsList = new Array(toppingsList.length);
            summaryToppingsList[elIdx] = new Array(0);
            cy.wrap($el).find('ul > li').then(listing => {
                if(listing.length > 0){
                    summaryToppingsList[elIdx] = new Array(listing.length);
                    cy.get($el).find('ul > li').each(($subel, subelIdx, $sublist) => {
                        let topping = String($subel.text().trim());
                        let subArray = Array.from(toppingsList[elIdx]);
                        summaryToppingsList[elIdx][subelIdx] = topping;
                        expect(subArray.includes(topping));
                    });
                }
            });
        });

        let toppingsTotal = 0;
        cy.get('[class="price"]').find('div[class="toppings-chosen"]').each(($el, elIdx, $list) => {
            cy.wrap($el).find('ul > li').then(listing => {
                if(listing.length > 0){
                    cy.get($el).find('ul > li').each(($subel, subelIdx, $sublist) => {
                        let toppingPrice = String($subel.text().trim());
                        let objToppings = JSON.parse(json).toppings;
                        for(let i=0;i<objToppings.length;i++){
                            if(String(objToppings[i].name) == summaryToppingsList[elIdx][subelIdx]){
                                let price = objToppings[i].price;
                                expect(toppingPrice).contains(String(price));
                                break;
                            }
                        }
                        toppingsTotal = toppingsTotal + parseFloat(toppingPrice);
                        cy.wrap(toppingsTotal).as("toppingsTotal");
                    });
                }
            });
        });
    }

    verifyTotalValueDisplayed(){
        let grandTotal = 0;
        cy.get('@pizzaTotal').then(elements => {
            grandTotal = grandTotal + parseFloat(elements);
            cy.get('@toppingsTotal').then(elements => {
                grandTotal = grandTotal + parseFloat(elements);
                expect(cy.get('[class="total-price"]').contains(String(grandTotal)));
            });
        });
    }

    clickOnPlaceOrderButton(){
        cy.get('[class^="btn order-btn').click();
    }

    
}
    
export default NewOrderPage
    
    
    
    
    
    
    
    
    
    
    