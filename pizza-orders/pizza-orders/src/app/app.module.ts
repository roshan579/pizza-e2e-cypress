import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OrderService } from './services/orders/order.service';
import { OrderStatusService } from './services/order-status/order-status.service';
import { DashboardService } from './services/dashboard/dashboard.service';

import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';

import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    NewOrderComponent,
    OrderStatusComponent,
    DoughnutChartComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    OrderService,
    OrderStatusService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
