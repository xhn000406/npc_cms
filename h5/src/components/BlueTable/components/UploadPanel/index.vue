<template>
  <div class="container">
    <el-upload
      drag
      multiple
      name="file"
      :action="SYSTEM_INFO.uploadApi"
      :headers="requestHeaders"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>
<script>
import config from '@/config'
import { getToken } from '@/utils/session'
export default {
  data() {
    return {
      SYSTEM_INFO: config.SYSTEM_INFO,
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
