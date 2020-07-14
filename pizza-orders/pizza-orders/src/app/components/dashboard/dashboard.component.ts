import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Dashboard } from '../../models/dashboard';
import { OrderStatusService } from '../../services/order-status/order-status.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard;
  orderStatus: Array<Order>;

  constructor(
    private dashboardService: DashboardService,
    private orderStatusService: OrderStatusService
  ) { }

  ngOnInit() {
    this.dashboardService.getDashboard().subscribe(
      res => { this.dashboard = res; }
    );

    this.orderStatusService.getOrders().subscribe(
      res => {
        this.orderStatus = res.orders;
        this.updateDashboardStatus();
        this.updateDashboardSales();
      }
    );
  }

  public updateDashboardStatus(): void {
    let len = 0;
    this.orderStatus.map((order) => {
      if (!order.canceled) {
        len++;
      }
    });
    this.dashboard.status.total = this.dashboard.status.total + len;
  }

  public updateDashboardSales(): void {
    let newSales = 0;
    this.orderStatus.map((order) => {
      if (order.total && !order.canceled) {
        newSales += order.total;
      }
    });
    this.dashboard.sales.total = this.dashboard.sales.total + newSales;
  }
}
