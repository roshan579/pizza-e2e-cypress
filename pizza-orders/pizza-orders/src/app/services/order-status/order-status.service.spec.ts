import { TestBed } from '@angular/core/testing';

import { OrderStatusService } from './order-status.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('OrderStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, HttpClientModule ]
  }));

  it('should be created', () => {
    const service: OrderStatusService = TestBed.get(OrderStatusService);
    expect(service).toBeTruthy();
  });
});
