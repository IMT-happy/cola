<template>
  <aside class="nav">
    <ul class="nav-list" v-for="(nav, index) in navList" :key="index">
      <li
        class="nav-item flex-center"
        :class="{ active: nav.isActive }"
        @click="navClick(nav, index)"
      >
        <div>
          {{ nav.name }}
        </div>
        <div class="iconshow">
          <img
            v-if="nav.isSubShow"
            v-show="nav.children && nav.children.length > 0"
            src="../assets/downin.png"
          />
          <img
            v-else
            v-show="nav.children && nav.children.length > 0"
            src="../assets/rightin.png"
          />
        </div>
      </li>
      <li
        v-for="(it, idx) in nav.children"
        :key="idx"
        v-show="nav.isSubShow"
        style="margin-left: 15px"
        class="nav-item flex-center"
        :class="{ active: it.isActive }"
        @click="navchildClick(it)"
      >
        <div>
          {{ it.name }}
        </div>
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
      navClick(e: NavItem, ind: any) {
        reactiveData.navList[ind].isSubShow = !reactiveData.navList[ind].isSubShow
        if (e.path) {
          router.push(e.path)
        }
      },
      navchildClick(e: NavItem) {
        if (e.path) {
          router.push(e.path)
        }
      }
    })

    const changeNavActive = (currentPath: string) => {
      reactiveData.navList.forEach((v: NavItem) => {
        let temp
        if (v.children && v.children.length > 0) {
          v.children.forEach((vv: NavItem) => {
            const tempv = vv
            tempv.isActive = tempv.path === currentPath
            temp = tempv
          })
        } else {
          const tempvv = v
          tempvv.isActive = v.path === currentPath
          temp = tempvv
        }
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
  .nav-list {

    .nav-item {
      box-sizing border-box
      width 100%
      height 60px
      cursor pointer

      &.active {
        font-weight bold
        background $second-background-color
        color #409eff
      }

      &:hover {
      color: #409eff
      }

    }

  }
  .iconshow{
    margin-top 7px
    position fixed
    margin-left 200px
  }

}
</style>
