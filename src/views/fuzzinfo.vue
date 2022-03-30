<template>
  <div style="padding-left: 20px">
    <el-button type="text" @click="returnback">返回上一页</el-button>
  </div>
  <div class="content">
    <div>
      <el-link
        style="font-size: 16px; margin-bottom: 15px"
        :href="nowurl"
        type="primary"
        target="_blank"
        >当前URL：{{ nowurl }}</el-link
      >
    </div>
    <el-row :gutter="12" v-if="fuzzinfodata.length > 0">
      <el-col
        style="margin-bottom: 8px"
        class="box-card"
        v-for="(item, index) in fuzzinfodata"
        :key="index"
      >
        <el-card shadow="hover" style="color: #696b6f">
          <div class="cardflex">
            <div>
              <span>fuzz 类型：{{ item.type }}</span>
              <span style="display: block; margin-top: 5px"
                >更新日期：{{ item.date }}</span
              >
              <span style="display: block; margin-top: 5px">
                描述：{{ item.desc }}</span
              >
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                margin-right: 20px;
                cursor: pointer;
              "
            >
              <div class="demo-image__preview">
                <el-image
                  style="width: 150px; height: 150px"
                  :src="item.imgurl"
                  :preview-src-list="srcList"
                  :initial-index="4"
                  fit="cover"
                />
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
  // components: { Plus, ZoomIn, Download, Delete },
  name: 'fuzzinfo',
  setup() {
    const state = reactive({
      fuzzinfodata: [] as any,
      srcList: [] as any,
      nowurl: ''
    })
    const getallcasesearch = (nowid: number) => {
      state.srcList = []
      axios
        .post('/api/getfuzzinfo', {
          id: nowid
        })
        .then((response) => {
          if (response.data.code === '200') {
            state.fuzzinfodata = response.data.data
            if (response.data.data && response.data.data.length > 0) {
              state.nowurl = response.data.data[0].url
              response.data.data.forEach((ele: any) => {
                state.srcList.push(ele.imgurl)
              })
            }
          } else {
            ElMessage({
              message: response.data.msg,
              type: 'error'
            })
          }
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: 'error'
          })
        })
    }
    const returnback = () => {
      router.push({ name: 'webfuzz' })
    }

    onMounted(() => {
      // console.log('pramas: ', router.currentRoute.value.query.name)
      const nowid = router.currentRoute.value.query.id
      const nowids = Number(nowid)
      // nowid = Number(nowid)
      getallcasesearch(nowids)
    })
    onBeforeMount(() => {})

    return {
      returnback,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="stylus">
.content {
  margin:20px
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.cardflex {
  display: flex;
  justify-content: space-between;
}
</style>
