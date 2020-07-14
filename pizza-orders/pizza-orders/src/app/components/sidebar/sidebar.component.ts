import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public sidebar: Array<object>;

  constructor() { }

  ngOnInit() {
    this.sidebar = [
      {
        name: 'Dashboard',
        icon: 'dashboard.svg',
        url: 'dashboard',
      },
      {
        name: 'New Order',
        icon: 'new-order.svg',
        url: 'new-order',
      },
      {
        name: 'Status',
        icon: 'order-status.svg',
        url: 'order-status',
      }
    ]
  }

}
