<template>
  <div>
    <div class="smoketitle">播放器切片流异常测试回归</div>
    <div class="bodycontent">
      <!-- <div style="padding-bottom: 15px">规划中, 敬请期待...</div> -->
    </div>
    <div style="padding-left: 20px">
      <el-button
        type="plain"
        @click="gorunfuzz"
        size="mini"
        style="font-size: 15px; margin-bottom: 10px"
        >执行测试</el-button
      >
      <SvgIcon :name="formatIconVal('running')" v-if="isshow"></SvgIcon>
      <div style="font-size: 16px; margin-bottom: 15px">
        异常测试的播放页:
        <el-link
          href="https://www.bilibili.com/video/BV1U54y1J7uo"
          type="primary"
          target="_blank"
          >https://www.bilibili.com/video/BV1U54y1J7uo</el-link
        >
      </div>

      <div v-if="videofuzzdata.length > 0">
        <!-- <time class="time">页面刷新时间： {{ currentDate }}</time>
        <br /> -->
        <div class="time">videofuzz 最近一次 执行时间： {{ videofuzztime }}</div>
        <el-row :gutter="20">
          <div
            style="width: 100%; margin-bottom: 15px"
            v-for="(item, index) in videofuzzdata"
            :key="index"
          >
            <el-col :span="20">
              <el-card :body-style="{ padding: '0px' }">
                <div style="padding: 14px">
                  <span>{{ formatvideoVal(item.type) }}</span>
                </div>
                <img :src="item.imgurl" class="image" />
              </el-card>
            </el-col>
          </div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
// import SvgIcon from '../components/svgIcon.vue'
import { FormatPipelineStageicon, transferfuzzname } from '@/utils/filters'
import axios from '../utils/axios'

export default defineComponent({
  // components: { SvgIcon },
  name: 'Vuex',
  setup() {
    const state = reactive({
      videofuzzdata: [] as any,
      currentDate: new Date(),
      videofuzztime: '',
      isshow: false
    })
    const formatIconVal = (str: string): string => {
      return FormatPipelineStageicon(str)
    }

    const formatvideoVal = (str: string): string => {
      return transferfuzzname(str)
    }
    const getivideofuzzdata = () => {
      axios
        .get('/api/getfuzzdata')
        .then((response) => {
          if (response.data.data && response.data.data.length > 0) {
            state.videofuzzdata = response.data.data
            state.videofuzztime = response.data.data[0].date
          } else {
            state.videofuzzdata = []
            state.videofuzztime = state.currentDate.toString()
          }
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: 'error'
          })
        })
    }
    const gorunfuzz = () => {
      state.isshow = true
      axios
        .get('/api/runvideofuzz')
        .then((response) => {
          if (response.data.code === '200') {
            ElMessage({
              message: '已经发送服务执行啦，晚点再来看吧。嘻嘻',
              type: 'success'
            })
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
    onMounted(() => {
      getivideofuzzdata()
    })
    onBeforeMount(() => {})
    return {
      formatIconVal,
      formatvideoVal,
      gorunfuzz,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="stylus">
button {
  cursor pointer
  font-size 20px
  padding 5px
}
.bodycontent {
  display: block
}
.smoketitle {
  font-size: 28px;
  font-weight: bold;
  padding: 20px;
}

.image {
  width: 100%;
  display: block;
}

.time {
  font-size: 15px;
  color: #999;
  margin-bottom:10px
}
</style>
