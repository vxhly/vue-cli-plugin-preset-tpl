import axios from './axios'

export function GET (url) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      throw err
    }
  })
}

export function PUT (url, payload) {
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
      throw err
    }
  })
}

export function PATCH (url, payload) {
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
      throw err
    }
  })
}

export function POST (url, payload) {
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
      throw err
    }
  })
}

export function DELETE (url, payload) {
  return new Promise((resolve, reject) => {
    try {
      axios.delete(url, { data: payload })
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      throw err
    }
  })
}

export default {
  GET (url) {
    return GET(url)
  },
  PUT (url, payload) {
    return PUT(url, payload)
  },
  PATCH (url, payload) {
    return PATCH(url, payload)
  },
  POST (url, payload) {
    return POST(url, payload)
  },
  DELETE (url, payload) {
    return DELETE(url, payload)
  }
}
