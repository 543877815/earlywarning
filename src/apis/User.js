import BaseApi from './BaseApi';

export default class User extends BaseApi {
  getVerCode() {
    const url = '/getVerCode';
    return this.get(url);
  }
  userRegister(data){
    const url = '/register';
    return this.post(url, data);
  }
}
