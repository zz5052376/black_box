<template>
  <el-container>
    <el-aside width="200px">
      <br />
      <br />
      <br />
      <div>
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          :popper-append-to-body="false"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </div>
      <br />
      <!-- <div>
        <el-button type="primary" @click="search()">搜索</el-button>
      </div> -->
    </el-aside>
    <el-main>
      <el-row style="margin-bottom: 20px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in breadList"
            @click="openDetails(item)"
          >
            {{ item.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </el-row>
      <div ref="graph" id="graph">123</div>
    </el-main>
  </el-container>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
import SpriteText from "three-spritetext";

import {
  queryAllMods,
  queryCFGsByModuleName,
  queryBlksByModuleNameAndFunction,
  querySinpleFuctions,
} from "../api/index";

export default {
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null,
      snapshot: "aaaaa",
      breadList: [],
      t: 0,
      Graph: "",
      input: "",
      net_data: {
        nodes: [],
        links: [],
      },
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
      console.log(queryString);
      querySinpleFuctions(this.snapshot, "")
        .then((res) => {
          Object.entries(res).forEach((v) => {
            v[1].value = v[1].szFun;
          });

          var results = queryString
            ? res.filter(this.createStateFilter(queryString))
            : res;

          cb(results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1
        );
      };
    },
    handleSelect(item) {
      console.log(item);
      queryBlksByModuleNameAndFunction(
        this.snapshot,
        item.moduleName,
        item.szFun
      )
        .then(({ nodes, relations }) => {
          this.updateNodes(nodes, relations);
          Graph.graphData(this.net_data).refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    noed_click(node, event) {
      let date = new Date().getTime();
      if (date - this.t < 500) {
        console.log("~~~~~", node);
        if (node.labels === "MOD") {
          queryCFGsByModuleName(this.snapshot, node.moduleName)
            .then(({ nodes, relations }) => {
              // console.log("#####",nodes)
              this.updateNodes(nodes, relations);
              Graph.graphData(this.net_data).refresh();
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (node.labels == "CFG") {
          queryBlksByModuleNameAndFunction(
            this.snapshot,
            node.moduleName,
            node.szFun
          )
            .then(({ nodes, relations }) => {
              this.updateNodes(nodes, relations);
              Graph.graphData(this.net_data).refresh();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
        }
      }
      this.t = date;
    },

    loadModule() {
      queryAllMods(this.snapshot).then((res) => {
        this.updateNodes(res.nodes, res.relations);
      });
    },

    openDetails(item) {
      console.log(item.name);
      if (item.level == 0) {
        this.loadModule();
      } else if (item.level == 1) {
        queryCFGsByModuleName(this.snapshot, item.name)
          .then(({ nodes, relations }) => {
            this.updateNodes(nodes, relations);
            Graph.graphData(this.net_data).refresh();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    updateNodes(nodes, relations) {
      let add_tag = false;
      this.net_data.nodes.length = 0;
      //console.log(nodes)
      this.breadList = [
        {
          name: "base",
          level: 0,
        },
      ];
      Object.entries(nodes).forEach((v) => {
        if (v[1].labels === "MOD") {
          v[1].name = v[1].moduleName;
          v[1].color = "red";
        } else if (v[1].labels === "CFG") {
          v[1].color = "yellow";
          if (!add_tag) {
            this.breadList.push({ name: v[1].moduleName, level: 1 });
            add_tag = true;
          }
        } else {
          v[1].color = "green";
          if (!add_tag) {
            this.breadList.push({ name: v[1].moduleName, level: 1 });
            this.breadList.push({ name: v[1].szFun, level: 2 });
            add_tag = true;
          }
        }
        this.net_data.nodes.push(v[1]);
      });
      console.log("nodes size:", this.net_data.nodes.length);
      this.net_data.links.length = 0;
      relations.forEach((v) => {
        this.net_data.links.push({
          source: v.startNode,
          target: v.endNode,
          type: v.type,
          value: v.covTime,
        });
      });
      console.log("links size:", this.net_data.links.length);
      this.Graph.graphData(this.net_data).refresh();
    },
  },
  mounted() {
    this.Graph = ForceGraph3D()(document.getElementById("graph"))
      .graphData(this.net_data)
      .width(1000)
      .height(450)
      .onNodeClick(this.noed_click)
      // .nodeAutoColorBy("group")
      .nodeThreeObject((node) => {
        const sprite = new SpriteText(node.name);
        // sprite.material.depthWrite = false; // make sprite background transparent
        sprite.color = "white";
        sprite.textHeight = 8;
        sprite.position.y = -10;
        return sprite;
      })
      .nodeThreeObjectExtend(true);

    this.loadModule();
  },
};
</script>

<style>
.el-autocomplete-suggestion {
  width: auto !important;
}
</style>