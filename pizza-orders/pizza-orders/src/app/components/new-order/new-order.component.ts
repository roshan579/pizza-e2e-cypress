import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/orders/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Size } from '../../models/size';
import { Topping } from '../../models/topping';
import { Pizza } from '../../models/pizza';
import { Order } from '../../models/order';

import * as moment from 'moment';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  pizza: Pizza;
  pizzas: Array<Pizza> = [];
  orderedPizzas: Array<Pizza> = [];

  public userForm: FormGroup;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
   this.getPizzas();

   this.userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required]
  });
  }

  public getPizzas(): void {
    this.orderService.getPrices().subscribe(
      res => {
        this.pizza = res;
        this.pizzas.push(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  public selectSize(pizza: Pizza, size: Size): void {
    pizza.sizes.map((s: Size) => {
      s.selected = false;
    });
    size.selected = true;
  }

  public selectToppings(topping: Topping): void {
    topping.selected = !topping.selected;
  }

  public addPizza(): void {
    const pizzaSizes = this.pizza.sizes.map(p => Object.assign({}, p));
    const pizzaToppings = this.pizza.toppings.map(p => Object.assign({}, p));
    pizzaSizes.map((s) => { s.selected = false; });
    pizzaToppings.map((t) => { t.selected = false; });
    const pizza = {
      sizes: pizzaSizes,
      toppings: pizzaToppings
    };
    this.pizzas.push(pizza);
  }

  public removePizza(i: number): void {
    if (this.pizzas.length !== 1) {
      this.pizzas.splice(i, 1);
    }
  }

  public getOrderedPizzas(): Array<Pizza> {
    const selectedPizzas = [];
    for (const pizza of this.pizzas) {
      const selectedSize = pizza.sizes.filter(s => s.selected);
      const selectedToppings = pizza.toppings.filter(t => t.selected);
      selectedPizzas.push({
        sizes: selectedSize,
        toppings: selectedToppings
      });
    }
    return selectedPizzas;
  }

  public paintDots(num: number): string {
    return '.'.repeat(num);
  }

  public addTotal(): number {
    let total = 0;
    this.getOrderedPizzas().map((pizza) => {
      if (pizza.sizes[0]) {
        total += pizza.sizes[0].price;
      }
      if (pizza.toppings) {
        pizza.toppings.map((topping) => {
          total += topping.price;
        });
      }
    });
    return total;
  }
  public calculateTotal(): string {
    const total = this.addTotal();
    return 'GBP ' + total.toFixed(2);
  }

  public isOrderEmpty(): boolean {
    let empty = false;
    this.getOrderedPizzas().map((pizza) => {
      empty = !pizza.sizes.length && !pizza.toppings.length ? true : false;
    });
    if (empty || this.userForm.status === 'INVALID') {
      return true;
    } else {
      return false;
    }
  }

  public placeOrder(): void {
    const randomId = Math.random().toString(36).slice(2, 9).toUpperCase();
    if (!this.isOrderEmpty()) {
      const order: Order = {
        id: randomId,
        address: this.userForm.value.address,
        time: moment().format(),
        accepted: false,
        transit: false,
        completed: false,
        canceled: false,
        total: this.addTotal()
      };

      this.orderService.saveOrder(order).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
      this.pizzas.splice(1, this.pizzas.length - 1);
      this.pizzas[0].sizes.map((size) => {
        size.selected = false;
      });
      this.pizzas[0].toppings.map((topping) => {
        topping.selected = false;
      });
      this.userForm.reset();
      this.isOrderEmpty();
      alert('Order Saved!');
    }
  }
}
