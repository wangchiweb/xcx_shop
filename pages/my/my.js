// pages/my/my.js
//获取应用实例
const app = getApp()
const apihost = app.globalData.apiUrl;  //本地

Page({

    /**
   * 处理登录
   */

  // login:function(res){
  //   // console.log(res)
  //   let _this=this;
  //   wx.login({
  //     success (res) {
  //       if (res.code) {
  //         //发起网络请求
  //         wx.request({
  //           url: apihost+'/api/login?',
  //           data: {
  //             code: res.code
  //           },

  //           success(res){
  //             // console.log(res);
  //             wx.setStorageSync('key',res.data.data.token);
  //             // let value=wx.getStorageSync('key');
  //             // console.log(value); 
  //             let li=wx.setStorage({
  //               key: 'token',
  //               success(res){
  //                 console.log(res);
  //               }
  //             })  
  //           }
            
  //         })
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   })
  // },

  userinfo:function(res){
    // console.log(res)
    //获取用户信息
    let userinfo=res.detail.userInfo;
    // console.log(userinfo)
    wx.login({
      success (res) {
        // console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: ''+apihost+'/api/login?code='+res.code,
            method: 'post',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              u: userinfo
            },
            success:function(res){
              // console.log(res)
              // wx.setStorageSync('key',res.data.data.token);
              // let value=wx.getStorageSync('key');
              // console.log(value); 
               
              // console.log("获取token:" + res.data.data.token)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})