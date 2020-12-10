import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashBoardCharts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.dashBoardCharts = JSON.parse(localStorage.getItem('dyno-dash'))[0].charts;
  }

}
