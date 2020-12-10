import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { EchartsComponent } from './echarts/echarts.component';
import { D3Component } from './d3/d3.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { DrilldownComponent} from './drilldown/drilldown.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: ChartsComponent,
  children: [{
    path: 'echarts',
    component: EchartsComponent,
  }, {
    path: 'd3',
    component: D3Component,
  }, {
    path: 'chartjs',
    component: ChartjsComponent,
  }, {
    path: 'drilldown',
    component: DrilldownComponent,
  }, {
    path: 'dashboard/:name',
    component: DashboardComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule { }

export const routedComponents = [
    ChartsComponent,
    EchartsComponent,
    D3Component,
    ChartjsComponent,
    DrilldownComponent,
];
