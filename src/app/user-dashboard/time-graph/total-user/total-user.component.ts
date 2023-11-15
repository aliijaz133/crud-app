import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-total-user',
  templateUrl: './total-user.component.html',
  styleUrls: ['./total-user.component.scss']
})
export class TotalUserComponent implements OnInit {

  showLoader = false;

  @ViewChild('userChart', { static: true }) userGraph!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.userChartGraph();

    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    })
  }

  userChartGraph() {
    let chart = am4core.create("userChart", am4charts.XYChart);
    chart.paddingRight = 20;

    let data:any = [];
    let visits:any = 10;
    for (var i = 1; i < 500; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i, 0, 0, 0, 0), value: visits });
    }

    chart.data = data;

    let popup:any = chart.openPopup("<div>Click on plot area to add points<br>Drag bullets to change values<br>Double click on bullet to remove</div>");
    popup.top = 60;
    popup.right = 30;
    popup.defaultStyles = false;


    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;

    let valueAxis:any = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series :any= chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.fillOpacity = 0.5;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.behavior = "none";

    let scrollbarX:any = new am4core.Scrollbar();
    chart.scrollbarX = scrollbarX;

    let newSeries:any='';
    let addingPointsDisabled :boolean= false;

    addSeries();

    function addSeries() {
      newSeries = chart.series.push(new am4charts.LineSeries())
      newSeries.data = []
      newSeries.dataFields.dateX = "date";
      newSeries.dataFields.valueY = "newValue";
      newSeries.interpolationDuration = 0;

      let bullet:any = newSeries.bullets.push(new am4charts.CircleBullet());
      bullet.draggable = true;

      bullet.events.on("dragged", function (event:any) {
        let bullet:any = event.target;

        let x:any = bullet.pixelX;
        //x = dateAxis.getX(bullet.dataItem, "dateX"); //  uncomment this line if you want to allow draggin bullets only along y axis

        bullet.moveTo({ x: x, y: bullet.pixelY }, undefined, undefined, true);
        bullet.dataItem.valueY = valueAxis.yToValue(bullet.pixelY);
        bullet.dataItem.dataContext.newValue = bullet.dataItem.valueY;

        // remove the following three lines if you want to allow draggin bullets only along y axis
        bullet.dataItem.dateX = dateAxis.xToValue(bullet.pixelX);
        bullet.dataItem.dataContext.date = bullet.dataItem.dateX;
        dateAxis.postProcessSeriesDataItem(bullet.dataItem);
      })

      bullet.events.on("down", function (event:any) {
        addingPointsDisabled = true;

        chart.cursor.triggerMove(
          { x: series.tooltipX, y: series.tooltipY },
          "hard"
        ); // sticks cursor to the point

      })


      bullet.events.on("dragstop", function (event:any) {

        let bullet = event.target;

        chart.cursor.triggerMove(
          { x: series.tooltipX, y: series.tooltipY },
          "none"
        ); // enables mouse following again

        addingPointsDisabled = false;
      })

      bullet.events.on("doublehit", function (event:any) {
        addingPointsDisabled = false;
        let dataItem = event.target.dataItem;
        let dataContext = dataItem.dataContext;
        newSeries.data.splice(newSeries.data.indexOf(dataContext), 1);
        newSeries.invalidateData();

        chart.cursor.triggerMove(
          { x: series.tooltipX, y: series.tooltipY },
          "none"
        ); // enables mouse following again    
      })
    }


    let interaction = am4core.getInteraction();

    interaction.events.on("up", function (event) {
      if (newSeries && !addingPointsDisabled && chart.cursor.visible) {
        let date = series.tooltipDataItem.dateX;
        let point = am4core.utils.documentPointToSprite(event.pointer.point, chart.seriesContainer);
        let value = valueAxis.yToValue(point.y);
        if (value > valueAxis.min && value < valueAxis.max) {
          newSeries.data.push({ date: date, newValue: value });
          sortData();
          newSeries.invalidateData();
        }
      }
    })

    function sortData() {
      newSeries.data.sort(function (a:any, b:any) {
        let atime = a.date.getTime();
        let btime = b.date.getTime();

        if (atime < btime) {
          return -1;
        }
        else if (atime == btime) {
          return 0;
        }
        else {
          return 1;
        }
      })
    }

  }
}
