import { Md5 } from "ts-md5/dist/md5"

export function formatTime(data: any): string {
  let date: any = ""
  try {
    const res = uni.getSystemInfoSync()
    let model: any = res.model
    if (model.includes("iPhone")) {
      let datanew = Date.parse(data) - 8 * 3600 * 1000
      date = new Date(datanew);
    } else {
      date = data;
    }
    // console.log(res.model)
    // console.log(res.pixelRatio)
    // console.log(res.windowWidth)
    // console.log(res.windowHeight)
    // console.log(res.language)
    // console.log(res.version)
    // console.log(res.platform)
  } catch (e) {
    // Do something when catch error
  }
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
      // #ifdef MP-WEIXIN
      var Appkey = "3957399"
      var AppSecert = "2d2c443086630f6c2c804d11983729c8"
      // #endif
      // #ifdef H5
      var Appkey = "1867997"
      var AppSecert = "96cb2f0ecd873d8b6440807f1680a420"
      // #endif
      // #ifdef APP-PLUS
      var Appkey = "1867997"
      var AppSecert = "96cb2f0ecd873d8b6440807f1680a420"
      // #endif
      var url = "https://api.tengpaisc.com/Rest.ashx"
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
  return new Promise((resolve, reject) => {
    // #ifdef APP-PLUS
    plus.nativeUI.showWaiting('加载中…');
    // #endif
    // #ifdef H5
    uni.showLoading({
      title: '加载中'
    })
    // #endif
    // #ifdef MP-WEIXIN
    uni.showNavigationBarLoading()
    // #endif
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
              if (res.data.ErrCode === "-2000") {
                uni.clearStorageSync()
              } else {
                showToast(res.data.ErrMsg)
              }
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
        showToast("网络出错，请稍后再试!")
      },
      complete: () => {
        // #ifdef APP-PLUS
        plus.nativeUI.closeWaiting()
        // #endif
        // #ifdef H5
        uni.hideLoading()
        // #endif
        // #ifdef MP-WEIXIN
        uni.hideNavigationBarLoading()
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
        showToast("网络出错，请稍后再试")
      }
    })
  })
}

export const showErrorToast = (msg: any) => {
  // #ifdef APP-PLUS
  plus.nativeUI.toast(msg, {
    icon: '/static/icon_error.png'
  })
  // #endif
  // #ifdef MP-WEIXIN || H5
  uni.showToast({
    title: msg,
    image: '/static/icon_error.png',
    duration: 2000
  })
  // #endif
}

export const showToast = (msg: any) => {
  // #ifdef APP-PLUS
  plus.nativeUI.toast(msg)
  // #endif
  // #ifdef MP-WEIXIN || H5
  uni.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
    mask: true
  })
  // #endif
}

export const showModal = (msg: any) => {
  // #ifdef APP-PLUS
  plus.nativeUI.confirm(msg, (e: any) => {
    console.log("Close confirm: " + msg + e.index);
  });
  // #endif
  // #ifdef MP-WEIXIN || H5
  uni.showModal({
    content: msg,
    confirmColor: '#fe7f00',
    showCancel: false,
    success: (res: any) => {
      console.log(res)
    }
  })
  // #endif
}

export const defaultShowModal = (content: string) => {
  return new Promise((resolve, reject) => {
    // #ifdef APP-PLUS
    try {
      plus.nativeUI.confirm(content, function (e: any) {
        let res: any = {
          confirm: false,
          cancel: false
        }
        if (e.index === 0) {
          res.confirm = true
        } else {
          res.cancel = true
        }
        resolve(res)
      },
        {
          "title": "提示",
          "buttons": ["确定", "取消"],
          "verticalAlign": "center"
        }
      )
    } catch (e) {
      reject(e)
    }
    // #endif
    // #ifdef MP-WEIXIN || H5
    try {
      uni.showModal({
        content: content,
        confirmColor: '#fe7f00',
        success: (res: any) => {
          resolve(res)
        }
      })
    } catch (e) {
      reject(e)
    }
    // #endif
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
  // #ifdef MP-WEIXIN || H5
  uni.previewImage({
    current: current,
    urls: urls
  })
  // #endif
  // #ifdef APP-PLUS
  return new Promise((resolve, reject) => {
    uni.previewImage({
      current: current,
      urls: urls,
      longPressActions: {
        itemList: ['保存图片'],
        success(data: any) {
          if (data.tapIndex === 0) {
            uni.saveImageToPhotosAlbum({
              filePath: urls[data.index],
              success: () => {
                showToast("保存成功！")
              }
            })
          }
          resolve(data)
          console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
        },
        fail() {
          reject()
        }
      }
    })
  })
  // #endif
}

export const vibrateLong = () => {
  uni.vibrateLong({
    success: () => { }
  });
}

export const vibrateShort = () => {
  uni.vibrateShort({
    success: () => { }
  });
}

export const onShareAppMessage = (e: any) => {
  let userInfo: any = uni.getStorageSync("UserInfo");
  let id: string = "";
  if (userInfo.ID) {
    id = userInfo.ID;
  }
  let title: string = `腾拍商城`
  let path: string = "/pages/index/home?id=" + id
  return {
    title: title,
    path: path
  };
}