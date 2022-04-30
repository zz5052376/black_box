<template>
  <p>Code Block级图形</p>
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="15"><div id="mynetwork"></div></el-col>
    <el-col :span="7">
      <!-- <pre id="eventSpan"></pre> -->
      <el-descriptions
        class="margin-top"
        title="详细信息"
        :column="1"
        border
        v-show="desShow"
      >
    
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              name
            </div>
          </template>
          {{ nodename }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              Telephone
            </div>
          </template>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              Place
            </div>
          </template>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              Remarks
            </div>
          </template>
          <!-- <el-tag>School</el-tag> -->
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              Address
            </div>
          </template>
          xxxxxxxxxxxxxxxxx
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
</template>

<script>
import * as vis from "vis-network";
import { graphData1, graphData2 } from "../api/index";
export default {
  name: "Home",

  data() {
    return {
      nodename: "B3",
      desShow: false,
    };
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    getData(id) {
      graphData2("./graphData" + id + ".json").then((res) => {
        // console.log(res.nodes);
        // console.log(res.edges);
        var testData = { nodes: res.nodes, edges: res.edges };
        var option1 = res.option;
        console.log(option1);
        var option = {
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

        // // legend
        // var mynetwork = document.getElementById('mynetwork');
        // var x = - mynetwork.clientWidth / 2 + 50;
        // var y = - mynetwork.clientHeight / 2 + 50;
        // var step = 5;
        // testData.nodes.push({id: 1000, x: x, y: y, label: 'Internet', group: 'internet', value: 1, fixed: true, physics:false});
        // testData.nodes.push({id: 1001, x: x, y: y + step, label: 'Switch', group: 'switch', value: 1, fixed: true,  physics:false});
        // testData.nodes.push({id: 1002, x: x, y: y + 2 * step, label: 'Server', group: 'server', value: 1, fixed: true,  physics:false});
        // testData.nodes.push({id: 1003, x: x, y: y + 3 * step, label: 'Computer', group: 'desktop', value: 1, fixed: true,  physics:false});
        // testData.nodes.push({id: 1004, x: x, y: y + 4 * step, label: 'Smartphone', group: 'mobile', value: 1, fixed: true,  physics:false});

        var network = new vis.Network(
          document.getElementById("mynetwork"),
          testData,
          option1
        );
        var self=this;
        network.on("click", function (params) {
          // params.event = "[original event]";
          if (params.nodes.length > 0) {
            console.log("thisInBefore", params);
            self.nodename = params.nodes;
            self.desShow = true;
          } else {
            console.log("thisInAfter", this);
            self.nodename = "B3";
            self.desShow = false;
          }
        });
      });
    }
  },
};
</script>

<style type="text/css">
#mynetwork {
  /* width: 80%; */
  height: 300px;
  /* margin: auto; */
  /* border: 1px solid lightgray; */
}
</style>
