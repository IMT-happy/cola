<template>
  <div class="header">
    <div class="logo">
      <img
        src="../assets/homelogo.jpeg"
        alt=""
        style="border-radius: 50%; height: 60px; width: 60px; margin-left: 30px"
      /><span class="logoname">Cola</span>
    </div>
    <div style="min-width: 5px; background: #f1f1f1; height: 100%"></div>
    <div class="textcontent">
      <div class="title" @click="router.push('/')">首页</div>
      <div class="rightcontent">
        <div class="go-github" @click="goqaMng">
          <i class="icon el-icon-s-promotion"></i> 了解我们
        </div>
        <!-- <div class="go-github">老版本已下线</div> -->
        <div style="display: flex">
          <img
            src="../assets/head.jpg"
            alt=""
            style="border-radius: 50%; height: 30px; width: 30px; margin-left: 10px"
          />
          <span
            style="
              margin-left: 5px;
              align-items: center;
              display: -webkit-flex;
              font-size: 13px;
            "
            >{{ name }}</span
          >
        </div>
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
      window.open('https://info.imt.co/pages/viewpage.action?pageId=96098545')
    }

    onMounted(() => {
      const name = Cookie.get('username')
      state.name = name || 'Admin'
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
    align-items:center;
    display: -webkit-flex;
    font-size 20px
    cursor pointer
    &:hover {
      color: #25ade5
      }
  }

  .go-github {
    color: #25ade5;
    margin-right: 10px
    cursor pointer
    font-size 16px
    align-items:center;
    display: -webkit-flex;

    .icon {
      font-size 20px
    }
    &:hover {
      color: #25ade5
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
    color: #25ade5;
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
