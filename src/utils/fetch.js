const TIMEOUT_10S = 10000

export default (opts = {}) => {
  return new Promise((resolve, reject) => {
    window.axios(window._.merge({
      // baseURL: `${process.env.apiUrl}/v1`,
      timeout: TIMEOUT_10S
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
