<template>
  <div>
    <h3>~~请选择配置生成整机编码~~</h3>
    <h4>标准配置项:</h4>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="产品机种:" prop="field_product_type">
        <el-radio-group v-model="formData.field_product_type" size="medium">
          <el-radio v-for="(item, index) in field_product_typeOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="传动方式:" prop="field_trans_style">
        <el-radio-group v-model="formData.field_trans_style" size="medium">
          <el-radio v-for="(item, index) in field_trans_styleOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="吨位:" prop="field_tonnage">
        <el-radio-group v-model="formData.field_tonnage" size="medium">
          <el-radio v-for="(item, index) in field_tonnageOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="轴距:" prop="field_wheel">
        <el-radio-group v-model="formData.field_wheel" size="medium">
          <el-radio v-for="(item, index) in field_wheelOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="特殊代号:" prop="field_special">
        <el-radio-group v-model="formData.field_special" size="medium">
          <el-radio v-for="(item, index) in field_specialOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="动力形式:" prop="field_dynamic_forms">
        <el-radio-group v-model="formData.field_dynamic_forms" size="medium">
          <el-radio v-for="(item, index) in field_dynamic_formsOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排放代号:" prop="field_discharge">
        <el-radio-group v-model="formData.field_discharge" size="medium">
          <el-radio v-for="(item, index) in field_dischargeOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="配置升级:" prop="field_upgrade">
        <el-radio-group v-model="formData.field_upgrade" size="medium">
          <el-radio v-for="(item, index) in field_upgradeOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="版式:" prop="field_format">
        <el-radio-group v-model="formData.field_format" size="medium">
          <el-radio v-for="(item, index) in field_formatOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发动机:" prop="field_engine">
        <el-radio-group v-model="formData.field_engine" size="medium">
          <el-radio v-for="(item, index) in field_engineOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="变速箱:" prop="field_transmission">
        <el-radio-group v-model="formData.field_transmission" size="medium">
          <el-radio v-for="(item, index) in field_transmissionOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="动臂:" prop="field_boom">
        <el-radio-group v-model="formData.field_boom" size="medium">
          <el-radio v-for="(item, index) in field_boomOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="铲斗:" prop="field_bucket">
        <el-radio-group v-model="formData.field_bucket" size="medium">
          <el-radio v-for="(item, index) in field_bucketOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="操控方式:" prop="field_operate_mode">
        <el-radio-group v-model="formData.field_operate_mode" size="medium">
          <el-radio v-for="(item, index) in field_operate_modeOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="销售代号:" prop="field_sale">
        <el-radio-group v-model="formData.field_sale" size="medium">
          <el-radio v-for="(item, index) in field_saleOptions" :key="index" :label="item.codeNum+':'+item.description"
            :disabled="item.disabled">{{item.description}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <hr width="97%"/>

      <!-- <el-form-item label="可选配置项:"></el-form-item> -->
      <h4>可选配置项:</h4>


      <el-form-item label="任意组合类:" prop="checkbox_optional">
        <el-checkbox-group v-model="formData.checkbox_optional" size="medium">
          <el-checkbox v-for="(item, index) in field_optionalOptions" :key="index" :label="item.description"
           v-if="item.category == '1'" :disabled="item.disabled">{{item.description}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    </el-form>

    <div class="container">
      <collapse>
       <div style="margin-left:100px;" class="container" v-show="isActive">
         <el-form>
         <el-form-item  v-for="n in optional_max_category" v-if="n > 1" :label="(m=n-1).toString()+' 类:'" prop="radio_optional">
          <el-radio-group v-model="formData.radio_optional[n-2]" size="medium">
          <el-radio v-for="(item, index) in field_optionalOptions" :key="index" :label="item.description"
            v-if="item.category == n.toString()" :disabled="item.disabled">{{item.description}}</el-radio>
          </el-radio-group>
         </el-form-item>
         </el-form>
       </div>
      </collapse>
      <el-button @click="isActive = !isActive" type="text"
      style="margin-left:18px;
      margin-bottom:10px;
      color: #000000;
      font-weight: bold;">
        {{word}}
        <i :class="isActive ? 'el-icon-arrow-up ': 'el-icon-arrow-down'"></i>
      </el-button>
      </div>
      <!-- <el-form-item size="medium">
        <el-button type="primary" @click="getLoaderInfo">新增整机编码</el-button>
        <el-button type="primary" @click="resetForm">恢复默认配置</el-button>
        <el-button type="primary" @click="resetOptionalForm">重置可选配置</el-button>
      </el-form-item> -->

    <el-row :gutter="10" class="mb8" style="margin-left:100px;">
      <el-col :span="1.5">
        <el-button
          type="primary"

          @click="getLoaderInfo"

        >新增整机编码</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"

          @click="resetForm"

        >恢复默认配置</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"

          @click="resetOptionalForm"

        >重置可选配置</el-button>
      </el-col>
    </el-row>

    <!-- Form -->
    <el-dialog title="新增整机编码" width="60%" :visible.sync="dialogFormVisible">
      <el-dialog
            width="30%"
            title="整机编码"
            :visible.sync="innerVisible"
            append-to-body>
          <el-input v-model="field_code_display" placeholder="未生成" readonly
                    :style="{width: '60%'}"></el-input>
          </el-dialog>
      <el-form :model="form_dialog">
       <el-form-item label="配置简述如下:" prop="field_loaderInfo_display">
         <el-input v-model="field_loaderInfo_display" placeholder="空配置" readonly
           :style="{width: '80%'}"></el-input>
       </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="generateCode">确 定 生 成</el-button>
    </div>
    </el-dialog>

</div>
</template>

<script>
  import collapse from "@/api/wmencoder/collapse.js";
  import { getWmCode,getConfigInfoOf,getOptionalMaxCategory,removeArrReInfo } from "@/api/wmencoder/generate";

export default {
  components: {collapse},
  props: [],
  data() {
    return {
      isActive: false,
      formData: {
        field_product_type: "L:山推牌",
        field_trans_style: "A:液力传动",
        field_tonnage: "5:5吨",
        field_wheel: "8:长轴距_8",
        field_special: "A:无",
        field_dynamic_forms: "A:柴油",
        field_discharge: "C:国Ⅲ",
        field_upgrade: "3:3",
        field_format: "CH:煤炭版",
        field_engine: "W:潍柴",
        field_transmission: "S:山推双变",
        field_boom: "B:标准臂",
        field_bucket: "B:标准斗",
        field_operate_mode: "J:非先导双手柄",
        field_sale: "0:国内",
        field_optional: [],
        checkbox_optional:[],
        radio_optional:[]

      },

      rules: {
        field_product_type: [{
          required: true,
          message: '产品机种不能为空',
          trigger: 'change'
        }],
        field_trans_style: [{
          required: true,
          message: '传动方式不能为空',
          trigger: 'change'
        }],
        field_tonnage: [{
          required: true,
          message: '吨位不能为空',
          trigger: 'change'
        }],
        field_wheel: [{
          required: true,
          message: '轴距不能为空',
          trigger: 'change'
        }],
        field_special: [{
          required: true,
          message: '特殊代号不能为空',
          trigger: 'change'
        }],
        field_dynamic_forms: [{
          required: true,
          message: '动力形式不能为空',
          trigger: 'change'
        }],
        field_discharge: [{
          required: true,
          message: '排放代号不能为空',
          trigger: 'change'
        }],
        field_upgrade: [{
          required: true,
          message: '配置升级不能为空',
          trigger: 'change'
        }],
        field_format: [{
          required: true,
          message: '版式不能为空',
          trigger: 'change'
        }],
        field_engine: [{
          required: true,
          message: '发动机不能为空',
          trigger: 'change'
        }],
        field_transmission: [{
          required: true,
          message: '变速箱不能为空',
          trigger: 'change'
        }],
        field_boom: [{
          required: true,
          message: '动臂不能为空',
          trigger: 'change'
        }],
        field_bucket: [{
          required: true,
          message: '铲斗不能为空',
          trigger: 'change'
        }],
        field_operate_mode: [{
          required: true,
          message: '操控方式不能为空',
          trigger: 'change'
        }],
        field_sale: [{
          required: true,
          message: '销售代号不能为空',
          trigger: 'change'
        }],
        field_optional: [{
          required: false,
          type: 'array',
          message: '请至少选择一个field_optional',
          trigger: 'change'
        }]
      },
      field_product_typeOptions: [],
      field_trans_styleOptions: [],
      field_tonnageOptions: [],
      field_wheelOptions: [],
      field_specialOptions: [],
      field_dynamic_formsOptions:[],
      field_dischargeOptions: [],
      field_upgradeOptions: [],
      field_formatOptions: [],
      field_engineOptions: [],
      field_transmissionOptions: [],
      field_boomOptions: [],
      field_bucketOptions: [],
      field_operate_modeOptions: [],
      field_saleOptions: [],
      field_optionalOptions: [],

      optional_max_category:undefined,

      field_optionalProps: {
        "multiple": true
      },
      field_code_display:undefined,
      field_loaderInfo_display:undefined,
      innerVisible: false,
      dialogFormVisible: false,
      form_dialog: {

      }
    }
  },

  computed: {
    word: function() {
          if (this.isActive == false) {
            //对文字进行处理
            return "展开互斥类:";
          } else {
            return "收起互斥类:";
          }
        }
  },
  watch: {},
  created() {
    this.configInfoInit();
  },
  mounted() {

  },

  methods: {
    configInfoInit(){
      getConfigInfoOf("configInfo").then(res=>{
        console.log(res);
        this.field_product_typeOptions=res.productTypeList;
        this.field_trans_styleOptions=res.transStyleList;
        this.field_tonnageOptions=res.tonnageList;
        this.field_wheelOptions=res.wheelList;
        this.field_specialOptions=res.specialList;
        this.field_dynamic_formsOptions=res.dynamicFormsList;
        this.field_dischargeOptions=res.dischargeList;
        this.field_upgradeOptions=res.upgradeList;
        this.field_formatOptions=res.formatList;
        this.field_engineOptions=res.engineList;
        this.field_transmissionOptions=res.transmissionList;
        this.field_boomOptions=res.boomList;
        this.field_bucketOptions=res.bucketList;
        this.field_operate_modeOptions=res.operationModeList;
        this.field_saleOptions=res.saleList;
        this.field_optionalOptions=res.optionalList;
      });
      getOptionalMaxCategory("selectMaxCategory").then(res=>{
        console.log(res);
        this.optional_max_category = res;
      });
      console.log("生成页面完成配置信息获取！");
    },
    resetForm() {
      this.$refs['elForm'].resetFields();
      this.formData.radio_optional.splice(0);
    },
    resetOptionalForm(){
      this.formData.checkbox_optional.splice(0);
      this.formData.radio_optional.splice(0);
    },
    generateCode() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return;
        // TODO 提交表单
        getWmCode("wmCode",this.formData).then(res=>{
          console.log(res);
          if(res == ''){
            this.$message("重复配置！请重新选择您的配置哦~");
          }else{
            this.field_code_display = res.coderCode;
            this.innerVisible = true;
          }
        });
      });
    },
    getLoaderInfo() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return;
        //console.log(this.formData.checkbox_optional);
        //console.log(this.formData.radio_optional);
        this.formData.field_optional = this.formData.checkbox_optional
        .concat(this.formData.radio_optional);
        removeArrReInfo(this.formData.field_optional,null);
        //console.log(this.formData.field_optional);
        getWmCode("loaderInfo",this.formData).then(res=>{
          console.log(res);
          if(res==''){
            this.$message("后台传输有误！");
          }else{
            this.field_loaderInfo_display = res.loaderInfo;
          }
        });

        });
        this.dialogFormVisible = true;
    }
  }


}

</script>

<style>

</style>
