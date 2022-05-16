d3.csv("https://shodakobe13.github.io/InfoVis2022/W08/w08_task2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 260,
            height: 150,
            margin: {top:30, right:10, bottom:20, left:50}
        };

        const line = new Linechart( config, data );
        line.update();
    })
    .catch( error => {
        console.log( error );
    });

class Linechart {

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
            .attr("transform", "translate(180,20)")
            .append("text")
            .attr("fill", "black")
            .attr("x", -50)
            .attr("y", 0)
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("Task2");

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [0, self.inner_height] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(8);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height} )`);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(4);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, 0)`);

        self.line = d3.line()
            .x( d => d.x )
            .y( d => d.y );

    }

    update() {
        let self = this;

        const xmin = 0;
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [xmin, xmax] );

        const ymin = 0;
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [ymin, ymax] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.append("path")
            .attr("d",self.line(self.data))
            .attr('stroke', 'black')
            .attr('fill', 'none');

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );

        self.chart.selectAll("circle").data( self.data )
            .enter()
            .append("circle")
            .attr("cx", self.line.x())
            .attr("cy", self.line.y())
            .attr("r", 3)
            .attr("fill", "#000");
    }
}
