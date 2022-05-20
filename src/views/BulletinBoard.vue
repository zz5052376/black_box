<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <el-steps :active="4" align-center>
            <el-step title="版本1" description="描述信息"></el-step>
            <el-step title="版本2" description="描述信息"></el-step>
            <el-step title="版本3" description="描述信息"></el-step>
            <el-step title="版本4" description="描述信息"></el-step>
          </el-steps>
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
      <el-col :span="12">
        <el-card shadow="hover"> 用例信息 </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="main">版本对比信息</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
import { reactive } from "vue";

import * as echarts from "echarts";

export default {
  name: "dashboard",
  components: { Schart },
  mounted() {
    console.log("mounted");
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);

    myChart.setOption({
      title: { text: "在Vue中使用echarts" },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  },
  setup() {
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

    return {
      name,
      options,
      options2,
      todoList,
      role,
    };
  },
};
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
