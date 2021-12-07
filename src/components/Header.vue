<template>
  <div class="header">
    <div class="title" @click="router.push('/')">Home</div>
    <div class="go-github" @click="goqaMng">
      <i class="icon el-icon-s-promotion"></i> 回到旧版
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    // eslint-disable-next-line no-unused-vars
    const router = useRouter()

    // eslint-disable-next-line no-unused-vars
    const goqaMng = () => {
      window.open('http://qa-mng.bilibili.co/#/dashboard')
    }
    return {
      router,
      goqaMng
    }
  }
})
</script>

<style scoped lang="stylus">

.header {
  width 100%
  height 100%
  background #fff
  display flex
  justify-content space-between
  align-items center
  padding 0 20px
  box-sizing border-box
  font-weight bold

  .title {
    font-size 20px
    cursor pointer
  }

  .go-github {
    cursor pointer
    font-size 16px

    .icon {
      font-size 20px
    }
  }
}
</style>
