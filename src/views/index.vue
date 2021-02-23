<template>
  <div class="home_backcolor">
    <el-carousel height="300px" indicator-position="none" type="card" loop="true" interval="3000" trigger="click">
        <el-carousel-item v-for="item in images" :key="item">
           <img :src="item.url" alt="无图片"/>
        </el-carousel-item>
      </el-carousel>
    <div class="bottom">
      <p class="text1"><a href="http://www.sd-dgjx.com/" target = '_blank'>德工机械官方网站</a></p>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        images: [
          { url: require("@/assets/images/dgjx1.png")},
          { url: require("@/assets/images/loader.png")},
          { url: require("@/assets/images/lengzs1.png")},
        ],
      };
    },
  };
</script>

<style>

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }

    .bottom {
      background-color: #FFFFFF;
      height: 200px;
      width: 100%;
    }
    .text1 {
      padding-top: 100px;
      padding-left: 45%;
    }

</style>
