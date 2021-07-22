import * as d3 from "d3";
import classes from "./styles.module.scss";

var stringToColour = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

class GraphBuilder {

  setColorScheme(color) {
    this.color = color;
  }

  createSvg(width, height) {
    const svg = d3.create("svg")
      .attr("viewBox", [-width/2, -height/2, width, height ])
      .style("font", "14px Roboto");

    return svg;
  }

  createDefs(rootSelection, dataTypes) {
    const color = this.color || "white";

    const defs = rootSelection.append("defs")
      .selectAll("marker")
      .data(dataTypes)
      .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -8 16 16")
      .attr("refX", 24)
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", color)
      .attr("d", "M0,-8L16,0L0,8");

    return defs;
  }

  createLinks(rootSelection, dataLinks) {
    const color = this.color || (() => "white"); 

    const link = rootSelection.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(dataLinks)
      .join("path")
      .attr("stroke", d => color(d.type))
      .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

    return link;
  }

  createNodes(rootSelection, dataNodes, options = {}) {
    const { strokeColor = "white", strokeWidth = 1, radius = 6, onClick, onMouseOver, onMouseOut } = options;

    const node = rootSelection.append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("class", classes.node)
      .selectAll("g")
      .data(dataNodes)
      .join("g")
      .on("click", (event, node) => {
        const { index } = node;
        const target = dataNodes[index] || null;

        if (typeof(onClick) === "function") {
          onClick(target, event, node);
        }
      })
      .on("mouseover", (event, node) => {
        const { index } = node;
        const target = dataNodes[index] || null;

        if (typeof(onMouseOver) === "function") {
          onMouseOver(target, event, node);
        }
      })
      .on("mouseout", (event, node) => {
        const { index } = node;
        const target = dataNodes[index] || null;

        if (typeof(onMouseOut) === "function") {
          onMouseOut(target, event, node);
        }
      });

    node.append("circle")
      .attr("stroke", strokeColor)
      .attr("stroke-width", strokeWidth)
      .attr("r", radius);

    return node;
  }

  addNodeTitles(rootSelection, options) {
    const { marginX, marginY, color, strokeColor } = options;

    return rootSelection.append("text")
      .attr("x", marginX)
      .attr("y", marginY)
      .text(d => d.id)
      .clone(true).lower()
      .attr("color", color)
      .attr("fill", color)
      .attr("stroke", strokeColor)
      .attr("stroke-width", 2);
  }

  setupZoom(options = {}) {
    const { size, scaleExtent, onZoom } = options;

    const zoom = d3.zoom()                            
      .scaleExtent([scaleExtent[0], scaleExtent[1]])
      .translateExtent([[-size.width/2, -size.height/2], [size.width/2, size.height/2]])
      .extent([[-size.width/2, -size.height/2], [size.width/2, size.height/2]])
      .on("zoom", onZoom);   

    return zoom;
  }

  createForceSimulation(forces, dataNodes) {
    let simulation = d3.forceSimulation(dataNodes);

    for(const force of forces) {
      const [ forceName, forceEntity ] = force;
      simulation = simulation.force(forceName, forceEntity);
    }

    return simulation;
  }

  createLinkArc(d) {
    const sourceX = d.source.x;
    const sourceY = d.source.y;

    const targetX = d.target.x;
    const targetY = d.target.y;

    if (sourceX === targetX && sourceY === targetY) {
      const closedArcRadius = 40;

      return `
        M${sourceX},${sourceY}
        A${closedArcRadius},${closedArcRadius} 0 1,1 ${targetX + 1},${targetY + 1}
      `;
    }
    else {
      const r = Math.hypot(targetX - sourceX, targetY - sourceY);

      return `
        M${sourceX},${sourceY}
        A${r},${r} 0 0,1 ${targetX},${targetY}
      `;
    }
  }
}


export class D3DirectedGraph {
  constructor(data, size, eventHandlers) {
    const width = size.width || 0;
    const height = size.height || 0;

    this.eventHandlers = eventHandlers || {};

    this.size = { width, height };
    this.data = {
      types: data.types || [],
      links: data.links || [],
      nodes: data.nodes || []
    };

    this.graph = this.#buildGraph(this.data, this.size);
  }


  #buildGraph(data, size) {
    const dataTypes = data.types;
    const dataLinks = data.links.map(d => Object.create(d));
    const dataNodes = data.nodes.map(d => Object.create(d)); 

    const color = d3.scaleOrdinal(dataTypes, d3.schemeCategory10);

    const builder = new GraphBuilder();
    builder.setColorScheme(color);

    const svg = builder.createSvg(size.width, size.height);
    const defs = builder.createDefs(svg, dataTypes);

    const zoom = builder.setupZoom({
      scaleExtent: [0.25, 2],
      size: size,
      onZoom: (event) => {
        container.attr("transform", event.transform);
      }
    });

    svg.call(zoom);

    const container = svg.append("g");
    const links = builder.createLinks(container, dataLinks);


    let nodes = builder.createNodes(container, dataNodes, { 
      radius: 8,
      onClick: (target, event) => {
        const targetDataItem = data.nodes[target.index] || null;

        if (typeof(this.eventHandlers.onNodeClick) === "function") {
          this.eventHandlers.onNodeClick(event, targetDataItem);
        }
      },
      onMouseOver: (target, event, node) => {
        links.filter(link => {
          return link.target.index === node.index || link.source.index === node.index;
        })
        .attr("stroke-width", "4px")
        .attr("stroke", "rgba(245, 230, 83, 1)")
        .attr("marker-end", "");

        if (typeof(this.eventHandlers.onNodeMouseOver) === "function") {
          this.eventHandlers.onNodeMouseOver(target, event, node);
        }
      },
      onMouseOut: (target, event, node) => {
        links.filter(link => {
          return link.target.index === node.index || link.source.index === node.index;
        })
        .attr("stroke-width", null)
        .attr("stroke", d => color(d.type))
        .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

        if (typeof(this.eventHandlers.onNodeMouseOut) === "function") {
          this.eventHandlers.onNodeMouseOut(target, event, node);
        }
      }
    });

    const titles = builder.addNodeTitles(nodes, {
      marginX: 12, marginY: 12,
      color: "white",
      strokeColor: "black"
    });


    const forceSimulation = builder.createForceSimulation([
      [ "link", d3.forceLink(dataLinks).id(d => d.id).distance(250) ],
      [ "charge", d3.forceManyBody() ],
      [ "collide", d3.forceCollide(80) ],
      [ "center", d3.forceCenter(0, 0) ],
    ], dataNodes);

    forceSimulation.on("tick", () => {
      links.attr("d", builder.createLinkArc);

      nodes.attr("transform", d => {
        return `translate(${d.x},${d.y})`;
      });
    });

    const withDrag = simulation => {
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

    nodes = nodes.call(withDrag(forceSimulation));

    return { svg, nodes, links, simulation: forceSimulation };
  }

  #disposeGraph() {
    if (this.graph !== null) {
      this.graph.simulation.stop();
      this.graph.svg.remove();
    }
  }

  appendTo(containerElement) {
    containerElement.appendChild(this.graph.svg.node());
    return this;
  }

  dispose() {
    return this.#disposeGraph();
  }


  updateData(nextData) {

  }

  updateSize(nextSize) {

  }
}
