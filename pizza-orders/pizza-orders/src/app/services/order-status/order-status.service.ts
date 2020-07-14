import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from '../../global';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  private API = GlobalVariables.API;

  constructor(private httpClient: HttpClient) { }

  public getOrders(): Observable<any> {
    const url = this.API + '/api/orders';
    return this.httpClient.get(url);
  }

  public updateOrder(order: Order): Observable<any> {
    const url = this.API + '/api/orders/update/${order.id}';
    return this.httpClient.put(url, order);
  }
}
