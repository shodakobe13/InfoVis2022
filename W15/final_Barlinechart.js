class BarlineChart {
    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 1024,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            y2label: config.y2label || '',
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleBand()
            .range([0, self.inner_width])
            .paddingInner(0.2)
            .paddingOuter(0.1);

        self.yscale = d3.scaleLinear()
            .range([self.inner_height, 0]);

        self.y2scale = d3.scaleLinear()
            .range([self.inner_height, 0]);

        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(5)
            .tickSizeOuter(0);

        self.y2axis = d3.axisRight(self.y2scale)
            .ticks(5)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        self.y2axis_group = self.chart.append('g')
            .attr('transform', `translate(895,0)`);

        const xlabel_space = 40;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('x', self.config.width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .text( self.config.xlabel );

        const ylabel_space = 50;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space - 10)
            .attr('x', -(self.config.height / 2) + 20)
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.ylabel );

        const y2label_space = 50;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space + 975)
            .attr('x', -(self.config.height / 2) + 20)
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.y2label );
    }

    update() {
        let self = this;

        self.xvalue = d => d.period;
        self.yvalue = d => d.corona_number;
        self.y2value = d => d.temperature;

        const items = self.data.map( self.xvalue );
        self.xscale.domain(items);

        const ymin = 0;
        const ymax = d3.max( self.data, self.yvalue );
        self.yscale.domain([ymin, ymax]);

        const y2min = 0;
        const y2max = d3.max( self.data, self.y2value );
        self.y2scale.domain([y2min, y2max]);

        self.line = d3.line()
            .x( d => self.xscale( self.xvalue(d) ) + 15)
            .y( d => self.y2scale(d.temperature) );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data)
            .join("rect")
            .attr("x", d => self.xscale( self.xvalue(d) ) )
            .attr("y", d => self.yscale( self.yvalue(d) ) )
            .attr("fill","steelblue")
            .attr("width", self.xscale.bandwidth())
            .attr("height", d => self.inner_height - self.yscale( self.yvalue(d) ))
            .on('click', function(ev,d) {
                const is_active = filter.includes(d.year);
                if ( is_active ) {
                    filter = filter.filter( f => f !== d.year );
                }
                else {
                    filter.push( d.year );
                }
                Filter();
                d3.select(this).classed('active', !is_active);
            });

        const line_width = 3;
        const line_color = 'firebrick';
        self.chart.append("path")
            .attr('d', self.line(self.data))
            .attr('stroke', line_color)
            .attr('stroke-width', line_width)
            .attr('fill', 'none');

        const circle_radius = 5;
        const circle_color = 'firebrick';
        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr('cx', self.line.x())
            .attr('cy', self.line.y())
            .attr('r', circle_radius)
            .attr('fill', circle_color);

        self.xaxis_group
            .call(self.xaxis);

        self.yaxis_group
            .call(self.yaxis);

        self.y2axis_group
            .call(self.y2axis);
    }
}
