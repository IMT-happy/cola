export interface NavItem {
  path: string
  name: string
  isActive: boolean
  children: []
}

export interface cards {
  id: number
  name: string
  desc: string
  count: number
  date: string
}

export interface cases {
  id: number
  name: string
  desc: string
  contation: string
  tag: string
}
