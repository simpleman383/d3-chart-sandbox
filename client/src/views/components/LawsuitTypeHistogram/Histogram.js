import * as d3 from "d3";
import classes from "./styles.module.scss";

export class D3Histogram {
  constructor(data, size, eventHandlers) {
    const { onBarClick } = eventHandlers || {};
    const { width = 0, height = 0 } = size || {};

    this.width = width;
    this.height = height;

    const color = d3.scaleOrdinal(data.map(i => i.key), d3.schemeCategory10);

    const margin = {top: 30, right: 10, bottom: 30, left: 40};

    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.15)

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top])


    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3.axisBottom(x)
          .tickFormat(i => data[i].key)
          .tickSizeOuter(0)
      )

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3.axisLeft(y)
          .ticks()
          .tickValues(
            y.ticks()
              .filter(tick => Number.isInteger(tick))
          )
          .tickFormat(value => value.toString())
          .tickSize(-width + margin.right + margin.left)
      )
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 16)
        .attr("style", "transform: rotate(-90deg)")
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Count")
      );


    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(0))
        .attr("fill", d => color(d.key))
        .attr("width", x.bandwidth())
        .attr("height", d => 0)
        .attr("class", classes.bar)
        .on("click", (event, target) => {
          if (typeof(onBarClick) === "function") {
            onBarClick(event, target);
          }
        });
     
    svg.selectAll("rect")
        .transition()
        .duration(300)
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .delay((d, idx) => idx * 100);


    svg.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
        .attr("class", "label")
        .attr("x", (d, i) => x(i) + x.bandwidth() / 2)
        .attr("text-anchor", "middle")
        .attr("y", d => y(0))
        .attr("fill", "white")
        .attr("font-size", "12px")
        .text(d => d.value);
    
    svg.selectAll(".label")
      .transition()
      .duration(600)
      .attr("y", d => y(d.value) + 16)
      .delay((d, idx) => idx * 100);

    this.svg = svg;
  }

  appendTo(container) {
    container.appendChild(this.svg.node());
  }

  dispose() {
    this.svg.remove();
  }

};