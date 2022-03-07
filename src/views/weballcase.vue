<template>
  <div class="casetitle">前端测试经典case汇总</div>
  <div class="content">
    <div class="demo-collapse" v-if="casedata.length > 0">
      <el-row :gutter="12" v-if="casedata.length > 0" :loading="caseloading">
        <el-col
          style="margin-bottom: 8px"
          class="box-card"
          :span="5"
          v-for="(item, index) in casedata"
          :key="index"
          @click="cardjump(item)"
        >
          <el-card shadow="hover" style="color: #696b6f">
            <div class="cardflex">
              <div>
                <span style="color: #409eff">{{ item.name }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div
      v-else
      style="
        text-align: center;
        color: #696b6f;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      暂无数据
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus' // ElMessage,
import router from '@/router'
import axios from '../utils/axios'

export default defineComponent({
  name: 'getpro',
  setup() {
    const state = reactive({
      caseloading: false,
      casedata: [
        {
          name: '安卓'
        },
        {
          name: '新鲜事'
        },
        {
          name: '查看全部'
        }
      ]
    })
    const getallcasedata = () => {
      state.caseloading = true
      axios
        .get('/api/gettagcasedata')
        .then((response) => {
          state.casedata = response.data.data
          state.caseloading = false
        })
        .catch((error) => {
          state.caseloading = false
          ElMessage({
            message: error,
            type: 'error'
          })
        })
    }
    const cardjump = (e: any) => {
      router.push({ name: 'caseinfo', query: { name: e.name } })
    }
    onMounted(() => {
      getallcasedata()
    })
    onBeforeMount(() => {})

    return {
      cardjump,
      getallcasedata,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="stylus">
.cardflex {
  display: flex;
  justify-content: space-between;
}
.content {
  margin:20px
}
.casetitle {
  font-size: 28px;
  font-weight: bold;
  padding: 20px;
}
</style>
