<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input
          v-model="query.name"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="id"
          label="NO."
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column prop="remark" label="Remark"></el-table-column>
        <el-table-column prop="component" label="Component"></el-table-column>
        <el-table-column prop="api" label="Risk API"></el-table-column>
        <el-table-column prop="assets" label="Assets"></el-table-column>
        <el-table-column prop="summary" label="Summary"></el-table-column>
        <el-table-column prop="detail" label="Detail"></el-table-column>
        <el-table-column prop="coverage" label="Coverage"></el-table-column>
        <el-table-column prop="md5" label="MD5"></el-table-column>
        <el-table-column prop="confirm" label="人工确认"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { fetchData } from "../api/index";

export default {
  name: "cfgtable",
  setup() {
    const query = reactive({
      address: "",
      name: "",
      pageIndex: 1,
      pageSize: 10,
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      fetchData(query).then((res) => {
        tableData.value = res.list;
        pageTotal.value = res.pageTotal || 50;
      });
    };
    getData();

    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      getData();
    };
    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      getData();
    };


    return {
      query,
      tableData,
      pageTotal,
      handleSearch,
      handlePageChange,
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 05px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 20px;
}
</style>
