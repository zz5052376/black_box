<template>
  <div id="mynetwork"></div>
  <button @click="getData(1)">获取数据1</button>
  <button @click="getData(2)">获取数据2</button>
  <button @click="getData(3)">获取数据3</button>
</template>

<script>
import * as vis from "vis-network";
import { graphData1, graphData2} from "../api/index";
export default {
  name: "Home",

  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    getData(id) {
      graphData2("./graphData"+id+".json").then((res) => {
        // console.log(res.nodes);
        // console.log(res.edges);
        var testData = { nodes: res.nodes, edges: res.edges };
        var option1=res.option;
        console.log(option1);
        var option={
          nodes: {
            color: {
              background: "#ffffff",
            },
            shape: "dot",
            scaling: {
              label: {
                min: 8,
                max: 20,
              },
            },
          },
          edges: {
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 1,
                type: "arrow",
              },
            },
          },
          layout: {
            randomSeed: undefined,
            improvedLayout: true,
            clusterThreshold: 150,
            hierarchical: {
              enabled: true,
              levelSeparation: 150,
              nodeSpacing: 100,
              treeSpacing: 200,
              blockShifting: true,
              edgeMinimization: true,
              parentCentralization: true,
              direction: "LR", // UD, DU, LR, RL
              sortMethod: "directed", // hubsize, directed
              shakeTowards: "roots", // roots, leaves
            },
          },
        };
        new vis.Network(document.getElementById("mynetwork"), testData, option1);
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
