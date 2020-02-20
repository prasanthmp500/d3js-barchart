import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import d3Tip from "d3-tip";


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements OnInit  {
  name = 'Angular';

  ngOnInit() {



    const data=[{"key":"2019-09-11","documentCount":149002},{"key":"2019-09-12","documentCount":0},{"key":"2019-09-13","documentCount":80000},{"key":"2019-09-14","documentCount":0},{"key":"2019-09-15","documentCount":0},{"key":"2019-09-16","documentCount":0},{"key":"2019-09-17","documentCount":0},{"key":"2019-09-18","documentCount":270204},{"key":"2019-09-19","documentCount":0},{"key":"2019-09-20","documentCount":1},{"key":"2019-09-21","documentCount":0},{"key":"2019-09-22","documentCount":0},{"key":"2019-09-23","documentCount":269836},{"key":"2019-09-24","documentCount":0},{"key":"2019-09-25","documentCount":0},{"key":"2020-01-15","documentCount":0},{"key":"2020-01-16","documentCount":0},{"key":"2020-01-17","documentCount":0},{"key":"2020-01-18","documentCount":0},{"key":"2020-01-19","documentCount":0},{"key":"2020-01-20","documentCount":0},{"key":"2020-01-21","documentCount":0},{"key":"2020-01-22","documentCount":0},{"key":"2020-01-23","documentCount":0},{"key":"2020-01-24","documentCount":0},{"key":"2020-01-25","documentCount":0},{"key":"2020-01-26","documentCount":0},{"key":"2020-01-27","documentCount":0},{"key":"2020-01-28","documentCount":0},{"key":"2020-02-09","documentCount":0},{"key":"2020-02-10","documentCount":56000},{"key":"2020-02-11","documentCount":500}];
  
      const margin = {top: 20, right: 20, bottom: 60, left: 60},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
  
  const x = d3.scaleBand().range([0, width]).paddingInner(0.1).paddingOuter(0.5);
  
      const y = d3.scaleLinear().range([height, 0]);
  
            const svg = d3.select("div#histogramHolder").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      x.domain(data.map(function(d) { return d.key; }));
      y.domain([0, d3.max(data, function(d) { return d.documentCount; })]);
  

      const tip = d3Tip()

      tip
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(d => {
          return (
            `Messages Sent:<span> ${d.documentCount} </span> <br>
            Date :<span> ${d.key} </span>
            `
          )
        })
      
        svg.call(tip);


      // append the rectangles for the bar chart
      svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.documentCount); })
      .attr("height", function(d) { return height - y(d.documentCount); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      ;
  
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")  
          .attr("y", 0)
          .attr("x", 9)
          .attr("dy", ".35em")
          .attr("transform", "rotate(60)")
          .style("text-anchor", "start");
  
       // add the y Axis
       svg.append("g").call(d3.axisLeft(y));
    }
}
