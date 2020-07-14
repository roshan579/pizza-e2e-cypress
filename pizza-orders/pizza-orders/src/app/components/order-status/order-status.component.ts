import { Component, OnInit } from '@angular/core';
import { OrderStatusService } from '../../services/order-status/order-status.service';
import { Order } from '../../models/order';

import * as moment from 'moment';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  orders: Array<Order>;
  inventory: any;

  constructor(private orderStatusService: OrderStatusService) { }

  ngOnInit() {
    this.inventory = {
      completed: 326,
      pending: 581,
      cancelled: 129
    };

    this.orderStatusService.getOrders().subscribe(
      res => {
        const now = moment(new Date());
        this.orders = res.orders;
        this.orders.map((order) => {
          order._duration = now.diff(order.time, 'minutes');
          if (order.canceled) {
            this.inventory.cancelled++;
          } else if (order.completed) {
            this.inventory.completed++;
          } else {
            this.inventory.pending++;
          }
        });
      },
      err => {
        console.log(err);
      }
    );

  }

  public isNewOrder(order: Order): boolean {
    return !order.accepted && !order.transit &&
      !order.completed && !order.canceled;
  }

  public accept(order: Order): void {
    order.accepted = true;
    this.updateOrder(order);
  }

  public cancel(order: Order): void {
    order.canceled = true;
    this.inventory.cancelled++;
    this.inventory.pending--;
    this.updateOrder(order);
  }

  public markCompleted(order: Order): void {
    order.completed = true;
    this.inventory.completed++;
    this.inventory.pending--;
    this.updateOrder(order);
  }

  public printSummary(): void {
    window.print();
  }

  public getTotalInventory(): void {
    const inv = this.inventory;
    return 1508 + inv.completed + inv.pending + inv.cancelled;
  }

  public updateOrder(order: Order): void {
    this.orderStatusService.updateOrder(order).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
