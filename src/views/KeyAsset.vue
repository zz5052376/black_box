<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 关键资产
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-row style="margin-bottom: 20px">
        <el-button type="primary" @click="add">添加</el-button>
      </el-row>

      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <!-- <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column> -->
        <el-table-column prop="name" label="函数名"></el-table-column>
        <el-table-column prop="author" label="创建人"></el-table-column>
        <el-table-column prop="gratetime" label="创建时间"></el-table-column>
        <el-table-column prop="updatetime" label="修改时间"></el-table-column>
        <el-table-column prop="updateinfo" label="修改信息"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="sign" label="标志位"></el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
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

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="函数名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.author" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.gratetime" readonly></el-input>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-input v-model="form.updatetime" readonly></el-input>
        </el-form-item>
        <el-form-item label="修改信息">
          <el-input v-model="form.updateinfo" readonly></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.state"></el-input>
        </el-form-item>
        <el-form-item label="标志位">
          <el-input v-model="form.sign"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加弹出框 -->
    <el-dialog title="添加" v-model="addVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="函数名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.gratetime"></el-input>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-input v-model="form.updatetime"></el-input>
        </el-form-item>
        <el-form-item label="修改信息">
          <el-input v-model="form.updateinfo"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.state"></el-input>
        </el-form-item>
        <el-form-item label="标志位">
          <el-input v-model="form.sign"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData2 } from "../api/index";

export default {
  name: "basetable",
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
      fetchData2(query).then((res) => {
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

    // 添加操作
    const add = () => {
      Object.keys(form).forEach((item) => {
        form[item] = "";
      });
      addVisible.value = true;
    };

    // 保存添加
    const saveAdd = () => {
      tableData.value.push(form);
      addVisible.value = false;
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          ElMessage.success("删除成功");
          tableData.value.splice(index, 1);
        })
        .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    const addVisible = ref(false);
    let form = reactive({
      id: 0,
      name: "",
      author: "",
      gratetime: "",
      updatetime: "",
      updateinfo: "",
      describe: "",
      state: "",
      sign: "",
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        console.log(row[item]);
        form[item] = row[item];
      });
      editVisible.value = true;
    };
    const saveEdit = () => {
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
      });
    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      addVisible,
      form,
      handleSearch,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,
      add,
      saveAdd,
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
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
  height: 40px;
}
</style>
