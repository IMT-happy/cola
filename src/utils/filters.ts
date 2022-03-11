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

// ;['run', 'm4s', 'header', 'response', 'all', 'rmimg']
export function transferfuzzname(str: string): string {
  if (str === 'run') {
    return '播放过程中fuzz掉音视频文件请求'
  }
  if (str === 'm4s') {
    return '加载初期对音视频文件进行block'
  }
  if (str === 'header') {
    return '对音视频文件的请求头进行header的修改'
  }
  if (str === 'response') {
    return '对音视频文件的返回体进行responsedata的修改'
  }
  if (str === 'all') {
    return '播放实例之初fuzz掉页面全部文件请求'
  }
  return '播放页面图片资源全部fuzz掉'
}
