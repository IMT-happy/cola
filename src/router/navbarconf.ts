const navlists: Array<any> = [
  {
    name: '竞品性能',
    isActive: false,
    path: '/Quality'
  },
  {
    name: '通用工具',
    isactive: false,
    isSubShow: false,
    children: [
      {
        name: '覆盖率',
        isActive: false,
        path: '/vuex'
      }
    ]
  },
  {
    name: '自动化测试',
    isactive: false,
    isSubShow: false,
    children: [
      {
        name: 'XSS巡检',
        isActive: false,
        path: '/Axios'
      },
      {
        name: '冒烟自动化',
        isActive: false,
        path: '/Smoke'
      }
    ]
  },
  {
    name: '活动专项',
    isactive: false,
    isSubShow: false,
    children: [
      {
        name: '积分流程',
        isActive: false,
        path: '/Test'
      }
    ]
  },
  {
    name: '播放专项',
    isactive: false,
    isSubShow: false,
    children: [
      {
        name: '切片diff',
        isActive: false,
        path: '/videodiff'
      }
    ]
  },
  {
    name: '反馈建议',
    isactive: false,
    path: '/proback'
  },
  {
    name: '线上监控',
    isActive: false,
    path: '/pns'
  }

  // {
  //   name: 'Vuex',
  //   isActive: false,
  //   path: '/vuex'
  // },
  // {
  //   name: 'Axios',
  //   isActive: false,
  //   path: '/axios'
  // },
  // {
  //   name: 'Test',
  //   isActive: false,
  //   path: '/test'
  // },
  // {
  //   name: 'pns',
  //   isActive: false,
  //   path: '/pns'
  // }
]

export default navlists
