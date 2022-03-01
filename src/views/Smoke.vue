<template>
  <div>
    <div class="smoketitle">冒烟测试报告</div>
    <div class="bodycontent">
      <!-- <div style="padding-bottom: 15px">规划中, 敬请期待...</div>
      <SvgIcon :name="formatIconVal('running')"></SvgIcon> -->
    </div>
    <el-row :gutter="12" v-if="smokedata.length > 0" :loading="smokeloading">
      <el-col
        style="margin-bottom: 8px"
        class="box-card"
        v-for="(item, index) in smokedata"
        :key="index"
      >
        <el-card shadow="hover" style="color: #696b6f">
          <div class="cardflex">
            <div>
              <span>网页标题：{{ item.name }}</span>
              <br />
              <span>网页链接：{{ item.url }}</span
              ><span style="display: block; margin-top: 2px">
                冒烟总数：{{ item.totallength }}</span
              >
              <div class="eachbutton">
                <el-button
                  type="primary"
                  plain
                  size="mini"
                  style="font-size: 15px"
                  @click="openimg(item)"
                  >图片资源</el-button
                >
                <el-button
                  type="danger"
                  plain
                  size="mini"
                  style="font-size: 15px"
                  @click="openerror(item)"
                  >告警信息</el-button
                >
                <el-button
                  type="info"
                  plain
                  size="mini"
                  style="font-size: 15px"
                  @click="openlog(item)"
                  >查看日志</el-button
                >
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
    <el-dialog v-model="dialogimgVisible" title="图片资源" width="80%">
      <el-table :data="nowoutputimgresult">
        <el-table-column property="name" label="图片名"></el-table-column>
        <el-table-column property="type" label="类型" width="100"></el-table-column>
        <el-table-column
          property="decodedBodySize"
          label="decodedBodySize"
          width="100"
        ></el-table-column>
        <el-table-column
          property="encodedBodySize"
          label="encodedBodySize"
          width="100"
        ></el-table-column>
        <el-table-column
          property="transferSize"
          label="transferSize"
          width="100"
        ></el-table-column>
        <el-table-column property="height" label="高度" width="100"></el-table-column>
        <el-table-column property="width" label="宽度" width="100"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog v-model="dialogerrorsVisible" title="告警信息" width="80%">
      <el-table :data="nowerrordatas">
        <el-table-column property="url" label="页面链接" width="300"></el-table-column>
        <el-table-column property="type" label="报错类型" width="100"></el-table-column>
        <el-table-column property="msg" label="告警内容"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog v-model="dialogeinfoVisible" title="操作日志" width="80%">
      <el-table :data="nowloginfo">
        <el-table-column property="event" label="事件名称"></el-table-column>
        <el-table-column property="fatherevent" label="是否存在子元素点击" width="150">
          <template #default="scope">
            <span v-if="scope.row.fatherevent === true">存在</span>
            <span v-else>不存在</span>
          </template></el-table-column
        >
        <el-table-column
          property="childlen"
          label="存在子元素个数"
          width="150"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, onMounted, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
// import SvgIcon from '../components/svgIcon.vue'
import { FormatPipelineStageicon } from '@/utils/filters'
import axios from '../utils/axios'

export default defineComponent({
  // components: { SvgIcon },
  name: 'Vuex',
  setup() {
    const state = reactive({
      smokedata: [] as any,
      dialogimgVisible: false,
      dialogerrorsVisible: false,
      dialogeinfoVisible: false,
      smokeloading: false,
      nowerrordatas: [],
      nowoutputimgresult: [],
      nowloginfo: []
    })
    const formatIconVal = (str: string): string => {
      return FormatPipelineStageicon(str)
    }

    const count = ref<number>(0)
    const increment = () => {
      count.value += 1
    }
    const getinfodata = () => {
      state.smokeloading = true
      axios
        .get('/api/getallsmokedata')
        .then((response) => {
          if (response.data.data !== 'no data') {
            state.smokedata = response.data.chromesmokedata
          } else {
            state.smokedata = []
          }
          // state.smokedata = response.data.chromesmokedata
          state.smokeloading = false
        })
        .catch((error) => {
          state.smokeloading = false
          ElMessage({
            message: error,
            type: 'error'
          })
        })
    }
    const openerror = (row: any) => {
      // console.log(row)
      state.dialogerrorsVisible = true
      state.nowerrordatas = row.errordatas
    }

    const openlog = (row: any) => {
      state.nowloginfo = row.loginfo
      state.dialogeinfoVisible = true
    }

    const openimg = (row: any) => {
      state.nowoutputimgresult = row.outputimgresult
      state.dialogimgVisible = true
    }
    onMounted(() => {
      // onSubmit()
      getinfodata()
    })
    onBeforeMount(() => {})
    return {
      count,
      increment,
      formatIconVal,
      openimg,
      openlog,
      openerror,
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
.cardflex {
  display: flex;
  justify-content: space-between;
}
.eachbutton {
  margin-top: 10px
}
</style>
