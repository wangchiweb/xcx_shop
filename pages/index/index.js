//index.js
//获取应用实例
const app = getApp()

Page({

  login: function(res){
    // console.log(res);
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://jd.com/api/login', 
            data: {
              code: res.code
            },
            success (res) {
              // console.log(res.data.data.token);
              wx.setStorage({
                key:"token",
                data:res.data.data.token
              })
              let token=wx.getStorage({
                key: 'token',
                success (res) {
                  console.log(res.data)
                }
              })
            }
          })
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  

  data: {
    background: ['/image/discount-banner.jpg', '/image/draw-banner.jpg', '/image/nursing-banner.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    let _this=this;

    // //发起网络请求
    // wx.request({
    //   url: 'http://jd.com/api/test', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: 'xxx',
    //     y: 'yyy'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     // console.log(res.data)
    //     _this.setData({
    //       goods_id :res.data.goods_id,
    //       goods_name: res.data.goods_name,
    //       price: res.data.price
    //     })
        
    //   }
    // })

    //发送网络请求
    wx.request({
      url: 'http://jd.com/api/list',
      success:function(res){
        // console.log(res.data.data.goodsinfo['1'].goods_id)
        // console.log(res.data.data.goodsinfo)
        _this.setData({
          goodsinfo:res.data.data.goodsinfo
        })
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      sex: '男'
    })
  }
})
