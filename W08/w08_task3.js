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

        self.color = d3.scaleOrdinal()
            .range(["#fa8072", "#D8C99B", "#D8973C", "#BD632F", "#ffd700"]);

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height)
            .append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

        self.pie = d3.pie()
            .value( d => d.value );

        self.radius = Math.min( self.config.width, self.config.height ) / 2;

        self.arc = d3.arc()
            .innerRadius(self.radius/2)
            .outerRadius(self.radius);

        self.label_arc = d3.arc()
            .outerRadius(self.radius-20)
            .innerRadius(self.radius-20);

    }

    update() {
        let self = this;
        self.render();
    }

    render() {
        let self = this;

        self.svg.selectAll('pie')
            .data( self.pie(self.data) )
            .enter()
            .append('path')
            .attr('d', self.arc)
            .style("fill", function(d,i){
                return self.color(i);
            })
            .attr('stroke', 'white');

        self.svg.selectAll("text")
            .data( self.pie(self.data) )
            .enter()
            .append("text")
            .attr("fill", "black")
            .attr("x", -30)
            .attr("y", 5)
            .attr("transform", function(d) { return "translate(" + self.label_arc.centroid(d) + ")"; })
            .attr("font", "3px")
            .text(function(d) { return d.data.label });

    }
}






