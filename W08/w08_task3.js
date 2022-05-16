d3.csv("https://shodakobe13.github.io/InfoVis2022/W08/w08_task1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value;  });
        var config = {
            parent: '#drawing_region',
            width: 300,
            height: 200,
            margin: {top:40, right:10, bottom:30, left:60}
        };

        const piechart = new PieChart( config, data );
        piechart.update();
    })
    .catch( error => {
        console.log( error );
    });

class PieChart {

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
            .attr('height', self.config.height)
            .append('g')
            .attr('transform', `translate(${width/2}, ${height/2})`);

        self.pie = d3.pie()
            .value( d => d.value );

        self.radius = Math.min( width, height ) / 2;

        self.arc = d3.arc()
            .innerRadius(self.radius/3)
            .outerRadius(self.radius);





        self.title = self.svg.append("g")
            .attr("transform", "translate(150,20)")
            .append("text")
            .attr("fill", "black")
            .attr("x", 0)
            .attr("y", 0)
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("Task3");
    }

    update() {
        let self = this;
        const xmin = 0;
        const xmax = d3.max( self.data, d => d.value );
        self.xscale.domain( [xmin, xmax] );
        self.yscale.domain( self.data.map(d => d.label) )
        self.render();
    }

    render() {
        let self = this;

        self.svg.selectAll('pie')
            .data( self.pie(self.data) )
            .enter()
            .append('path')
            .attr('d', self.arc)
            .attr('fill', 'black')
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

    }
}






