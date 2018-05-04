import BaseApi from './BaseApi';

export default class User extends BaseApi {
  getMessages(data){
    const url = '/getMessages';
    return this.get(url, data);
  }
}
