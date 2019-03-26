import axios from './axios'

/**
 * 使用方法
 * import api from '@/api'
 * api.GET(url).then().catch()
 */

/**
 * http GET 方法
 * 
 * @method GET
 * @param {String} url RESTful URL
 * @param {Object} payload GET 的 body 参数
 */
export function GET(url, payload) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url, {
          params: payload
        })
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      if (err.response) throw Error(err.response.data.message)
      throw err
    }
  })
}

/**
 * http PUT 方法
 * 
 * @method PUT
 * @param {String} url RESTful URL
 * @param {Object | Array} payload PUT 的 body 参数
 */
export function PUT(url, payload) {
  return new Promise((resolve, reject) => {
    try {
      axios.put(url, payload)
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      if (err.response) throw Error(err.response.data.message)
      throw err
    }
  })
}

/**
 * http PATCH 方法
 * 
 * @method PATCH
 * @param {String} url RESTful URL
 * @param {Object | Array} payload PATCH 的 body 参数
 */
export function PATCH(url, payload) {
  return new Promise((resolve, reject) => {
    try {
      axios.patch(url, payload)
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      if (err.response) throw Error(err.response.data.message)
      throw err
    }
  })
}

/**
 * http POST 方法
 * 
 * @method POST
 * @param {String} url RESTful URL
 * @param {Object | Array} payload POST 的 body 参数
 */
export function POST(url, payload) {
  return new Promise((resolve, reject) => {
    try {
      axios.post(url, payload)
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      if (err.response) throw Error(err.response.data.message)
      throw err
    }
  })
}

/**
 * http DELETE 方法
 * 
 * @method DELETE
 * @param {String} url RESTful URL
 * @param {Object} payload DELETE 的 body 参数
 */
export function DELETE(url, payload) {
  return new Promise((resolve, reject) => {
    try {
      axios.delete(url, {
          data: payload
        })
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      if (err.response) throw Error(err.response.data.message)
      throw err
    }
  })
}

export default {
  GET(url, payload) {
    return GET(url, payload)
  },
  PUT(url, payload) {
    return PUT(url, payload)
  },
  PATCH(url, payload) {
    return PATCH(url, payload)
  },
  POST(url, payload) {
    return POST(url, payload)
  },
  DELETE(url, payload) {
    return DELETE(url, payload)
  }
}