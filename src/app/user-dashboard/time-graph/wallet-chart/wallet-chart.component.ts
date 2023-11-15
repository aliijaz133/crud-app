import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-wallet-chart',
  templateUrl: './wallet-chart.component.html',
  styleUrls: ['./wallet-chart.component.scss']
})
export class WalletChartComponent implements OnInit {

  showLoader = false;

  @ViewChild('walletChart', { static: true }) walletGraph!: ElementRef;

  constructor() {
  }

  ngOnInit(): void {

    this.walletChart();

    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    }, 8000);

  }

  walletChart() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("walletChart", am4charts.XYChart);

    let data = [];
    let value = 120;

    let names = ["Jun", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    for (var i = 0; i < names.length; i++) {
      value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
      data.push({ category: names[i], value: value });
    }

    chart.data = data;
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 15;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.horizontalCenter = "left";
    categoryAxis.renderer.labels.template.location = 0.5;

    categoryAxis.renderer.labels.template.adapter.add("dx", function (dx, target) {
      return -target.maxRight / 2;
    })

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "category";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0;
    series.strokeOpacity = 1;

    series.columns.template.width = 0.01;

    series.stroke = am4core.color("green");

    let bullet:any = series.bullets.create(am4charts.CircleBullet);

    bullet.fill = am4core.color("green");

    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();


  }

}
