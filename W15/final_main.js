let input_data;
let line_chart;
let bar_chart;
let barline_chart;
let scatter_plot;
let filter = [];

d3.csv("https://shodakobe13.github.io/InfoVis2022/W15/final_data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.number = +d.number;
            d.year = +d.year;
            d.corona_number = +d.corona_number;
            d.temperature = +d.temperature;
        });

        line_chart = new LineChart({
            parent: '#drawing_region_linechart',
            width: 1024,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:80},
            xlabel: 'Year/Mon',
            ylabel: 'temperature',
        }, input_data );
        line_chart.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 1024,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:80},
            xlabel: 'Year/Mon',
            ylabel: 'corona-number',
        }, input_data );
        bar_chart.update();

        barline_chart = new BarlineChart( {
            parent: '#drawing_region_barlinechart',
            width: 1024,
            height: 256,
            margin: {top:10, right:50, bottom:50, left:80},
            xlabel: 'Year/Mon',
            ylabel: 'corona-number',
            y2label: 'temperature',
        }, input_data );
        barline_chart.update();

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 1024,
            height: 256,
            margin: {top:10, right:10, bottom:80, left:80},
            xlabel: 'temperature',
            ylabel: 'Corona-number',
        }, input_data );
        scatter_plot.update();

    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.year ) );
    }
    scatter_plot.update();
}
