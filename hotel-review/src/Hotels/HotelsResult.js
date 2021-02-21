import React, { useEffect } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import './HotelsResult.css';

const width = 400
const height = 400

function HotelsResult(props) {
  useEffect(() => {
    d3.selectAll('svg').remove();

    cloud()
      .size([width, height])
      .words(props.positiveWords.map(function(d) {
        return {text: d, size: 10 + Math.random() * 90, test: "haha"};
      }))
      .padding(5)
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", positiveEnd)
      .start();

    function positiveEnd(words) {
      d3.select("#positive-word-cloud")
          .append("svg")
          .attr("viewBox", '0 0 500 500')
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
    }


    cloud()
      .size([width, height])
      .words(props.negativeWords.map(function(d) {
        return {text: d, size: 10 + Math.random() * 90, test: "haha"};
      }))
      .padding(5)
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", negativeEnd)
      .start();

    function negativeEnd(words) {
      d3.select("#negative-word-cloud")
          .append("svg")
          .attr("viewBox", '0 0 500 500')
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
    }
  })

  return (
    <div>
      <h1>리뷰 분석 결과</h1>
      <div id="positive-word-cloud">
        <h3 id="positive-review-head">긍정리뷰</h3>
      </div>
      <div id="negative-word-cloud">
        <h3 id="negative-review-head">부정리뷰</h3>
      </div>
    </div>
  )
}

export default HotelsResult;