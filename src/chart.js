import d3 from 'd3';
import data from './dataWithNames';

export default () => {

  const width = 960;
  const height = 500;

  const x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1)
    .domain(data.map(d => d.name));

  const y = d3.scale.linear()
    .range([height, 0])
    .domain([0, d3.max(data, d => d.value)]);

  const chart = d3.select('.chart')
    .attr('width', width)
    .attr('height', height);

  const bar = chart.selectAll('g')
    .data(data).enter()
    .append('g')
    .attr('transform', (d) => `translate(${x(d.name)}, 0)`);

  bar.append('rect')
    .attr('y', d => y(d.value))
    .attr('height', d => height - y(d.value))
    .attr('width', x.rangeBand());
};
