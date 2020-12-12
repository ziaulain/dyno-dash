import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashBoardCharts: any[] = [];

  constructor(private activeRoute:ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(params=>{
      this.dashBoardCharts = JSON.parse(localStorage.getItem('dyno-dash')).filter(e=>e.dashboard ===params['params']['name'])[0].charts;
    })

   }

  ngOnInit(): void {
    
  }

}
