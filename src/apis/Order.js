import BaseApi from './BaseApi'

export default class User extends BaseApi {
  getOrderList (data) {
    const url = '/getOrderList'
    return this.get(url, data)
  }

  getOrderByStatus (data) {
    const url = '/getOrderByStatus'
    return this.get(url, data)
  }

  getOrderDetail (data) {
    const url = '/getOrderDetail'
    return this.get(url, data)
  }

  adminGetOrderList (data) {
    const url = '/admin/getOrderList'
    return this.get(url, data)
  }

  confirmOrder (data) {
    const url = '/confirmOrder'
    return this.post(url, data)
  }

  fixingOrder (data) {
    const url = '/fixingOrder'
    return this.post(url, data)
  }

  finishOrder (data) {
    const url = '/finishOrder'
    return this.post(url, data)
  }
}
