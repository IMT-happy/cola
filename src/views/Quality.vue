<template>
  <div class="titledesc">竞品比较</div>
  <div class="secdesc">当前数据展示日期： {{ nowtitle }}</div>
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
      douyindata: [] as any,
      acfundata: [] as any,
      datedata: [] as any,
      firstpaintdata: [] as any,
      FCPdata: [] as any,
      TTFBtimedata: [] as any,
      baipingdata: [] as any,
      shoupindata: [] as any,
      onloaddata: [] as any,
      domreadeddata: [] as any,
      ttidata: [] as any,
      nowtitle: ''
    })
    const drawpic = () => {
      // console.log('state', state)
      // 初始化echarts实例init（ dom ，'主题' ，其余参数如：{ renderer:'svg' }）
      const myEcharts = echarts.init(echartsRef.value!)
      // let proxyname
      // if (num !== 1) {
      //   myEcharts.dispose()
      //   const newEcharts = echarts.init(echartsRef.value!)
      //   proxyname = newEcharts
      // } else {
      //   proxyname = myEcharts
      // }
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
            data: [
              'Firstpaint',
              'FCP',
              'TTFB',
              '白屏',
              '首屏',
              'onLoad',
              'DomReaded',
              'TTI'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'imt',
            type: 'bar',
            barWidth: 15,
            emphasis: {
              focus: 'series'
            },
            markLine: {
              lineStyle: {
                type: 'dashed'
              }
              // data: [[{ type: 'min' }, { type: 'max' }]]
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
            emphasis: {
              focus: 'series'
            },
            data: state.qqdata
          },
          {
            name: '抖音',
            type: 'bar',
            barWidth: 15,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: state.douyindata
          }
        ]
      }
      // console.log('info', state.bilibilidata)
      myEcharts.setOption(option, true)
    }
    const dochange = (item: any) => {
      // console.log('dochange: ', item)
      try {
        state.bilibilidata = []
        state.xiguadata = []
        state.aiqiyidata = []
        state.youkudata = []
        state.qqdata = []
        state.douyindata = []
        state.acfundata = []
        axios
          .post('/api/changeneeddata', {
            searchdata: item.name
          })
          .then((response) => {
            const nowdata = response.data
            state.nowtitle = nowdata.data[0].date.slice(0, 10)
            nowdata.data.forEach((ele: any) => {
              if (ele.name === 'imt') {
                state.bilibilidata.push(
                  ele.firstpaint,
                  ele.FCP,
                  ele.TTFBtime,
                  ele.baipingtime,
                  ele.shoupingtime,
                  ele.onload,
                  ele.domreadytime,
                  ele.tti
                )
              } else if (ele.name === 'acfun') {
                state.acfundata.push(
                  ele.firstpaint,
                  ele.FCP,
                  ele.TTFBtime,
                  ele.baipingtime,
                  ele.shoupingtime,
                  ele.onload,
                  ele.domreadytime,
                  ele.tti
                )
              } else if (ele.name === 'iqiyi') {
                state.aiqiyidata.push(
                  ele.firstpaint,
                  ele.FCP,
                  ele.TTFBtime,
                  ele.baipingtime,
                  ele.shoupingtime,
                  ele.onload,
                  ele.domreadytime,
                  ele.tti
                )
              } else if (ele.name === 'xigua') {
                state.xiguadata.push(
                  ele.firstpaint,
                  ele.FCP,
                  ele.TTFBtime,
                  ele.baipingtime,
                  ele.shoupingtime,
                  ele.onload,
                  ele.domreadytime,
                  ele.tti
                )
              } else if (ele.name === 'tencent') {
                state.qqdata.push(
                  ele.firstpaint,
                  ele.FCP,
                  ele.TTFBtime,
                  ele.baipingtime,
                  ele.shoupingtime,
                  ele.onload,
                  ele.domreadytime,
                  ele.tti
                )
              } else if (ele.name === 'douyin') {
                state.douyindata.push(
                  ele.firstpaint,
                  ele.FCP,
                  ele.TTFBtime,
                  ele.baipingtime,
                  ele.shoupingtime,
                  ele.onload,
                  ele.domreadytime,
                  ele.tti
                )
              } else {
                state.youkudata.push(
                  ele.firstpaint,
                  ele.FCP,
                  ele.TTFBtime,
                  ele.baipingtime,
                  ele.shoupingtime,
                  ele.onload,
                  ele.domreadytime,
                  ele.tti
                )
              }
            })
            drawpic()
            ElMessage({
              message: '数据加载成功',
              type: 'success'
            })
          })
          .catch((error) => {
            console.error(error)
          })
      } catch (e) {
        ElMessage({
          message: '服务好像出问题了，请联系IMT',
          type: 'error'
        })
      }
    }
    const drawpicmain = () => {
      // console.log('state', state)
      // 初始化echarts实例init（ dom ，'主题' ，其余参数如：{ renderer:'svg' }）
      const eachmyEcharts = echarts.init(echartsRef2.value!)
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
            'domreaded',
            'TTI'
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
          },
          {
            name: 'TTI',
            type: 'line',
            data: state.ttidata
          }
        ]
      }
      // 设置配置
      eachmyEcharts.setOption(option)
      eachmyEcharts.on('click', function (params) {
        // 控制台打印数据的名称
        dochange(params)
        // console.log(params)
      })
    }
    const getdata = () => {
      axios
        .get('/api/getnewquailtydata')
        .then((response) => {
          const nowdata = response.data
          state.nowtitle = nowdata.data[0].date.slice(0, 10)
          nowdata.data.forEach((ele: any) => {
            if (ele.name === 'imt') {
              state.bilibilidata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadytime,
                ele.tti
              )
            } else if (ele.name === 'acfun') {
              state.acfundata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadytime,
                ele.tti
              )
            } else if (ele.name === 'iqiyi') {
              state.aiqiyidata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadytime,
                ele.tti
              )
            } else if (ele.name === 'xigua') {
              state.xiguadata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadytime,
                ele.tti
              )
            } else if (ele.name === 'tencent') {
              state.qqdata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadytime,
                ele.tti
              )
            } else if (ele.name === 'douyin') {
              state.douyindata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadytime,
                ele.tti
              )
            } else {
              state.youkudata.push(
                ele.firstpaint,
                ele.FCP,
                ele.TTFBtime,
                ele.baipingtime,
                ele.shoupingtime,
                ele.onload,
                ele.domreadytime,
                ele.tti
              )
            }
          })

          nowdata.bilidata.reverse().forEach((ele: any) => {
            state.datedata.push(ele.date.slice(0, 10))
            state.firstpaintdata.push(ele.firstpaint)
            state.FCPdata.push(ele.FCP)
            state.TTFBtimedata.push(ele.TTFBtime)
            state.baipingdata.push(ele.baipingtime)
            state.shoupindata.push(ele.shoupingtime)
            state.onloaddata.push(ele.onload)
            state.domreadeddata.push(ele.domreadytime)
            state.ttidata.push(ele.tti)
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
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
}
.secdesc {
  padding-left: 20px;
}
</style>
