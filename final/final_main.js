let input_data;
let line_chart
let bar_chart;
let scatter_plot;

d3.csv("https://shodakobe13.github.io/InfoVis2022/final/final_data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.number = +d.number;
            d.corona_number = +d.corona_number;
            d.gameSoft_number = +d.gameSoft_number;
        });

        line_chart = new LineChart({
            parent: '#drawing_region_linechart',
            width: 512,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Period',
            ylabel: 'gameSoft-number',
        }, input_data );
        line_chart.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 512,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Period',
            ylabel: 'Corona-number',
        }, input_data );
        bar_chart.update();

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 512,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Sepal length [cm]',
            ylabel: 'Sepal width [cm]',
        }, input_data );
        scatter_plot.update();

    })
    .catch( error => {
        console.log( error );
    });
