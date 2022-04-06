/**
 * 解析blob流进行下载
 * @param {Blob} blob 
 */
export const analysisBlob = (blob) => {
  const mUrl = URL.createObjectURL(blob)
  const mA = document.createElement('a')
  mA.href = mUrl
  mA.click()
  mA.remove()
  URL.revokeObjectURL(mUrl)
}