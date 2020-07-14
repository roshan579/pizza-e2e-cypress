import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  @Input() value: number;
  @Input() total: number;
  @Input() color: string;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
