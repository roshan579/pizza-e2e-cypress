import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'new-order',
    component: NewOrderComponent,
  },
  {
    path: 'order-status',
    component: OrderStatusComponent,
  },
  { path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
