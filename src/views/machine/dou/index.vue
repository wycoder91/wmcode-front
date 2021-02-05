<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="机型名称" prop="maCode">
        <el-select v-model="queryParams.maCode" placeholder="请选择机型名称" clearable size="small">
          <el-option
            v-for="dict in nameOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="铲斗名称" prop="maDoucode">
        <el-select v-model="queryParams.maDoucode" placeholder="请选择铲斗名称" clearable size="small">
          <el-option
            v-for="dict in douOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="具体内容" prop="maDoucontent">
        <el-input
          v-model="queryParams.maDoucontent"
          placeholder="请输入具体内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
		  plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['machine:dou:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
		  plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['machine:dou:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
		  plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['machine:dou:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
		  plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['machine:dou:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="douList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="maId" v-if="false" />
      <el-table-column label="机型名称" align="center" prop="maName"  :formatter="matypeFormat" />
      <el-table-column label="铲斗名称" align="center" prop="maDouname" :formatter="doutypeFormat" />
      <el-table-column label="具体内容" align="center" prop="maDoucontent" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['machine:dou:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['machine:dou:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改铲斗类型对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="机型名称" prop="maCode">
          <el-select v-model="form.maCode" placeholder="请选择机型名称" @change="selectName" >
             <el-option
            v-for="dict in nameOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
          </el-select>
        </el-form-item>
        <el-form-item label="铲斗名称" prop="maDoucode">
          <el-select v-model="form.maDoucode" placeholder="请选择铲斗名称" @change="selectDou">
           <el-option
            v-for="dict in douOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
          </el-select>
        </el-form-item>
        <el-form-item label="具体内容" prop="maDoucontent">
          <el-input v-model="form.maDoucontent" placeholder="请输入具体内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDou, getDou, delDou, addDou, updateDou, exportDou } from "@/api/machine/dou";

export default {
  name: "Dou",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 铲斗类型表格数据
      douList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //机型
      nameOptions: [],
      //斗型
      douOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        maName: null,
        maDouname: null,
        maDoucontent: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_machine_name").then(response => {
      this.nameOptions = response.data;
    });
      this.getDicts("sys_dou_type").then(response => {
      this.douOptions = response.data;
    });
  },
  methods: {
    /** 查询铲斗类型列表 */
    getList() {
      this.loading = true;
      listDou(this.queryParams).then(response => {
        this.douList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        maId: null,
        maCode: null,
        maName: null,
        maDoucode: null,
        maDouname: null,
        maDoucontent: null,
        maNote1: null,
        maNote2: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.maId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
     //机型
    matypeFormat(row, column) {
      return this.selectDictLabel(this.nameOptions, row.maCode);
    },
      //斗类
    doutypeFormat(row, column) {
      return this.selectDictLabel(this.douOptions, row.maDoucode);
    },
    //机型选择
    selectName(value){
      var index=value-1;
     this.form.maName=this.nameOptions[index].dictLabel
      
    },
    // 铲斗选择   selectDou
    selectDou(value){
      var index=value-1;
     this.form.maDouname=this.douOptions[index].dictLabel
      
    },

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加铲斗类型";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const maId = row.maId || this.ids
      getDou(maId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改铲斗类型";
      });
    },
    /** 提交按钮 */
    submitForm() {
      if(this.form.maDoucode!='8'){
        this.form.maNote1=this.form.maDoucontent+""+this.form.maDouname;
      }else{
        this.form.maNote1=this.form.maDoucontent;
      }
    
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.maId != null) {
            updateDou(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDou(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const maIds = row.maId || this.ids;
      this.$confirm('是否确认删除数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDou(maIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有铲斗类型数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportDou(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
