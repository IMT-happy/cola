<template>
  <div class="header">
    <div class="logo">
      <img
        src="../assets/newlogo.png"
        alt=""
        style="border-radius: 50%; height: 60px; width: 60px; margin-left: 30px"
      /><span class="logoname">Cola</span>
    </div>
    <div style="min-width: 5px; background: #f1f1f1; height: 100%"></div>
    <div class="textcontent">
      <div class="title" @click="router.push('/')">首页</div>
      <div class="rightcontent">
        <div class="go-github" @click="goqaMng">
          <i class="icon el-icon-s-promotion"></i> 回到旧版
        </div>
        <span style="margin-left: 20px">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import Cookie from 'js-cookie'

export default defineComponent({
  name: 'Header',
  setup() {
    const router = useRouter()
    const state = reactive({
      name: '' as any
    })
    const goqaMng = () => {
      window.open('http://qa-mng.bilibili.co/#/dashboard')
    }

    onMounted(() => {
      const name = Cookie.get('username')
      state.name = name || '未登录'
    })
    return {
      router,
      goqaMng,
      ...toRefs(state)
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
  // justify-content space-between
  align-items center
  padding 0 10px
  box-sizing border-box
  font-weight bold

  .textcontent {
    width 100%
    padding-left 10px
    display flex
    justify-content space-between
  }

  .title {
    font-size 20px
    cursor pointer
    &:hover {
      color: #409eff
      }
  }

  .go-github {
    cursor pointer
    font-size 16px

    .icon {
      font-size 20px
    }
    &:hover {
      color: #409eff
      }
  }
  .logo {
    min-width 230px
    display flex;
    height 60px
    padding-top 5px
    padding-bottom 5px
    // border-right 2px solid #d9d4d4;
    // border-bottom-right-radius: 0.5em;
  }
  .logoname {
    color: #409eff;
    margin-top: 3%;
    margin-left: 12%;
    font-size: 37px;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;
  }
  .rightcontent {
    display: flex;
  }
}
</style>
