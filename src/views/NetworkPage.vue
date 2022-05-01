<template>
  <el-container>
    <el-aside width="200px">
      <div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <br />
      <div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <br />
      <div>
        <el-button type="primary">搜索</el-button>
      </div>
    </el-aside>
    <el-main><div ref="graph" id="graph">123</div></el-main>
  </el-container>
</template>

<script>
import ForceGraph3D from "3d-force-graph";

export default {
  data() {
    return {
      t: 0,
      Graph: "",
      input: "",
      click_node: {
        a: {
          nodes: [
            { id: "aa", group: 2, lab: "a" },
            { id: "ab", group: 2, lab: "a" },
            { id: "ac", group: 2, lab: "a" },
            { id: "ad", group: 2, lab: "a" },
          ],
          links: [
            { source: "a", target: "aa", lab: "a" },
            { source: "a", target: "ab", lab: "a" },
            { source: "a", target: "ac", lab: "a" },
            { source: "a", target: "ad", lab: "a" },
          ],
        },
        b: {
          nodes: [
            { id: "ba", group: 2, lab: "b" },
            { id: "bb", group: 2, lab: "b" },
            { id: "bc", group: 2, lab: "b" },
            { id: "bd", group: 2, lab: "b" },
          ],
          links: [
            { source: "b", target: "ba", lab: "b" },
            { source: "b", target: "bb", lab: "b" },
            { source: "b", target: "bc", lab: "b" },
            { source: "b", target: "bd", lab: "b" },
          ],
        },
      },
      net_data: {
        nodes: [
          { id: "a", group: 1, isopen: false },
          { id: "b", group: 1, isopen: false },
          { id: "c", group: 1, isopen: false },
          { id: "d", group: 1, isopen: false },
          { id: "e", group: 1, isopen: false },
          { id: "f", group: 1, isopen: false },
        ],
        links: [
          { source: "a", target: "b", value: 1 },
          { source: "b", target: "c", value: 8 },
          { source: "b", target: "d", value: 10 },
          { source: "c", target: "e", value: 10 },
          { source: "e", target: "f", value: 10 },
        ],
      },
    };
  },
  methods: {
    noed_click(node, event) {
      let date = new Date().getTime();
      if (date - this.t < 500) {
        let add_node = this.click_node[node.id];
        if (add_node === "undefined") {
        } else {
          console.log(node.isopen);
          if (node.isopen == false) {
            add_node.nodes.forEach((v, i) => {
              this.net_data.nodes.push(v);
            }, this);
            add_node.links.forEach((v, i) => {
              this.net_data.links.push(v);
            }, this);
            this.Graph.graphData(this.net_data).refresh();
          } else {
              
          }

          node.isopen = !node.isopen;
        }
      }
      this.t = date;
    },
  },
  mounted() {
    this.Graph = ForceGraph3D()(document.getElementById("graph"))
      .graphData(this.net_data)
      .width(1000)
      .height(450)
      .onNodeClick(this.noed_click)
      .nodeAutoColorBy("group");
  },
};
</script>

