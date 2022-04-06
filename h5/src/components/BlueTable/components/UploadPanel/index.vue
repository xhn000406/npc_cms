<template>
  <div class="container">
    <el-button @click="$emit('downloadTemplate')">下载模板</el-button>
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
}
</style>
