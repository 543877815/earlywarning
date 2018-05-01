import BaseApi from './BaseApi';

export default class User extends BaseApi {
  getVerCode() {
    const url = '/getVerCode';
    return this.get(url);
  }

  userRegister(data) {
    const url = '/register';
    return this.post(url, data);
  }

  userLogin(data) {
    const url = '/login';
    return this.post(url, data);
  }

  getUserInfo(data) {
    const url = '/getUserInfo';
    return this.get(url, data);
  }

  modifyUserInfo(data) {
    const url = '/modifyUserInfo';
    return this.post(url, data);
  }

  updatePassword(data){
    const url = '/updatePassword';
    return this.post(url, data);
  }

  updateEmail(data){
    const url = '/updateEmail';
    return this.post(url, data);
  }
}
