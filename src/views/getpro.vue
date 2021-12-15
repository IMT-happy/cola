<template>
  <div class="titleadvice">
    <el-switch v-model="value1" active-text="我要提建议" @change="toggleisshow" />
  </div>
  <div v-show="isshow">
    <div class="titledesc">新版改造问题反馈或优化建议</div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="问题名称">
        <el-input v-model="form.proname"></el-input>
      </el-form-item>
      <el-form-item label="问题描述">
        <el-input v-model="form.prodesc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="mini">提交</el-button>
        <el-button @click="Reset" size="mini">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <el-divider content-position="center">反馈详情</el-divider>
  <el-row :gutter="12" v-if="prodata.length > 0" :loading="proloading">
    <el-col
      style="margin-bottom: 8px"
      class="box-card"
      v-for="(item, index) in prodata"
      :key="index"
    >
      <el-card shadow="hover" style="color: #696b6f">
        <span>名称：{{ item.name }}</span
        ><span style="display: block; margin-top: 2px"> 描述：{{ item.desc }}</span>
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
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import axios from '../utils/axios'

export default defineComponent({
  name: 'getpro',
  setup() {
    const state = reactive({
      form: {
        proname: '',
        prodesc: ''
      },
      prodata: [] as any,
      proloading: false,
      isshow: false,
      value1: false
    })
    const Reset = () => {
      console.log('reset!')
      state.form.proname = ''
      state.form.prodesc = ''
    }
    const toggleisshow = () => {
      state.isshow = state.value1
    }
    const getinfodata = () => {
      state.proloading = true
      axios
        .get('/api/getalldata')
        .then((response) => {
          if (response.data.data !== 'no data') {
            state.prodata = response.data.data
          } else {
            state.prodata = []
          }
          state.prodata = response.data.data
          state.proloading = false
        })
        .catch((error) => {
          state.proloading = false
          ElMessage({
            message: error,
            type: 'error'
          })
        })
    }
    const onSubmit = () => {
      if (state.form.proname && state.form.prodesc) {
        axios
          .post('/api/insertdata', {
            name: state.form.proname,
            desc: state.form.prodesc
          })
          .then(() => {
            getinfodata()
            ElMessage({
              message: '数据加载成功',
              type: 'success'
            })
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        ElMessage({
          message: '名称或描述不可为空',
          type: 'warning'
        })
      }
    }
    onMounted(() => {
      // onSubmit()
      getinfodata()
    })
    onBeforeMount(() => {})

    return { onSubmit, Reset, toggleisshow, ...toRefs(state) }
  }
})
</script>

<style scoped lang="stylus">
.titledesc{
  margin-top:20px
  margin-left 50px
  margin-bottom: 20px
}
.titleadvice {
  margin-top:10px
  margin-left 50px
}
</style>
