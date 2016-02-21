import d3 from 'd3';
import data from './dataWithNames';

export default () => {
  const margins = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 960 - margins.right - margins.left;
  const height = 500 - margins.top - margins.bottom;

  const x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1)
    .domain(data.map(d => d.name));

  const y = d3.scale.linear()
    .range([height, 0])
    .domain([0, d3.max(data, d => d.value)]);

  const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

  const yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

  const chart = d3.select('.chart')
    .attr('width', width + margins.right + margins.left)
    .attr('height', height + margins.top + margins.bottom)
    .append('g')
    .attr('transform', `translate(${margins.left}, ${margins.right})`);

  const bar = chart.selectAll('g')
    .data(data).enter()
    .append('g')
    .attr('transform', (d) => `translate(${x(d.name)}, 0)`);

  bar.append('rect')
    .attr('y', d => y(d.value))
    .attr('height', d => height - y(d.value))
    .attr('width', x.rangeBand());

  chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  chart.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -40)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('value');
};
