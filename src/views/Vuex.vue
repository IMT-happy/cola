<template>
  <div class="vuex-container page-container">
    <div class="page-title">Vuex Test Page</div>
    <div>
      <img src="../assets/fff.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { useStore } from '../store'

export default defineComponent({
  name: 'Vuex',

  setup() {
    const store = useStore()
    const reactiveData = reactive({
      text: computed(() => store.state.text),
      count: computed(() => store.state.numFactoryModule.count)
    })

    const double = () => {
      store.commit('numFactoryModule/DOUBLE_COUNT')
    }

    return {
      ...toRefs(reactiveData),
      double
    }
  }
})
</script>

<style scoped lang="stylus"></style>
