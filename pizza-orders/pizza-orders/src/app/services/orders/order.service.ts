import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from '../../global';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private API = GlobalVariables.API;

  constructor(private httpClient: HttpClient) { }

  public getPrices(): Observable<any> {
    const url = this.API + '/api/prices';
    return this.httpClient.get(url);
  }

  public saveOrder(order: Order): Observable<any> {
    const url = this.API + '/api/orders/add';
    return this.httpClient.post(url, order);
  }

}
