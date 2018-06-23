import BaseApi from './BaseURL'

export default class User extends BaseApi {
  getVerCode () {
    const url = '/getVerCode'
    return this.get(url)
  }

  userRegister (data) {
    const url = '/register'
    return this.post(url, data)
  }

  createMaintainer (data) {
    const url = '/admin/createMaintainer'
    return this.post(url, data)
  }

  userLogin (data) {
    const url = '/login'
    return this.post(url, data)
  }

  logout (data) {
    const url = '/logout'
    return this.get(url, data)
  }

  uploadAvatar (data) {
    const url = '/uploadAvatar'
    return this.post(url, data, 'form-data')
  }

  getUserInfo (data) {
    const url = '/getUserInfo'
    return this.get(url, data)
  }

  getUsersInfo (data) {
    const url = '/admin/getUserInfo'
    return this.get(url, data)
  }

  modifyUserInfo (data) {
    const url = '/modifyUserInfo'
    return this.post(url, data)
  }

  updatePassword (data) {
    const url = '/updatePassword'
    return this.post(url, data)
  }

  updateEmail (data) {
    const url = '/updateEmail'
    return this.post(url, data)
  }

  lockUser (data) {
    const url = '/admin/lockUser'
    return this.post(url, data)
  }

  unlockUser (data) {
    const url = '/admin/unlockUser'
    return this.post(url, data)
  }
}
