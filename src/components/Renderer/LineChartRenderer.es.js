import React, {useLayoutEffect, useRef} from 'react';


export const LineChartRenderer = (props) => {

    const chartRef = useRef(null);

    useLayoutEffect(() => {

        // Create chart instance
        let chart = am4core.create(props.portletNamespace + "-chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        let data = [];
        let visits = 10;
        for (let i = 1; i < 50000; i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({date: new Date(2018, 0, i), value: visits});
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.minZoomCount = 5;

        dateAxis.groupData = true;
        dateAxis.groupCount = 500;

        chart.yAxes.push(new am4charts.ValueAxis());

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY}";
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.background.fillOpacity = 0.5;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;

        let scrollbarX = new am4core.Scrollbar();
        scrollbarX.marginBottom = 20;
        chart.scrollbarX = scrollbarX;

        // Save chart to chartRef
        chartRef.current = chart;
        console.log("Created chart " + chart.uid);

        return () => {
            console.log("Disposing chart " + chart.uid);
            console.log(chart);
            chart.dispose();
            console.log("Disposed chart " + chart.uid);
            console.log(chart);
        };
    }, []);

    return (
        <div id={props.portletNamespace + "-chartdiv"} style={{height: "500px"}} />
    );

}
