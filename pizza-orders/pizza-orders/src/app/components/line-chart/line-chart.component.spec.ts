import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartComponent } from './line-chart.component';
import { ChartsModule } from 'ng2-charts';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LineChartComponent],
      imports: [ChartsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    component.history = {
      statu: {
        total: 150,
        delivered: 120,
        pending: 30
      },
      sales: {
        total: '14,543',
        currency: 'USD'
      },
      history: {
        labels: [
          ,
          '08 AM',
          '11 AM',
          '01 PM',
          '03 PM',
          '04 PM',
          '06 PM',
          '08 PM',
          '10 PM',
        ],
        data: [25, 20, 30, 25, 35, 20, 30, 25, 35, 30]
      },
      report: {
        ontime: '+29.7%',
        late: '53.4%',
        performance: '+0.05%'
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
