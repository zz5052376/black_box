<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="版本1" description="描述信息"></el-step>
            <el-step
              title="版本2"
              description="描述信息"
              @click="next(1, 0)"
            ></el-step>
            <el-step
              title="版本3"
              description="描述信息"
              @click="next(2, 1)"
            ></el-step>
            <el-step
              title="版本4"
              description="描述信息"
              @click="next(3, 2)"
            ></el-step>
            <el-step
              title="版本5"
              description="描述信息"
              @click="next(4, 3)"
            ></el-step>
          </el-steps>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div id="versioncomparison" style="height: 300px; width: 1200px">
            版本对比信息
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="bar"
            class="schart"
            canvasId="bar"
            :options="options"
          ></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="line"
            class="schart"
            canvasId="line"
            :options="options2"
          ></schart>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="用例名" width="300px">
            </el-table-column>
            <el-table-column prop="name" label="版本" width="300px">
            </el-table-column>
            <el-table-column prop="address" label="用例详情" width="300px">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Schart from "vue-schart";
import * as echarts from "echarts";

import { ref, reactive, onMounted } from "vue";

const active = ref(1);
const myChart = ref(null);
const tableData = ref([
  {
    date: "用例1",
    name: "版本1",
    address: "说明1",
  },
  {
    date: "用例2",
    name: "版本2",
    address: "说明2",
  },
  {
    date: "用例3",
    name: "版本3",
    address: "说明3",
  },
  {
    date: "用例4",
    name: "版本4",
    address: "说明4",
  },
]);

const dataversion = ref({
  0: [
    [500, 0, "aaa"],
    [302, 1, "bbb"],
    [341, 2, "ccc"],
    [374, 3, "ddd"],
    [390, 4, "eee"],
    [450, 5, "fff"],
    [420, 6, "ggg"],
  ],
  1: [
    [500, 0, "aaa"],
    [200, 1, "bbb"],
    [101, 2, "ccc"],
    [134, 3, "ddd"],
    [190, 4, "eee"],
    [230, 5, "fff"],
    [210, 6, "ggg"],
  ],
  2: [
    [500, 0, "aaa"],
    [132, 1, "bbb"],
    [101, 2, "ccc"],
    [134, 3, "ddd"],
    [190, 4, "eee"],
    [230, 5, "fff"],
    [210, 6, "ggg"],
  ],
  3: [
    [500, 0, "aaa"],
    [180, 1, "bbb"],
    [200, 2, "ccc"],
    [300, 3, "ddd"],
    [250, 4, "eee"],
    [400, 5, "fff"],
    [220, 6, "ggg"],
  ],
  4: [
    [500, 0, "aaa"],
    [132, 1, "bbb"],
    [101, 2, "ccc"],
    [134, 3, "ddd"],
    [190, 4, "eee"],
    [230, 5, "fff"],
    [210, 6, "ggg"],
  ],
});

const option = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  title: {
    text: "版本对比信息",
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      saveAsImage: {
        show: true,
        pixelRatio: 1,
        title: "保存图片",
        type: "png",
        lang: ["点击保存"],
      },
    },
  },
  legend: {
    data: ["当前版本", "前一版本"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "value",
      axisLabel: {
        //把x轴的负数改成正数，毕竟对比不需要负数，如果需要负数把axisLabel删掉就行
        formatter: function (value) {
          if (value < 0) {
            return -value;
          } else {
            return value;
          }
        },
      },
    },
  ],
  yAxis: [
    {
      type: "category",
      axisTick: {
        show: false,
      },
      data: ["数据1", "数据2", "数据3", "数据4", "数据5", "数据6", "数据7"],
    },
  ],
  color: ["#3E95F5", "#F77A4D"],
  series: [
    {
      name: "前一版本",
      type: "bar",
      stack: "Total",
      label: {
        show: true,
        color: "#fff",
        formatter: function (value) {
          return value.data[2];
        },
      },
      emphasis: {
        focus: "series",
      },
      data: [
        [500, 0, "aaa"],
        [302, 1, "bbb"],
        [341, 2, "ccc"],
        [374, 3, "ddd"],
        [390, 4, "eee"],
        [450, 5, "fff"],
        [420, 6, "ggg"],
      ],
    },
    {
      name: "当前版本",
      type: "bar",
      stack: "Total",
      label: {
        show: true,
        // position: 'left',
        color: "#fff",
        formatter: function (value) {
          //数据转换
          return value.data[2];
        },
      },
      emphasis: {
        focus: "series",
      },
      data: [
        [-500, 0, "aaa"],
        [-132, 1, "bbb"],
        [-101, 2, "ccc"],
        [-134, 3, "ddd"],
        [-190, 4, "eee"],
        [-230, 5, "fff"],
        [-210, 6, "ggg"],
      ],
    },
  ],
});

const name = localStorage.getItem("ms_username");
const role = name === "admin" ? "超级管理员" : "普通用户";

const options = {
  type: "bar",
  title: {
    text: "覆盖率信息",
  },
  xRorate: 25,
  labels: ["版本1", "版本2", "版本3", "版本4", "版本5"],
  datasets: [
    {
      label: "模块1",
      data: [30, 20, 50, 10, 20],
    },
    {
      label: "模块2",
      data: [20, 30, 20, 40, 50],
    },
    {
      label: "模块3",
      data: [10, 30, 20, 20, 10],
    },
  ],
};
const options2 = {
  type: "line",
  title: {
    text: "版本覆盖率变化曲线",
  },
  labels: ["一周", "两周", "三周", "四周", "五周"],
  datasets: [
    {
      label: "版本1",
      data: [50, 60, 70, 60, 80],
    },
    {
      label: "版本2",
      data: [30, 70, 50, 30, 70],
    },
    {
      label: "版本3",
      data: [90, 50, 60, 50, 90],
    },
  ],
};
const todoList = reactive([
  {
    title: "今天要修复100个bug",
    status: false,
  },
  {
    title: "今天要修复100个bug",
    status: false,
  },
  {
    title: "今天要写100行代码加几个bug吧",
    status: false,
  },
  {
    title: "今天要修复100个bug",
    status: false,
  },
  {
    title: "今天要修复100个bug",
    status: true,
  },
  {
    title: "今天要写100行代码加几个bug吧",
    status: true,
  },
]);

onMounted(() => {
  var chartDom = document.getElementById("versioncomparison");
  myChart.value = echarts.init(chartDom);

  option.value.series[0].data = dataversion.value[0];
  option.value.series[1].data = datareversal(dataversion.value[1]);

  myChart.value.setOption(option.value);
});

function datareversal(data) {
  let res_data = JSON.parse(JSON.stringify(data));
  for (var key in data) {
    res_data[key][0] = -data[key][0];
  }
  return res_data;
}

function next(num, num2) {
  active.value = num;
  option.value.series[0].data = this.dataversion[num2];
  option.value.series[1].data = datareversal(this.dataversion[num]);
  myChart.value.setOption(this.option);
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
