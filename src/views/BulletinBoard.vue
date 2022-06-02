<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card shadow="hover">
          <el-descriptions title="总体覆盖率" column="3" direction="vertical">
            <el-descriptions-item label="函数覆盖率"
              ><div style="height: 150px">
                <el-progress
                  color="#f1c40f"
                  type="circle"
                  stroke-width="15"
                  :percentage="setItemProgress(overallCoverage.function)"
                  :format="format(overallCoverage.function)"
                ></el-progress></div
            ></el-descriptions-item>

            <el-descriptions-item label="代码行覆盖率"
              ><div style="height: 150px">
                <el-progress
                  color="#1abc9c"
                  type="circle"
                  stroke-width="15"
                  :percentage="setItemProgress(overallCoverage.row)"
                  :format="format(overallCoverage.row)"
                ></el-progress></div
            ></el-descriptions-item>

            <el-descriptions-item label="条件覆盖率"
              ><div style="height: 150px">
                <el-progress
                  color="#3498db"
                  type="circle"
                  stroke-width="15"
                  :percentage="setItemProgress(overallCoverage.condition)"
                  :format="format(overallCoverage.condition)"
                ></el-progress></div
            ></el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>

      <el-col :span="14">
        <el-card shadow="hover">
          <el-descriptions title="各模块覆盖率" column="1">
            <el-descriptions-item>
              <el-row :gutter="20">
                <el-col :span="4"> </el-col>
                <el-col :span="5"> 函数 </el-col>
                <el-col :span="5"> 代码行 </el-col>
                <el-col :span="5"> 条件 </el-col>
              </el-row>
              <div
                style="overflow-y: scroll; overflow-x: hidden; height: 120px"
              >
                <el-row :gutter="20" v-for="item in moduleData">
                  <el-col :span="4"> {{ item[0] }} </el-col>
                  <el-col :span="5">
                    <el-progress
                      color="#f1c40f"
                      :text-inside="true"
                      :stroke-width="20"
                      :percentage="setItemProgress(item[1])"
                      :format="format(item[1])"
                    ></el-progress>
                  </el-col>
                  <el-col :span="5">
                    <el-progress
                      color="#1abc9c"
                      :text-inside="true"
                      :stroke-width="20"
                      :percentage="setItemProgress(item[2])"
                      :format="format(item[2])"
                    ></el-progress>
                  </el-col>
                  <el-col :span="5">
                    <el-progress
                      color="#3498db"
                      :text-inside="true"
                      :stroke-width="20"
                      :percentage="setItemProgress(item[3])"
                      :format="format(item[3])"
                    ></el-progress>
                  </el-col>
                </el-row></div
            ></el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <div style="height: 195px">
            <el-descriptions title="代码量信息" column="1">
              <el-descriptions-item label="代码行数:"
                >{{code.lineNum}}行</el-descriptions-item
              >
              <el-descriptions-item label="代码重复率:"
                >{{code.repetitionRate}}%</el-descriptions-item
              >
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-descriptions title="寄存器覆盖率" column="1">
            <el-descriptions-item
              ><div style="height: 120px">
                <el-progress
                  color="#9b59b6"
                  type="circle"
                  stroke-width="15"
                  :percentage="setItemProgress(registerCoverage)"
                  :format="format(registerCoverage)"
                ></el-progress></div
            ></el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card shadow="hover">
          <el-descriptions title="关键资产信息" column="1">
            <el-descriptions-item>
              <div style="height: 120px">
                <el-row :gutter="20">
                  <el-col :span="5">总体覆盖率</el-col>
                  <el-col :span="15">
                    <el-progress
                      color="#006266"
                      :text-inside="true"
                      :stroke-width="20"
                      :percentage="
                        setItemProgress(keyAssetsCoverage.population)
                      "
                      :format="format(keyAssetsCoverage.population)"
                    ></el-progress>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="5">路径覆盖率</el-col>
                  <el-col :span="15">
                    <el-progress
                      color="#9980FA"
                      :text-inside="true"
                      :stroke-width="20"
                      :percentage="setItemProgress(keyAssetsCoverage.route)"
                      :format="format(keyAssetsCoverage.route)"
                    ></el-progress>
                  </el-col>
                </el-row></div
            ></el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="用例编号"> </el-table-column>
            <el-table-column prop="name" label="用例名"> </el-table-column>
            <el-table-column prop="platform" label="用例平台">
            </el-table-column>
            <el-table-column prop="explain" label="用例说明"> </el-table-column>
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Schart from "vue-schart";
import * as echarts from "echarts";

import { ref, reactive, onMounted } from "vue";

import {
  caseData,
  keyAssetsCoverageData,
  moduleCoverageData,
  registerCoverageData,
  codeData
} from "../api/index";

const pageTotal = ref(0);

const query = reactive({
  id: "",
  name: "",
  platform: "",
  explain: "",
  pageIndex: 1,
  pageSize: 5,
});

const code = ref({
  lineNum:"",
  repetitionRate:"",
});

const getcodeData = () => {
  // 获取关键资产覆盖率
  codeData().then((res) => {
    code.value = res;
  });
};
getcodeData()

const registerCoverage = ref([1, 1]); // 寄存器覆盖率

const getregisterCoverageData = () => {
  // 获取关键资产覆盖率
  registerCoverageData().then((res) => {
    registerCoverage.value = res;
  });
};
getregisterCoverageData()

const overallCoverage = ref({
  function: [1, 1],
  row: [1, 1],
  condition: [1, 1],
}); // 总体覆盖率

const moduleData = ref(); // 模块覆盖率

const getmoduleCoverageData = () => {
  // 获取关键资产覆盖率
  moduleCoverageData().then((res) => {
    moduleData.value = res;
    overallCoverage.value = {
      function: [0, 0],
      row: [0, 0],
      condition: [0, 0],
    };
    res.forEach((item, index, arr) => {
      console.log(index + ":" + item);
      overallCoverage.value.function[0] += item[1][0]
      overallCoverage.value.function[1] += item[1][1]

      overallCoverage.value.row[0] += item[2][0]
      overallCoverage.value.row[1] += item[2][1]

      overallCoverage.value.condition[0] += item[3][0]
      overallCoverage.value.condition[1] += item[3][1]
    });
  });
};
getmoduleCoverageData();

const keyAssetsCoverage = ref({
  population: [1, 1],
  route: [1, 1],
}); // 关键资产覆盖率

const getkeyAssetsCoverageData = () => {
  // 获取关键资产覆盖率
  keyAssetsCoverageData().then((res) => {
    keyAssetsCoverage.value = res;
  });
};
getkeyAssetsCoverageData();

const tableData = ref(); // 用例信息

const getTableData = () => {
  // 获取用例信息
  caseData(query).then((res) => {
    tableData.value = res.list;
    pageTotal.value = res.pageTotal || 10;
  });
};
getTableData();

const handlePageChange = (val) => {
  query.pageIndex = val;
  getTableData();
};

function setItemProgress(data) {
  return (data[0] / data[1]).toFixed(4) * 100;
}

function format(data) {
  let num = data[0] / data[1];
  num = Math.round(num * 10000) / 100;
  return () => {
    return `${num}%` + "\n(" + data[0] + "/" + data[1] + ")";
  };
}
</script>


<style>
.el-progress__text {
  white-space: pre;
}

.el-progress-bar__outer {
  background-color: #a7a7a7;
}

.mode-name {
  width: 100px;
}

.mode-percentage {
  width: 500px;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>