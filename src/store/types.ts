import NumFactoryStateTypes from './modules/NumFactory/types'

export default interface RootStateTypes {
  text: string
  name: string
}

export interface AllStateTypes extends RootStateTypes {
  numFactoryModule: NumFactoryStateTypes
}
