import Api from './Api'

export default {
  upload (formData) {
    return Api().post('coffee-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}