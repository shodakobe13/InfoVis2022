d3.csv("https://vizlab-kobe-lecture.github.io/InfoVis2022/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 400,
            height: 300,
            margin: {top:50, right:20, bottom:50, left:100}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);


        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.title = self.svg.append("g")
            .attr("transform", "translate(200,20)")
            .append("text")
            .attr("fill", "black")
            .attr("x", 20)
            .attr("y", 0)
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("Task2");

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(8);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height} )`);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(4);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, 0)`);


    }

    update() {
        let self = this;

        const xmin = 0;
        const xmax = d3.max( self.data, d => d.x ) + 10;
        self.xscale.domain( [xmin, xmax] );

        const ymin = 0;
        const ymax = d3.max( self.data, d => d.y ) + 20;
        self.yscale.domain( [ymin, ymax] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r );

        self.xaxis_group
            .call( self.xaxis )
            .append("text")
            .attr("fill", "black")
            .attr("x", 140)
            .attr("y", 35)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("x-label");


        self.yaxis_group
            .call( self.yaxis )
            .append("text")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("x", -90)
            .attr("y", -40)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("y-label");
    }
}
