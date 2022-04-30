<template>
  <div id="mynetwork"></div>
</template>

<script>
import * as vis from "vis-network";
export default {
  name: "Home",
  data() {
    return {
      testGraph: {
        nodes: [
          { id: 1, shape: "circle", value: 1 },
          { id: 2, label: "B10\nXXXXXXXXXXXXXXXXXX", shape: "box", value: 5 },
          { id: 3, label: "B7", shape: "box", value: 5 },
          { id: 4, label: "B5\nXXXXXXXXXXXXX", shape: "box", value: 5 },
          { id: 5, label: "B6", shape: "box", value: 5 },
          { id: 6, label: "B4\nXXXXXXXXXXXXXXXX", shape: "box", value: 5 },
          { id: 7, label: "B1\nXXXXXXXXXXXXX", shape: "box", value: 5 },
          { id: 8, label: "B3\nXXXXXXXXXXXXXXX", shape: "box", value: 5 },
          { id: 9, label: "B2\nXXXXXXXXXXXXXX", shape: "box", value: 5 },
          { id: 10, shape: "circle", value: 1 },
        ],
        edges: [
          { from: 1, to: 2 ,color: { color: "green" }},
          { from: 2, to: 3 ,color: { color: "red" }},
          { from: 2, to: 4 ,color: { color: "green" }},
          { from: 4, to: 6 ,color: { color: "green" }},
          { from: 6, to: 8 ,color: { color: "red" }},
          { from: 6, to: 7 ,color: { color: "green" }},
          { from: 3, to: 5 ,color: { color: "red" }},
          { from: 8, to: 7 ,color: { color: "red" }},
          { from: 8, to: 9 ,color: { color: "red" }},
          { from: 4, to: 7 ,color: { color: "green" }},
          { from: 5, to: 10 ,color: { color: "red" }},
          { from: 7, to: 10 ,color: { color: "red" }},
          { from: 9, to: 10 ,color: { color: "red" }},
        ],
      },
    };
  },
  mounted() {
    this.initGraph(this.testGraph);
  },
  methods: {
    initGraph(data) {
      new vis.Network(document.getElementById("mynetwork"), data, {
        manipulation: false,
        height: "100%",
        edges:{
            arrows: "to",
            physics: false,
            smooth: { type: "cubicBezier" },
        },
        layout: {
          hierarchical: {
            enabled: true,
             sortMethod: "directed",
             shakeTowards: "leaves",
            levelSeparation: 110,
          },
        },
        physics: {
          hierarchicalRepulsion: {
            nodeDistance: 110,
          },
        },
      });
    },
  },
};
</script>

    <style type="text/css">
#mynetwork {
  width: 600px;
  height: 600px;
  border: 1px solid lightgray;
}
</style>
