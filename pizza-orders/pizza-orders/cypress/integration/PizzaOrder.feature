Feature: Pizza Order

  User Should be able to create update and accept pizza orders

  @TC01_PizzaOrderE2ETest
  Scenario Outline: do pizza order end to end with create accept and complete actions
    Given User should be able to launch pizza order application
    When click on "New Order" side menu item
    Then "New Order" page is displayed
    When enter the basic information values
    And choose the "<Pizza Type>", "<Pizza Toppings>" for the pizza type
    Then verify the summary section details
    And verify the total values displayed
    When click on place order button
    When click on "Status" side menu item
    Then "Status" page is displayed
    And perform action "<Action Type>" on status page for the order placed

    Examples:

      | Pizza Type         | Pizza Toppings                                                     | Action Type                        |
      | Medium:Large:Small | Olive,Onion:Mushroom,Olive,Sweetcorn:Onion,Tomatoe,Basil           | Mark as Completed                  |
      | Medium:Large:Small | Olive,Onion:Mushroom,Olive,Sweetcorn:Onion,Tomatoe,Basil           | Mark as Completed                  |
      | Medium:Large:Small | Olive:Mushroom,Olive,Sweetcorn:Onion,Tomatoe,Basil                 | Mark as Completed                  |
      | Large:Medium:Small | Olive:Olive:Onion,Tomatoe,Basil                                    | Mark as Completed                  |
      | Large:Medium:Small | Olive:Mushroom,Olive,Onion:Onion,Tomatoe,Basil                     | Mark as Completed                  |
      | Large:Medium:Small | Pepperoni,Sweetcorn,Olive:Mushroom,Olive,Onion:Onion,Tomatoe,Basil | Accept                             |
      | Large:Medium:Small | Pepperoni,Sweetcorn,Olive:Mushroom,Olive,Onion:Onion,Tomatoe,Basil | Cancel                             |
      | Medium:Small:Large | Pepperoni,Sweetcorn,Olive:Mushroom,Olive,Onion:Onion,Tomatoe,Basil | Accept                             |
      | Small:Large:Medium | Pepperoni,Sweetcorn,Olive:Mushroom,Olive,Onion:Onion,Tomatoe,Basil | Cancel                             |
      | Medium:Small       | Pepperoni,Sweetcorn,Basil:Mushroom,Olive,Onion                     | Accept                             |
      | Large:Medium       | Pepperoni,Sweetcorn:Mushroom,Olive,Onion                           | Cancel                             |
      | Medium:Large       | Pepperoni,Sweetcorn:Mushroom,Olive,Onion                           | Accept                             |





