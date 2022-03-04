<template>
  <div class="studytitle">测试 开发 技术学习网站汇总</div>
  <el-divider content-position="left">国内学习网站</el-divider>
  <div class="secdesc">
    <el-link
      style="font-size: 16px; margin-bottom: 15px"
      :href="turl"
      type="primary"
      target="_blank"
      >京东零售</el-link
    >
    <br />
    <el-link
      style="font-size: 16px; margin-bottom: 15px"
      :href="murl"
      type="primary"
      target="_blank"
      >美团技术</el-link
    >
    <br />
    <el-link
      style="font-size: 16px; margin-bottom: 15px"
      href="https://wetest.qq.com/documents/"
      type="primary"
      target="_blank"
      >腾讯wetest</el-link
    >
    <br />
    <el-link
      style="font-size: 16px; margin-bottom: 15px"
      href="https://zoo.team/"
      type="primary"
      target="_blank"
      >政采云</el-link
    >
  </div>
  <el-divider content-position="left">资料查阅社区</el-divider>
  <div class="secdesc">
    <el-link
      style="font-size: 16px; margin-bottom: 15px"
      :href="surl"
      type="primary"
      target="_blank"
      >stackoverflow</el-link
    >
    <br />
    <el-link
      style="font-size: 16px; margin-bottom: 15px"
      :href="furl"
      type="primary"
      target="_blank"
      >CSDN</el-link
    >
    <br />
    <el-link
      style="font-size: 16px; margin-bottom: 15px"
      href="https://testerhome.com/"
      type="primary"
      target="_blank"
      >testerhome</el-link
    >
    <br />
    <el-link
      style="font-size: 16px; margin-bottom: 15px"
      href="https://juejin.cn/article/%E6%B5%8B%E8%AF%95"
      type="primary"
      target="_blank"
      >掘金</el-link
    >
    <br />
    <el-link
      style="font-size: 16px; margin-bottom: 15px"
      href="http://www.51ste.com/index.php"
      type="primary"
      target="_blank"
      >软件测试部落</el-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, onBeforeMount } from 'vue'

export default defineComponent({
  name: 'Quality',
  setup() {
    const state = reactive({
      furl: 'https://blog.csdn.net/nav/test',
      surl: 'https://stackoverflow.com/',
      murl: 'https://tech.meituan.com/',
      turl: 'https://jelly.jd.com/articlelist/exp'
    })

    onMounted(() => {})
    onBeforeMount(() => {})

    return { ...toRefs(state) }
  }
})
</script>

<style scoped lang="stylus">
.studytitle {
  font-size: 28px;
  font-weight: bold;
  padding: 20px;
}
.secdesc {
  padding-left: 30px;
  padding-top: 10px;

}
</style>
