<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template v-slot:title="title"
              ><i class="el-icon-message"></i>导航一</template
            >
            <el-menu-item-group>
              <template v-slot:title="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template v-slot:title="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template v-slot:title="title"
              ><i class="el-icon-menu"></i>导航二</template
            >
            <el-menu-item-group>
              <template v-slot:title="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template v-slot:title="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template v-slot:title="title"
              ><i class="el-icon-setting"></i>导航三</template
            >
            <el-menu-item-group>
              <template v-slot:title="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template v-slot:title="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
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

          <el-table :data="tableData" @row-click="openDetails">
            <el-table-column prop="name" label="数据名" width="700px">
            </el-table-column>
            <el-table-column prop="address" label="覆盖率">
              <template #default="scope">
                <el-progress
                  :percentage="(scope.row.x / scope.row.y) * 100"
                ></el-progress>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      currentNum: -1,
      breadList: [
        {
          name: "base",
          id: -1,
        },
      ],
      tableData: [],
      oriDate: [
        {
          id: 0,
          parentId: -1,
          name: "data1",
          x: 100,
          y: 100,
        },
        {
          id: 1,
          parentId: -1,
          name: "data2",
          x: 100,
          y: 100,
        },
        {
          id: 2,
          parentId: 0,
          name: "data2",
          x: 40,
          y: 100,
        },
        {
          id: 3,
          parentId: 0,
          name: "data3",
          x: 60,
          y: 100,
        },
        {
          id: 4,
          parentId: 2,
          name: "data4",
          x: 40,
          y: 100,
        },
        {
          id: 5,
          parentId: 1,
          name: "data5",
          x: 60,
          y: 100,
        },
      ],
    };
  },

  methods: {
    isInArray(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (value.id === arr[i].id) {
          return i;
        }
      }
      return -1;
    },

    openDetails(row) {
      this.currentNum = row.id;

      let num = this.isInArray(this.breadList, row);
      if (num == -1) {
        this.breadList.push({ name: row.name, id: row.id });
      } else {
        let li = [];

        this.breadList.forEach((v, i) => {
          if (i <= num) {
            li.push(v);
          }
        }, this);
        this.breadList = li;
      }

      this.updateTable();
    },

    updateTable() {
      this.tableData = [];
      this.oriDate.forEach((v, i) => {
        if (v.parentId == this.currentNum) {
          this.tableData.push(v);
        }
      }, this);
    },
  },

  mounted() {
    this.updateTable();
  },
};
</script>