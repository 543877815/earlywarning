import BaseApi from './BaseApi';

export default class User extends BaseApi {
  getOrderList(data) {
    const url = '/getOrderList';
    return this.get(url, data);
  }

  getOrderByStatus(data){
    const url = '/getOrderByStatus';
      return this.get(url,  data)
  }

  getOrderDetail(data) {
    const url = '/getOrderDetail';
    return this.get(url, data);
  }
}
