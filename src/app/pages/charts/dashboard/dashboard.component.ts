import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashBoardCharts: any[] = [];
  timespan: string = 'Today';
  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe( params => {
      this.dashBoardCharts = JSON.parse( localStorage.getItem('dyno-dash') ).filter( e => e.dashboard === params['params']['name'])[0].charts;
    });
    this.dashBoardCharts.forEach((chart) => {
      chart.dataSource.chart.label = chart.dataSource.chart.caption;
      chart.dataSource.chart.caption = '';
      chart.dataSource.chart.showLegend = '0';
    });
   }

  ngOnInit(): void {}

  colorChange(dataSource: any) {
    dataSource.chart.palettecolors = dataSource.data.map(e => e.color).join(', ');
  }

}
