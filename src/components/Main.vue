<template>
  <main class="main-container">
    <div class="top">
      <Header />
    </div>
    <div class="bottom">
      <div :class="[isActive ? 'hidesiderbar' : 'left']">
        <Nav />
        <div class="navhide" @click="toogle">
          <img
            v-if="!isActive"
            style="width: 30px; height: 35px"
            src="../assets/left.png"
            alt=""
          />
        </div>
      </div>
      <div class="right" :style="{ 'margin-left': !isActive ? '241px' : '' }">
        <!-- <div class="top">
          <Header />
        </div> -->
        <div class="content">
          <div class="navshow" @click="toogle">
            <img
              v-if="isActive"
              style="width: 30px; height: 35px; z-index: 999"
              src="../assets/right.png"
              alt=""
            />
          </div>

          <router-view />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'

export default defineComponent({
  name: 'Main',
  isActive: false,
  components: {
    Header,
    Nav
  },
  setup() {
    const isActive = ref(false)
    const toogle = () => {
      isActive.value = !isActive.value
    }

    return {
      isActive,
      toogle
    }
  }
})
</script>

<style scoped lang="stylus">

@import "../style/basic.styl"

$top-height = 70px
$left-side-width = 240px

.main-container {
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  width 100%
  height 100%
  background $second-background-color
  box-sizing border-box
  display flex
  flex-direction column
  justify-content space-between

  .top {
    position fixed
    z-index 9
    box-sizing border-box
    width 100%
    height $top-height
    margin-bottom 10px
    border-bottom 1px solid #d9d4d4;
  }

  .bottom {
    margin-top 75px
    position relative
    box-sizing border-box
    width 100%
    height 100%
    display flex
    justify-content space-between

    .left {
      position fixed
      width $left-side-width
      height 100%
      box-sizing border-box
      transition: all 0.5s ease-in;
      border-right 1px solid #d9d4d4;
      &:hover .navhide{
        opacity: 1;
      }
    }

    .right {
      overflow-x hidden
      transition all 0.3s ease;
      position relative
      width 100%
      height 100%
      box-sizing border-box
      padding 0 5px 5px 5px
      &:hover .navshow{
        opacity: 1;
      }

      .content {
        position relative
        width 100%
        height 100%
        background $background-color
        border-radius 5px
        box-sizing border-box
        padding 10px

      }
    }
  }
}

.page-links {
  a {
    font-weight: bold;
    margin: 0 20px;
  }
}

.hidesiderbar {
  width:0
  transform: translate(-240px,0);
  transition: all 0.5s ease-out;
  }

.navhide{
  opacity: 0;
  position: fixed;/*此处即是固定按钮位置的属性。*/
  left: 200px;
  top: 50%;
  z-index:999
}
.navshow{
  opacity: 0;
  position: fixed;/*此处即是固定按钮位置的属性。*/
  top: 50%;
  z-index:999
}
</style>
