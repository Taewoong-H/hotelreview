import React, { useEffect } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const width = 400
const height = 400

function HotelsResult(props) {
  useEffect(() => {
    d3.selectAll('svg').remove();

    cloud()
      .size([width, height])
      .words(props.words.map(function(d) {
        return {text: d, size: 10 + Math.random() * 90, test: "haha"};
      }))
      .padding(5)
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", end)
      .start();

    function end(words) {
      d3.select("#word-cloud")
          .append("svg")
          .attr("width", 500)
          .attr("height", 500)
          .style("border", "1px solid black")
        .append("g")
          .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
      console.log(JSON.stringify(words));
    }
  })

  return (
    <div>
      <h1>리뷰 분석 결과</h1>
      <div id="word-cloud"></div>
    </div>
  )
}

export default HotelsResult;