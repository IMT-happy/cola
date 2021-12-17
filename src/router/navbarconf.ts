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
    name: '反馈建议',
    isactive: false,
    path: '/proback'
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
