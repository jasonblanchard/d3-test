import d3 from 'd3';
import data from './data';

const x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

export default () => {
  d3.select(".HTMlChart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });
};
