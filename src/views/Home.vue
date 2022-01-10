<template>
  <div class="logospec">
    <div><img class="logospecleft" src="../assets/logogirl.gif" alt="" /></div>
    <div class="logoscontent">尊敬的 {{ name }} 用户您好～</div>
  </div>
  <div class="homecontainer">
    <div class="homedesc">欢迎使用Cola</div>
    <div class="homeimg">
      <img src="../assets/logo.gif" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import infos from '../common/types/info'

export default defineComponent({
  name: 'Home',
  setup() {
    const state = reactive({
      name: ''
    })
    onMounted(() => {
      const { name } = infos
      state.name = name || 'bilibili'
    })
    return { ...toRefs(state) }
  }
})
</script>

<style scoped lang="stylus">
.logospec {
  display flex
  .logospecleft{
    margin-left 20px
    margin-top 20px
    width 150px
    height 150px
    border 0px solid darkslategray
    border-radius 50%
  }
  .logoscontent{
    margin-left 20px
    margin-top 100px
  }
}

.homecontainer{
  margin-top 50px
}

.homedesc {
  text-align center
  font-size 30px
}
.homeimg{
  margin-top 40px
  text-align center
}
</style>
