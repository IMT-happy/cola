<template>
  <div class="test-container page-container">
    <img src="../assets/404.png" alt="" />
    <div>
      <el-button type="primary" @click="router.push('/')" size="mini"
        >返回首页</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'common',
  setup() {
    const router = useRouter()
    return { router }
  }
})
</script>

<style scoped lang="stylus">
button {
  cursor pointer
  font-size 20px
  padding 5px
}
</style>
