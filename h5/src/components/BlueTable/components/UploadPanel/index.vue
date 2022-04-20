<template>
  <div class="container">
    <el-upload
      drag
      multiple
      name="file"
      :action="uploadApi"
      :headers="requestHeaders"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="export_tip">
      <span>在导入数据前，您可能需要</span>
      <el-button
        type="primary"
        size="mini"
        @click="$emit('downloadTemplate')"
      >
        <i class="el-icon-download"></i>
        <span>下载导入模板</span>
      </el-button>
    </div>
  </div>
</template>
<script>
import { getToken } from '@/utils/session'
export default {
  props: ['uploadApi'],
  data() {
    return {
      requestHeaders: {
        token: getToken()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  .export_tip{
    margin-top: 15px;
    font-size: 14px;
    display: flex;
    align-items: center;
    &>span{
      margin-right: 5px;
    }
  }
}
</style>
