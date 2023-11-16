import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-dollar-graph',
  templateUrl: './dollar-graph.component.html',
  styleUrls: ['./dollar-graph.component.scss']
})
export class DollarGraphComponent implements OnInit {

  showLoader = true;

  @ViewChild('dollarGraph', { static: true }) dollargraph!: ElementRef;

  constructor() { }

  ngOnInit(): void {

    this.dollarFun();

    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    })
  }

  dollarFun() {
    let chart = am4core.create("dollarGraph", am4charts.XYChart);

    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    // Title
    let title = chart.titles.create();
    title.text = "Biggest U.S. retailers by 2018 revenue";
    title.fontSize = 20;
    title.marginBottom = 20;

    // Set format
    chart.numberFormatter.numberFormat = "'[font-size: 10]US$[/] [bold]'#.0B";

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.dataFields.category = "category";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Set data
    chart.data = [{
      "category": "",
      "Walmart": 387.66,
      "Amazon.com": 120.93,
      "The Kroger Co.": 119.70,
      "Costco": 101.43,
      "Walgreens Boots Alliance": 98.39,
      "The Home Depot": 97.27,
      "CVS Health Corporation": 83.79,
      "Target": 74.48,
      "Lowe's Companies": 64.09,
      "Albertsons Companies": 59.71
    }];

    // Series
    let data = chart.data[0];
    for (var key in data) {
      if (data.hasOwnProperty(key) && key != "category") {
        let series = chart.series.push(new am4charts.CurvedColumnSeries());
        series.dataFields.categoryX = "category";
        series.dataFields.valueY = key;
        series.name = key;
        series.tooltipText = "{name}: {valueY.value}";
        series.columns.template.strokeWidth = 2;
        series.columns.template.strokeOpacity = 1;
        series.columns.template.fillOpacity = 0;
        series.columns.template.width = am4core.percent(100);
        series.clustered = false;
      }
    }

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.maxTooltipDistance = 10;

    // Legend
    chart.legend = new am4charts.Legend();
    chart.legend.fontSize = 12;
    chart.legend.position = "right";
    chart.legend.valign = "top";
    chart.legend.marginTop = 0;
    chart.legend.labels.template.width = 130;
    chart.legend.labels.template.truncate = true;
    chart.legend.valueLabels.template.text = "{valueY.close}"
    chart.legend.valueLabels.template.fontSize = 12;
  }

}
