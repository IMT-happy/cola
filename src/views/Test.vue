<template>
  <div class="test-container page-container">
    <div class="page-title">积分系统整理</div>
    <div>规划中, 敬请期待...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Vuex',
  setup() {
    const count = ref<number>(0)
    const increment = () => {
      count.value += 1
    }
    return { count, increment }
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
