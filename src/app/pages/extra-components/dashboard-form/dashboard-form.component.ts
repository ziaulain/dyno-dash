import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss'],
})
export class DashboardFormComponent implements OnInit {

  name: string = '';
  constructor(public dialogRef: MatDialogRef<DashboardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  addDashboard() {
    let dashboards = JSON.parse(localStorage.getItem('dyno-dash'));
    if (dashboards?.length) {
      dashboards.push({
        dashboard: this.name,
        charts: [],
      });
    } else {
      dashboards = [{
        dashboard: this.name,
        charts: [],
      }];
    }
    localStorage.setItem('dyno-dash', JSON.stringify(dashboards));
    this.dialogRef.close();
  }

}
