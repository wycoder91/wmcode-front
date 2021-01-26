<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="代号" prop="maCode">
        <el-input
          v-model="queryParams.maCode"
          placeholder="请输代号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="maName">
        <el-input
          v-model="queryParams.maName"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="含义描述" prop="maDes">
        <el-input
          v-model="queryParams.maDes"
          placeholder="请输入含义描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="位次" prop="maType">
        <el-input
          v-model="queryParams.maType"
          placeholder="请输入位次"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="位次" prop="maType">
        <el-select
          v-model="queryParams.maType"
          placeholder="位次选择"
          clearable
          size="small"         
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="可选配类" prop="maOptional">
        <el-select
          v-model="queryParams.maOptional"
          placeholder="类别选择"
          clearable
          size="small"       
        >
          <el-option
            v-for="dict in maOptionals"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="备用1" prop="maNote1">
        <el-input
          v-model="queryParams.maNote1"
          placeholder="请输入备用1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="备用2" prop="maNote2">
        <el-input
          v-model="queryParams.maNote2"
          placeholder="请输入备用2"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['machine:info:add']"
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
          v-hasPermi="['machine:info:edit']"
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
          v-hasPermi="['machine:info:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
		  plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['machine:info:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="maId" v-if="false" />
      <el-table-column label="位次" align="center" prop="maType"  :formatter="matypeFormat"/>
      <el-table-column label="代号" align="center" prop="maCode" />
      <el-table-column label="名称" align="center" prop="maName" />
      <el-table-column label="可选配置类" align="center" prop="maOptional" :formatter="maoptionalFormat" />
      <el-table-column label="含义描述" align="center" prop="maDes" /> 
      <el-table-column label="创建人" align="center" prop="maCreater" /> 
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['machine:info:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['machine:info:remove']"
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

    <!-- 添加或修改基础信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="位次" prop="maType">
          <el-input v-model="form.maType" placeholder="请输入类型" />
        </el-form-item> -->
        <el-form-item label="位次" prop="maType">
        <el-select id="select"
          v-model="form.maType"
          placeholder="位次选择"
          clearable
          size="small"
          v-bind:disabled="disabledInput"
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="可选配类" prop="maOptional">
        <el-select
          v-model="form.maOptional"
          placeholder="类别选择"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in maOptionals"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
        <el-form-item label="代号" prop="maCode">
          <el-input v-model="form.maCode" placeholder="请输入代号"  style=" width: 195px"/>
        </el-form-item>
        <el-form-item label="名称" prop="maName">
          <el-input v-model="form.maName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="含义描述" prop="maDes">
          <el-input v-model="form.maDes" placeholder="请输入含义描述" />
        </el-form-item>
        
        <!-- <el-form-item label="备用1" prop="maNote1">
          <el-input v-model="form.maNote1" placeholder="请输入备用1" />
        </el-form-item>
        <el-form-item label="备用2" prop="maNote2">
          <el-input v-model="form.maNote2" placeholder="请输入备用2" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInfo, getInfo, delInfo, addInfo, updateInfo, exportInfo } from "@/api/machine/info";

export default {
  name: "Info",
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
      // 基础信息表格数据
      infoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //位次
      typeOptions:[],
      //可选配置类
      maOptionals:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        maCode:null,
        maName: null,
        maDes: null,
        maType: null,
        maOptional:null,
        maNote1: null,
        maNote2: null
      },
      // 表单参数
      form: {},
      //选中行
      roww:null,
      // 表单校验
      rules: {
        maCode: [
          { required: true, message: "代号不能为空", trigger: "blur" }
        ],
        maName: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        maType: [
          { required: true, message: "位次不能为空", trigger: "blur" }
        ],
        maOptional: [
          { required: true, message: "可选配置类不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_machine_type").then(response => {
      this.typeOptions = response.data;
    });
    this.getDicts("sys_ma_op").then(response => {
      this.maOptionals = response.data;
    });
  },
  methods: {
    /** 查询基础信息列表 */
    getList() {
      this.loading = true;
      listInfo(this.queryParams).then(response => {
        this.infoList = response.rows;
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
        maCode:null,
        maName: null,
        maDes: null,
        maType: null,
        maOptional:null,
        maNote1: null,
        maNote2: null
      };
      this.resetForm("form");
    },
    //位次
    matypeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.maType);
    },
    //可选配置类 
     maoptionalFormat(row, column) {
      return this.selectDictLabel(this.maOptionals, row.maOptional);
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
      this.ids = selection.map(item => item.maId+"."+item.maType);
      this.single = selection.length!==1;
      this.multiple = !selection.length;
      this.roww=selection.maId;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.disabledInput=false;
      this.title = "添加基础信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
    
      //const maIds = row.maId || this.ids;
      this.reset();
      var maId;
      if(this.ids.length==1){
           maId=this.ids;
      }else{

        maId= row.maId+"."+row.maType;
      }
      //const maId = row.maId+"."+row.maType
      
      getInfo(maId).then(response => {       
        this.form = response.data;
        this.open = true;
        this.disabledInput=true;
        this.title = "修改基础信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.maId != null) {
            updateInfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInfo(this.form).then(response => {
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
      var maIds2;
      if(this.ids.length>0&&row.maId==undefined){
        maIds2=this.ids
      }else{
        maIds2=row.maId+"."+row.maType;
      }
      this.$confirm('是否确认删除基础信息的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delInfo(maIds2);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有基础信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportInfo(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
