import d3 from 'd3';
import data from './dataWithNames';

export default () => {
  const width = 420;
  const barHeight = 20;

  const x = d3.scale.linear()
    .domain([0, d3.max(data, d => d.value)])
    .range([0, width]);

  const chart = d3.select('.SVGChart')
    .attr('width', width)
    .attr('height', barHeight * data.length);

  const bar = chart.selectAll('g')
    .data(data)
    .enter().append('g')
    .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);

  bar.append('rect')
    .attr('width', d => x(d.value))
    .attr('height', barHeight - 1);

  bar.append('text')
    .attr('x', d => x(d.value) - 3)
    .attr('y', barHeight / 2)
    .attr('dy', '.35em')
    .text(d => d.value);
};
