<template>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 攻击路径
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <c-table/>
    <div id="graph">
    <c-graph/>
    </div>
</template>
<script>
import cTable from "./CfgTable.vue";
import cGraph from "./CfgGraph.vue";
export default {
  components: {
    cTable,
    cGraph,
  },
  }
</script> 

<style type="text/css">
#graph {
  width: 100%;
  border: 1px solid lightgray;
  background-color: white;
}
</style>