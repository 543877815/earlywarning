import BaseApi from './BaseApi';

export default class User extends BaseApi {
  getCategories() {
    const url = '/getCategories';
    return this.get(url);
  }

  getModelInstrumentByCid(data) {
    const url = '/getModelInstrumentByCid';
    return this.get(url, data);
  }
}
