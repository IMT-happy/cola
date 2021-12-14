<template>
  <aside class="nav">
    <!-- <div class="logo">
      <img src="../assets/logo.gif" alt="" style="border-radius: 0.1em" /><span
        class="logoname"
        >Cola</span
      >
    </div> -->
    <ul class="nav-list">
      <li
        class="nav-item flex-center"
        v-for="(nav, index) in navList"
        :key="index"
        :class="{ active: nav.isActive }"
        @click="navClick(nav)"
      >
        {{ nav.name }}
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NavItem } from '../common/types'
import navlists from '../router/navbarconf'

export default defineComponent({
  name: 'Nav',

  setup() {
    const router = useRouter()

    const reactiveData = reactive({
      navList: navlists,

      navClick(e: NavItem) {
        router.push(e.path)
      }
    })

    const changeNavActive = (currentPath: string) => {
      reactiveData.navList.forEach((v: NavItem) => {
        const temp = v
        temp.isActive = temp.path === currentPath
        return temp
      })
    }

    watch(
      () => router.currentRoute.value,
      (_n) => {
        changeNavActive(_n.path)
      }
    )

    onMounted(() => {
      router.isReady().then(() => {
        changeNavActive(router.currentRoute.value.path)
      })

      // console.log('rrr', routers)
    })

    return {
      ...toRefs(reactiveData)
    }
  }
})
</script>

<style scoped lang="stylus">

@import "../style/basic.styl"


.nav {
  position relative
  width 240px
  height 100%
  box-sizing border-box
  background: #fff
  .logo {
    display flex;
    height 60px
    margin-left: 5%;
    padding-top 5px
    padding-bottom 5px
    border-bottom 1px solid #d9d4d4;
    border-bottom-right-radius: 0.2em;
  }
  .logoname {
    color: lightslategrey;
    margin-top: 6%;
    margin-left: 16%;
    font-size: 30px;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;
  }
  .nav-list {

    .nav-item {
      box-sizing border-box
      width 100%
      height 60px
      cursor pointer

      &.active {
        font-weight bold
        background $second-background-color
      }

    }

  }

}
</style>
