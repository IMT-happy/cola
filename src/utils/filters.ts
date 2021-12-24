/**
 * 格式化转换 number => string
 * @param val 整型枚举值
 * @param mergeStage
 */
export function FormatPipelineStageStatus(val: number, mergeStage: number): string {
  if (val === 0) {
    if (mergeStage === 0) {
      return '准入'
    }
    return '其他'
  }
  if (val === 1) {
    return '构建'
  }
  if (val === 2) {
    return '发布'
  }
  if (val === -1) {
    return '开始'
  }
  return '测试'
}

/**
 * 格式化转换 string => utf8
 * @param val 整型枚举值
 */

export function FormatPipelineStageicon(str: string): string {
  if (str === 'running') {
    return 'loading'
  }
  if (str === 'left') {
    return 'left'
  }
  if (str === 'right') {
    return 'right'
  }
  if (str === 'warning') {
    return 'warning'
  }
  return 'pending'
}
