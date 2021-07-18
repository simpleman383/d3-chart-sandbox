import * as d3 from "d3";
import classes from "./styles.module.scss";

const constrainValue = (value, min, max) => {
  if (value < min) {
    return min;
  }
  else if (value > max) {
    return max;
  }
  else {
    return value;
  }
};

export class D3Graph {
  constructor(data, size, handlers) {
    const width = size.width;
    const height = size.height;

    const { 
      onNodeClick, 
    } = handlers || {};

    const self = this;
    this.width = width;
    this.height = height;

    this.types = data.types;
    this.links = data.links.map(d => Object.create(d));
    this.nodes = data.nodes.map(d => Object.create(d));

    const color = d3.scaleOrdinal(this.types, d3.schemeCategory10);

    function linkArc(d) {
      const sourceX = d.source.x;
      const sourceY = d.source.y;

      const targetX = d.target.x;
      const targetY = d.target.y;

      const r = Math.hypot(targetX - sourceX, targetY - sourceY);

      return `
        M${sourceX},${sourceY}
        A${r},${r} 0 0,1 ${targetX},${targetY}
      `;
    }

    const drag = simulation => {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }


    this.simulation = d3
      .forceSimulation(this.nodes)
      .force("link", 
        d3.forceLink(this.links)
          .id(d => d.id)
          .distance(Math.min(width, height) / Math.sqrt(this.nodes.length))
      )
      .force("charge", d3.forceManyBody().strength(-600))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .create("svg")
      .attr("viewBox", [-width/2, -height/2, width, height ])
      .style("font", "14px Roboto");

    const zoom = d3.zoom()                            
      .scaleExtent([0.25, 2])
      .translateExtent([[-width/2, -height/2], [width/2, height/2]])
      .extent([[-width/2, -height/2], [width/2, height/2]])
      .on("zoom", zoomed);         
      
    svg.call(zoom);

    function zoomed(event) {
      console.log(event.transform);
      container.attr("transform", event.transform);

    }


    svg.append("defs").selectAll("marker")
      .data(this.types)
      .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -8 16 16")
      .attr("refX", 24)
      .attr("refY", -4)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", color)
      .attr("d", "M0,-8L16,0L0,8");

    const container = svg.append("g");
      
    const link = container.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(this.links)
      .join("path")
      .attr("stroke", d => color(d.type))
      .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

    const node = container.append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("class", classes.node)
      .selectAll("g")
      .data(this.nodes)
      .join("g")
      .call(drag(this.simulation))
      .on("click", (event, node) => {
        const { index } = node;
        const target = data.nodes[index] || null;

        if (typeof(onNodeClick) === "function") {
          onNodeClick(target, event, node);
        }
      });

    node.append("circle")
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("r", 8);

    node.append("text")
      .attr("x", 12)
      .attr("y", 12)
      .text(d => d.id)
      .clone(true).lower()
      .attr("color", "white")
      .attr("fill", "black")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    this.simulation.on("tick", () => {
      link.attr("d", linkArc);

      node.attr("transform", d => {
        return `translate(${d.x},${d.y})`;
      });
    });
    
    this.svg = svg;
  }

  resize(size) {
    this.width = size.width;
    this.height = size.height;
    this.svg.attr("viewBox", [-this.width/2, -this.height/2, this.width, this.height ]);
  }

  appendTo(containerElement) {
    containerElement.appendChild(this.svg.node());
  }

  dispose() {
    this.simulation.stop();
    this.svg.remove();
  }
}

