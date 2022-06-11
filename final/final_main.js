let input_data;
let line_chart
let bar_chart;
let scatter_plot;
let filter = [];

d3.csv("https://shodakobe13.github.io/InfoVis2022/final/final_data_csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.corona_number = +d.corona_number;
            d.gameSoft_number = +d.gameSoft_number;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['setosa','versicolor','virginica']);

        line_chart = new LineChart({



            }

        );

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Species',
            cscale: color_scale
        }, input_data );
        bar_chart.update();

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Sepal length [cm]',
            ylabel: 'Sepal width [cm]',
            cscale: color_scale
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
        scatter_plot.data = input_data.filter( d => filter.includes( d.species ) );
    }
    scatter_plot.update();
}
