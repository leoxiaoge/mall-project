import { Md5 } from "ts-md5/dist/md5"

export function formatTime(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

const processing = (api: any, data: any) => {
  const sessionkey = uni.getStorageSync('weSession_key')
  let Appkey = "4819088",
    AppSecert = "294d3679961f14fac3f86dd08e78d44a",
    url = "http://api.handnear.com/rest.ashx"
  let paramkey = Object.keys(data),
    paramdata = "",
    sign = ""
  paramkey.sort((a: string, b: string) => {
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1
    } else {
      return -1
    }
  })
  paramkey.map((item: string) => {
    paramdata += data[item]
  })
  paramdata = `${AppSecert}${paramdata}${AppSecert}`
  sign = Md5.hashStr(paramdata).toString()
  let systemdata = {
    Appkey: Appkey,
    V: 1,
    AppVer: 1,
    Format: "json",
    SessionKey: sessionkey,
    Method: api,
    Sign: sign
  }
  let postdata = {
    ...systemdata,
    ...data
  }
  let handle = {
    url,
    postdata
  }
  return handle
}

export const request = (api: any, data: any) => {
  return new Promise((resolve, reject) => {
    let handle = processing(api, data)
    uni.request({
      url: handle.url,
      data: handle.postdata,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (res: any) => {
        if (res.statusCode == 200) {
          console.log(res.data)
          resolve(res.data)
        } else {
          reject(res.errMsg)
        }
      },
      fail: (err: any) => {
        reject(err)
        showToast("网络出错!")
      }
    })
  })
}

export const showErrorToast = (msg: any) => {
  uni.showToast({
    title: msg,
    image: '/static/icon_error.png'
  })
}

export const showToast = (msg: any) => {
  uni.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
    mask: true
  })
}

export const showModal = (msg: any) => {
  uni.showModal({
    confirmColor: '#37bfc8',
    content: msg,
    showCancel: false,
    success: (res: any) => {
      console.log(res)
    }
  })
}

export const navigateTo = (url: any) => {
  uni.navigateTo({
    url: url
  })
}