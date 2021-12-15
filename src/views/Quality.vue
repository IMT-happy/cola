<template>
  <div class="titledesc">竞品比较</div>
  <div
    class="echarts"
    ref="echartsRef"
    :style="{
      width: '100%',
      height: '600px'
    }"
  ></div>
  <div class="titledesc">bilibili近期数据波动</div>
  <div
    class="echarts"
    ref="echartsRef2"
    :style="{
      width: '100%',
      height: '600px'
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, reactive, onBeforeMount } from 'vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import axios from '../utils/axios'

export default defineComponent({
  name: 'Quality',
  setup() {
    const echartsRef = ref<HTMLElement>()
    const echartsRef2 = ref<HTMLElement>()
    const state = reactive({
      bilibilidata: [] as any,
      xiguadata: [] as any,
      aiqiyidata: [] as any,
      youkudata: [] as any,
      qqdata: [] as any,
      acfundata: [] as any,
      datedata: [] as any,
      firstpaintdata: [] as any,
      FCPdata: [] as any,
      TTFBtimedata: [] as any,
      baipingdata: [] as any,
      shoupindata: [] as any,
      onloaddata: [] as any,
      domreadeddata: [] as any
    })
    const drawpic = () => {
      // console.log('state', state)
      // 初始化echarts实例init（ dom ，'主题' ，其余参数如：{ renderer:'svg' }）
      const myEcharts = echarts.init(echartsRef.value!)
      // 要操作的配置
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Firstpaint', 'FCP', 'TTFB', '白屏', '首屏', 'onLoad', 'DomReaded']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'bilibili',
            type: 'bar',
            barWidth: 15,
            emphasis: {
              focus: 'series'
            },
            markLine: {
              lineStyle: {
                type: 'dashed'
              },
              data: [[{ type: 'min' }, { type: 'max' }]]
            },
            data: state.bilibilidata
          },
          {
            name: '西瓜',
            type: 'bar',
            barWidth: 15,
            emphasis: {
              focus: 'series'
            },
            data: state.xiguadata
          },
          {
            name: 'acfun',
            type: 'bar',
            barWidth: 15,
            emphasis: {
              focus: 'series'
            },
            data: state.acfundata
          },
          {
            name: '爱奇艺',
            type: 'bar',
            barWidth: 15,
            emphasis: {
              focus: 'series'
            },
            data: state.aiqiyidata
          },
          {
            name: '优酷',
            type: 'bar',
            barWidth: 15,
            data: state.youkudata,
            emphasis: {
              focus: 'series'
            }
          },
          {
            name: '腾讯',
            type: 'bar',
            barWidth: 15,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: state.qqdata
          }
        ]
      }
      // 设置配置
      myEcharts.setOption(option)
    }
    const drawpicmain = () => {
      // console.log('state', state)
      // 初始化echarts实例init（ dom ，'主题' ，其余参数如：{ renderer:'svg' }）
      const myEcharts = echarts.init(echartsRef2.value!)
      // 要操作的配置
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [
            'firstpaint',
            'FCP',
            'TTFBtime',
            'baiping',
            'shoupin',
            'onload',
            'domreaded'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: state.datedata
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'firstpaint',
            type: 'line',
            data: state.firstpaintdata
          },
          {
            name: 'FCP',
            type: 'line',
            data: state.FCPdata
          },
          {
            name: 'TTFBtime',
            type: 'line',
            data: state.TTFBtimedata
          },
          {
            name: 'baiping',
            type: 'line',
            data: state.baipingdata
          },
          {
            name: 'shoupin',
            type: 'line',
            data: state.shoupindata
          },
          {
            name: 'onload',
            type: 'line',
            data: state.onloaddata
          },
          {
            name: 'domreaded',
            type: 'line',
            data: state.domreadeddata
          }
        ]
      }
      // 设置配置
      myEcharts.setOption(option)
    }
    const getdata = () => {
      axios
        .get('/api/getnewquailtydata')
        .then((response) => {
          const nowdata = response.data
          nowdata.data.forEach((ele: any) => {
            if (ele.name === 'bilibili') {
              state.bilibilidata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadedtime
              )
            } else if (ele.name === 'acfun') {
              state.acfundata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadedtime
              )
            } else if (ele.name === 'iqiyi') {
              state.aiqiyidata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadedtime
              )
            } else if (ele.name === 'xigua') {
              state.xiguadata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadedtime
              )
            } else if (ele.name === 'tencent') {
              state.qqdata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadedtime
              )
            } else {
              state.youkudata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadedtime
              )
            }
          })

          nowdata.bilidata.forEach((ele: any) => {
            state.datedata.push(ele.date.slice(0, 10))
            state.firstpaintdata.push(ele.firstpaint)
            state.FCPdata.push(ele.FCP)
            state.TTFBtimedata.push(ele.TTFBtime)
            state.baipingdata.push(ele.baipingtime)
            state.shoupindata.push(ele.shoupingtime)
            state.onloaddata.push(ele.onload)
            state.domreadeddata.push(ele.domreadedtime)
          })

          drawpic()
          drawpicmain()
          // console.log('response: ', response.data)
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: 'error'
          })
        })
    }
    onMounted(() => {
      getdata()
    })
    onBeforeMount(() => {})

    return { echartsRef, echartsRef2, getdata, drawpic, ...toRefs(state) }
  }
})
</script>

<style scoped lang="stylus">
.titledesc{
  margin-top:20px
  margin-bottom: 20px
}
</style>
