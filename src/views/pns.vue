<template>
  <div class="test-container page-container">
    <div class="page-title">卡顿监控</div>
    <div style="padding-bottom: 15px">规划中, 敬请期待...</div>
    <SvgIcon :name="formatIconVal('running')"></SvgIcon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SvgIcon from '../components/svgIcon.vue'
import { FormatPipelineStageicon } from '@/utils/filters'

export default defineComponent({
  components: { SvgIcon },
  name: 'Vuex',
  setup() {
    const formatIconVal = (str: string): string => {
      return FormatPipelineStageicon(str)
    }

    const count = ref<number>(0)
    const increment = () => {
      count.value += 1
    }
    return { count, increment, formatIconVal }
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
