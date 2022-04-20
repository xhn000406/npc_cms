/**
 * 解析blob流进行下载
 * @param {Blob} blob
 * @param {string} filename
 */
export const analysisBlob = (blob, filename) => {
  const mUrl = URL.createObjectURL(blob)
  const mA = document.createElement('a')
  mA.href = mUrl
  if (filename) mA.download = filename
  mA.click()
  mA.remove()
  URL.revokeObjectURL(mUrl)
}