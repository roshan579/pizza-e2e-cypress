import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() history: any;

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        position: 'top',
        display: true,
        gridLines: {
          display: true,
          zeroLineColor: '#f1f1f1',
          drawBorder: false,
          color: '#f1f1f1'
        },
        ticks: {
          backdropPaddingX: 1000
        }
      }],
      yAxes: [{
        display: false,
        ticks: {
          beginAtZero: true,
          max: 50
        }
      },
    ]
    },
    layout: {
      padding: {
        top: 0
      }
    },
    annotation: {},
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: '#fefcf6',
      borderColor: '#fad961',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent'

    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {
    this.lineChartData = [
      {
        data: this.history.data,
        label: 'Order History'
      }
    ];
    this.lineChartLabels = this.history.labels;
  }

}
