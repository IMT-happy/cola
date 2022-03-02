<template>
  <div class="kaduntitle">web前端-监控地址</div>
  <el-divider content-position="left">播放器</el-divider>
  <div class="kadunsectitle">卡顿相关</div>

  <div class="secdesc">
    <el-link style="font-size: 16px" :href="furl" type="primary" target="_blank"
      >卡顿大盘细分</el-link
    >
  </div>
  <div class="secdesc">
    <el-link style="font-size: 16px" :href="surl" type="primary" target="_blank"
      >卡顿类型细分</el-link
    >
  </div>
  <div class="kadunsectitle">首帧相关</div>
  <div class="secdesc">白屏 / 未初始化监控 <span style="color: red">待补充</span></div>
  <div class="secdesc">首帧时长监控 <span style="color: red">待补充</span></div>
  <div class="kadunsectitle">错误相关</div>
  <div class="secdesc">
    <el-link style="font-size: 16px" :href="murl" type="primary" target="_blank"
      >其余错误码监控</el-link
    >
  </div>
  <div class="kadunsectitle">P2P 相关</div>
  <div class="secdesc">
    <el-link style="font-size: 16px" :href="turl" type="primary" target="_blank"
      >重点数据监控</el-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, onBeforeMount } from 'vue'

export default defineComponent({
  name: 'Quality',
  setup() {
    const state = reactive({
      furl: 'http://bi.bilibili.co/page/h0aa8802b9ec54dbba69f2fc',
      surl: 'http://moni.bilibili.co/d/EcSDsERMz/web-bo-fang-qi-bo-fang-shu-ju-jian-kong-web?orgId=1&refresh=2m',
      murl: 'http://moni.bilibili.co/d/EcSDsERMz/web-bo-fang-qi-bo-fang-shu-ju-jian-kong-web?orgId=1&refresh=2m',
      turl: 'https://moni.bilibili.co/d/615MtsXGz1/web-p2p-ge-duan-zhong-dian-shu-ju-jian-kong?orgId=1&from=now-24h&to=now&refresh=2m'
    })

    onMounted(() => {})
    onBeforeMount(() => {})

    return { ...toRefs(state) }
  }
})
</script>

<style scoped lang="stylus">
.kaduntitle {
  font-size: 28px;
  font-weight: bold;
  padding: 20px;
}
.kadunsectitle{
  font-size: 20px;
  font-weight: bold;
  padding-top: 15px;
  padding-left: 20px;
}
.secdesc {
  padding-left: 30px;
  padding-top: 10px;

}
</style>
