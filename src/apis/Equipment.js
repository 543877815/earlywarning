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

  getInstrumentById(data) {
    const url = '/getInstrumentById';
    return this.get(url, data);
  }

  createInstrument(data) {
    const url = '/createInstrument';
    return this.post(url, data);
  }

  getUserInstrument(data) {
    const url = '/getUserInstrument';
    return this.get(url, data);
  }

  adminGetUserInstrument(data) {
    const url = '/admin/getInstruments';
    return this.get(url, data);
  }

  getInstrumentByCid(data) {
    const url = '/getInstrumentByCid';
    return this.get(url, data);
  }

  modifyInstrument(data) {
    const url = '/modifyInstrument';
    return this.post(url, data);
  }

  createCategory(data) {
    const url = '/admin/createCategory';
    return this.post(url, data);
  }

  modifyCategory(data) {
    const url = '/admin/modifyCategory';
    return this.post(url, data)
  }

  deleteCategory(data) {
    const url = '/admin/deleteCategory';
    return this.post(url, data);
  }

  createInstrument(data) {
    const url = '/admin/createInstrument';
    return this.post(url, data);
  }
}
