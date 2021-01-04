import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NbSidebarService } from '@nebular/theme';
import { TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
    TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem,
} from 'ngx-treeview';
import { isNil, remove, reverse } from 'lodash';
declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'ngx-drilldown',
  templateUrl: './drilldown.component.html',
  styleUrls: ['./drilldown.component.scss'],
})
export class DrilldownComponent implements OnInit {
    dataSource: Object;
    chartName: string;
    chartType: string;
    dataSets: any;
    label: string;
    value1: string;
    value2: string;
    items: any;
    values: number[];
    config = TreeviewConfig.create({
        hasAllCheckBox: true,
        hasFilter: true,
        hasCollapseExpand: true,
        decoupleChildFromParent: false,
        maxHeight: 400,
    });
    showFiller = true;
    selectedDashboard: string = '';
    dashBoards: any[] = [];
    showSuccessMsg: Boolean = false;

    constructor(private sidebarService: NbSidebarService) {
        this.chartType = 'mscolumn2d';
        this.dataSets = {
            'countries': ['Georgia', 'France', 'Honduras', 'Iceland', 'Kiribati'],
            'oilReserves': [50, 30, 10, 70, 40],
            'population': [20, 10, 50, 60, 15],
            'cities': ['Pogradec', 'Riadh', 'Mecca', 'Petran', 'Elbasan'],
        };
        this.label = 'countries';
        this.value1 = 'oilReserves';
        this.value2 = 'population';
        this.chartName = 'Countries With Most Oil Reserves [2017-18]';
        // STEP 3 - Chart Configuration
        this.reRenderGraph();
        this.items = this.getBooks();
   }

    ngOnInit(): void {
        this.dashBoards = JSON.parse(localStorage.getItem('dyno-dash'));
    }

    onFilterChange(value: string): void {
        // console.log('filter:', value);
    }
    onSelectedChange(downlineItems: DownlineTreeviewItem[]): void {
        downlineItems.forEach(downlineItem => {
            const item = downlineItem?.item;
            const value = item?.value;
            const texts = [item?.text];
            let parent = downlineItem.parent;
            while (!isNil(parent)) {
                texts.push(parent.item.text);
                parent = parent.parent;
            }
            const reverseTexts = reverse(texts);
            const row = `${reverseTexts.join(' -> ')} : ${value}`;
            // console.log(row);
        });
    }

    reRenderGraph() {
        const dataSource = {
            chart: {
                // Set the chart caption
                caption: 'Countries With Most Oil Reserves [2017-18]',
                // Set the chart subcaption
                // subCaption: 'In MMbbl = One Million barrels',
                // //Set the x-axis name
                // xAxisName: 'Country',
                // Set the y-axis name
                // yAxisName: 'Reserves (MMbbl)',
                numberSuffix: 'K',
                // Set the theme for your chart
                theme: 'fusion',
            },
            // Chart Data - from step 2
            data: this.gen2DGraphData(),
            categories: [{ 'category': this.getCategoriesLabels() }],
            dataset: this.getDataSets(),
        };
        this.dataSource = dataSource;
    }

    gen2DGraphData() {
        const colors = ['#5d62b5', '#30b3af', '#5c60a6', '#61a887', '#eab83c'];
        const chartData = [];
        for (let i = 0; i < 5; i++) {
            const dataPoint = {
                label: this.dataSets[this.label][i],
                value: this.dataSets[this.value1][i],
                color: colors[i],
            };
            chartData.push(dataPoint);
        }
        return chartData;
    }

    getCategoriesLabels() {
        const categories = [];
        for (let i = 0; i < 5; i++) {
            const dataPoint = {
                label: this.dataSets[this.label][i],
            };
            categories.push(dataPoint);
        }
        return categories;
    }

    getDataSets() {
        const datasets = [];
        const series = {
            seriesname: this.value1,
            data: [],
        };
        for (let j = 0; j < 5; j++) {
            const dataPoint = {
                value: this.dataSets[this.value1][j],
            };
            series['data'].push(dataPoint);
        }
        datasets.push(series);
        const series2 = {
            seriesname: this.value2,
            data: [],
        };
        for (let j = 0; j < 5; j++) {
            const dataPoint = {
                value: this.dataSets[this.value2][j],
            };
            series2['data'].push(dataPoint);
        }
        datasets.push(series2);
        return datasets;
    }

    toggle() {
        this.sidebarService.toggle(false, 'left');
    }

    toggleCompact() {
        this.sidebarService.toggle(true, 'right');
    }

    getBooks(): TreeviewItem[] {
        const countriesCategory = new TreeviewItem({
            text: 'Countries', value: 'countires', collapsed: true, children: [
                { text: 'Georgia', value: 'Georgia' },
                { text: 'France', value: 'France' },
                { text: 'Honduras', value: 'Honduras' },
                { text: 'Iceland', value: 'Iceland' },
                { text: 'Kiribati', value: 'Kiribati' },
            ],
        });
        const citiesCategory = new TreeviewItem({
            text: 'Cities', value: 'cities', collapsed: true, children: [
              { text: 'Pogradec', value: 'Pogradec' },
              { text: 'Riadh', value: 'Riadh' },
              { text: 'Mecca', value: 'Mecca' },
              { text: 'Petran', value: 'Petran' },
              { text: 'Elbasan', value: 'Elbasan' },
            ],
          });
        return [countriesCategory, citiesCategory];
      }

      addToDashboard() {
        const idx = this.dashBoards.map( e => e.dashboard).indexOf( this.selectedDashboard );
          this.dataSource['chart']['caption'] = this.chartName;
        this.dashBoards[idx].charts.push({
            chartType: this.chartType,
            dataSource: this.dataSource,
        });
        localStorage.setItem('dyno-dash', JSON.stringify(this.dashBoards));
        this.showSuccessMsg = true;
        setTimeout(() => {
            this.showSuccessMsg = false;
            this.selectedDashboard = '';
        }, 3 * 1000);
      }
}
