import conifg from '@Config'

function _buildQuery(obj = {}) {
  const _ = encodeURIComponent
  return Object.keys(obj).map(k => `${_(k)}=${_(obj[k])}`).join('&')
}

class Req {
  constructor() {
    this.baseUrl = conifg.prodBaseUrl
  }
  _httpDone(res) {
    if (!res['err_code']) {
      return res
    } else {
      return Promise.reject(res)
    }
  }
  _httpFail(err) {
    return Promise.reject(err)
  }
  fetch({ url, query, data, headers, method = 'GET' }) {
    url = this.baseUrl + url + `?${_buildQuery(query)}`
    return fetch(url, {
      body: JSON.stringify(data),
      method,
      headers,
      credentials: 'same-origin'
    }).then(resp => resp.ok ? resp.json().then(this._httpDone) : this._httpFail(resp))
      .catch(err => Promise.reject(err))
  }
  get(params) {
    return this.fetch(params)
  }
  post(params) {
    params.method = 'POST'
    return this.fetch(params)
  }
}

export default new Req()
