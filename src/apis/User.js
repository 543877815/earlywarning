import BaseApi from './BaseApi';

export default class User extends BaseApi {
  loginByPassword(data) {
    const url = '/register';
    return this.post(url, data);
  }
}
