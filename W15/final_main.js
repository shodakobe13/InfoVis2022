let input_data;
let line_chart
let scatter_plot;

d3.csv("https://shodakobe13.github.io/InfoVis2022/W15/final_data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.number = +d.number;
            d.corona_number = +d.corona_number;
            d.temperature = +d.temperature;
        });

        line_chart = new LineChart({
            parent: '#drawing_region_linechart',
            width: 512,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Year/Mon',
            ylabel: 'temperaturer',
        }, input_data );
        line_chart.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 512,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Year/Mon',
            ylabel: 'number',
        }, input_data );
        bar_chart.update();

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 512,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'gameSoft-number',
            ylabel: 'Corona-number',
        }, input_data );
        scatter_plot.update();

    })
    .catch( error => {
        console.log( error );
    });

