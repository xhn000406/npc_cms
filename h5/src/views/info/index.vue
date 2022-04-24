<template>
  <div class="container">
    <div class="user_info">
      <div class="user_info_switch">
        <div
          :class="{
            item: true,
            active: navIndex === 'info'
          }"
          @click="navIndex = 'info'"
        >
          基础资料修改
        </div>
        <div
          :class="{
            item: true,
            active: navIndex === 'password'
          }"
          @click="navIndex = 'password'"
        >
          密码修改
        </div>
      </div>
      <div v-if="navIndex === 'info'" class="user_info_panel">
        <el-form>
          <el-form-item label="编号">
            <el-input placeholder="编号" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input
              clearable
              placeholder="请输入昵称"
            />
          </el-form-item>
          <el-form-item label="账号">
            <el-input
              clearable
              placeholder="请输入账号"
            />
          </el-form-item>
        </el-form>
      </div>
      <div v-if="navIndex === 'password'" class="user_info_panel">
        <el-form>
          <el-form-item label="原密码">
            <el-input
              clearable
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              clearable
              type="password"
              placeholder="请输入新密码"
            />
          </el-form-item>
          <el-form-item label="在输一次新密码">
            <el-input
              clearable
              type="password"
              placeholder="在输一次新密码"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navIndex: 'info'
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  height: 100%;
  display: flex;
  flex-flow: column;
  // align-items: center;
  // justify-content: center;
  .user_info{
    width: 800px;
    .user_info_switch{
      display: flex;
      align-items: flex-end;
      user-select: none;
      margin-bottom: 10px;
      .item{
        cursor: pointer;
        font-size: 15px;
        margin-right: 20px;
        letter-spacing: 2px;
        font-weight: bold;
        padding: 10px 0;
        transition: all .2s;
        box-sizing: border-box;
        color: #ccc;
        &.active{
          font-size: 20px;
          border-bottom: 5px solid var(--globalColor);
          color: var(--globalColor);
        }
      }
    }
  }
}
</style>
