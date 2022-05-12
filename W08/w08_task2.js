d3.csv("https://shodakobe13.github.io/InfoVis2022/W08/w08_task2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });
        var config = {
            parent: '#drawing_region',
            width: 300,
            height: 200,
            margin: {top:40, right:10, bottom:30, left:50}
        };

        const bar_plot = new BarPlot( config, data );
        bar_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 300,
            height: config.height || 300,
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

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleBand()
            .domain(self.data.map(d => d.y))
            .range( [self.inner_height, 0] )
            .paddingInner(0.1);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height} )`);

        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

        self.yaxis_group = self.chart.append('g');

        self.title = self.svg.append("g")
            .attr("transform", "translate(150,20)")
            .append("text")
            .attr("fill", "black")
            .attr("x", 0)
            .attr("y", 0)
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("Task1");



    }

    update() {
        let self = this;
        const xmin = 0;
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [xmin, xmax] );
        self.yscale.domain( self.data.map(d => d.y) )
        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x", 0 )
            .attr("y", d => self.yscale( d.y ) )
            .attr("width", d => self.xscale( d.x ) )
            .attr("height", self.yscale.bandwidth());

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}






