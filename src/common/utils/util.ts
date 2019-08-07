import { Md5 } from "ts-md5/dist/md5"

export function formatTime(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export const processing = (api: any, data: any) => {
  return new Promise((resolve, reject) => {
    try {
      const sessionkey = uni.getStorageSync('SessionKey')
      let Appkey = "3957399",
        AppSecert = "2d2c443086630f6c2c804d11983729c8",
        url = "https://api.tengpaisc.com/Rest.ashx"
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
      let handle: any = {
        url,
        postdata
      }
      resolve(handle)
    } catch (e) {
      reject(e)
    }
  })
}

export const request = async (api: any, data: any) => {
  let handle: any = await processing(api, data);
  // #ifndef APP-PLUS
  uni.showLoading({
    title: '加载中'
  })
  uni.showNavigationBarLoading()
  // #endif
  // #ifdef APP-PLUS
  plus.nativeUI.showWaiting('加载中…');
  // #endif
  return new Promise((resolve, reject) => {
    uni.request({
      url: handle.url,
      data: handle.postdata,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (res: any) => {
        if (res.statusCode == 200) {
          if (res.data.IsError) {
            if (res.data.ErrCode == "Missing_Session") {
              redirectTo("../../ucenter/login/login")
            } else {
              showToast(res.data.ErrMsg)
            }
          } else {
            resolve(res.data)
          }
        } else {
          reject(res.errMsg)
        }
      },
      fail: (err: any) => {
        reject(err)
        showToast("网络出错!")
      },
      complete: () => {
        // #ifndef APP-PLUS
        uni.hideLoading()
        uni.hideNavigationBarLoading()
        // #endif
        // #ifdef APP-PLUS
        plus.nativeUI.closeWaiting()
        // #endif
        uni.stopPullDownRefresh()
      }
    })
  })
}

export const upload = async (api: any, data: any, filePath: any) => {
  let handle: any = await processing(api, data);
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: handle.url,
      filePath: filePath,
      name: 'file',
      formData: handle.postdata,
      success(res: any) {
        resolve(res.data)
      },
      fail(err: any) {
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
    content: msg,
    confirmColor: '#fe7f00',
    showCancel: false,
    success: (res: any) => {
      console.log(res)
    }
  })
}

export const defaultShowModal = (content: string) => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      content: content,
      confirmColor: '#fe7f00',
      success: (res: any) => {
        resolve(res)
      }
    })
  })
}

export const navigateTo = (url: any) => {
  uni.navigateTo({
    url: url
  })
}

export const navigateBack = (delta: number) => {
  uni.navigateBack({
    delta: delta
  });
}

export const redirectTo = (url: any) => {
  uni.redirectTo({
    url: url
  })
}

export const switchTab = (url: any) => {
  uni.switchTab({
    url: url
  })
}

export const previewImage = (current: any, urls: any) => {
  return new Promise((resolve, reject) => {
    uni.previewImage({
      current: current,
      urls: urls,
      longPressActions: {
        itemList: ['发送给朋友', '保存图片'],
        success(data: any) {
          resolve(data)
          console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
        },
        fail() {
          reject()
        }
      }
    })
  })
}