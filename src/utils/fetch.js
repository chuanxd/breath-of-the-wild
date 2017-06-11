const TIMEOUT_30S = 30000

export default (opts = {}) => {
  return new Promise((resolve, reject) => {
    window.axios(window._.merge({
      timeout: TIMEOUT_30S
    }, opts))
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      console.error(err)
      reject(err)
    })
  })
}
