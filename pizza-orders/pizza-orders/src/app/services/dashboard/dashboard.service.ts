import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private API = GlobalVariables.API;

  constructor(private httpClient: HttpClient) { }

  public getDashboard(): Observable<any> {
    const url = this.API + '/api/dashboard';
    return this.httpClient.get(url);
  }

}
