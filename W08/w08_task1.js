d3.csv("https://shodakobe13.github.io/InfoVis2022/W08/w08_task1.csv")
    .then( data => {
        data.forEach( d => { d.label = +d.label; d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 400,
            height: 300,
            margin: {top:10, right:10, bottom:10, left:10}
        };

        const barplot_plot = new BarPlot( config, data );
        barplot_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarPlot {

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
            .text("Task1");

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range([0, self.inner_height])
            .paddingInner(0.1);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(7)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height} )`);

        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

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

        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x", 0 )
            .attr("y", d => self.yscale( d.label ) )
            .attr("width", d => d.self.xscale(d.value) )
            .attr("height", yscale.bandwidth());

        self.xaxis_group
            .call( self.xaxis )
            .append("text")
            .attr("fill", "black")
            .attr("x", 140)
            .attr("y", 35)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("");

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
            .text("日付");
    }
}
